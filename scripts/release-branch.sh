#!/bin/sh

default()
{
  PATH=/usr/bin:/usr/sbin:${PATH}
  export PATH

  SCRIPT=`basename $0`
  SCRIPT_DIR=`dirname $0`
  SCRIPT_DIR=`cd $SCRIPT_DIR; pwd`
  TMP_DIR="/tmp/$SCRIPT.$$"

  MAIN_BRANCH="main"
  PROD_BRANCH="prod-stable"

  UI_DIR="$TMP_DIR/hybrid-committed-spend-ui"
  UI_REPO="git@github.com:RedHatInsights/hybrid-committed-spend-ui.git"

  BODY_FILE="$UI_DIR/body"

  GIT_USER="hcs-ui-bot"
  GIT_USER_EMAIL="$GIT_USER@redhat.com"
  GIT_USER_NAME="HCS UI bot"
}

usage()
{
cat <<- EEOOFF

    This script will merge the following branches and create a pull request (default) or push upstream

    sh [-x] $SCRIPT [-h|-p|-u]

    OPTIONS:
    h       Display this message
    p       Merge $MAIN_BRANCH to $PROD_BRANCH
    u       Push to upstream

EEOOFF
}

cleanup()
{
  echo "\n*** Cleaning temp directory..."
  rm -rf $TMP_DIR

  if [ -n "$ACTIVE_GH_USER" ]; then
    echo "\n*** Switching GitHub user: $ACTIVE_GH_USER"
    gh auth switch --user $ACTIVE_GH_USER
  fi
}

clone()
{
  mkdir $TMP_DIR
  cd $TMP_DIR

  git clone $UI_REPO
}

config()
{
  cd $KOKU_UI_DIR

  echo "\n*** Set local GIT config: $GIT_USER_EMAIL"
  git config --local user.email "$GIT_USER_EMAIL"
  git config --local user.name "$GIT_USER_NAME"

  # Use preferred GitHub user to create PR, otherwise default GIT config will do
  if ! gh auth status | grep -q "$GIT_USER"; then
    echo "*** Preferred $GIT_USER user not available, run 'gh auth login'"
  else
    ACTIVE_GH_USER=`gh api user --jq .login`

    echo "\n*** Switching GitHub user: $GIT_USER"
    gh auth switch --user $GIT_USER
  fi
}

createPullRequestBody()
{
cat <<- EEOOFF > $BODY_FILE
Merged $REMOTE_BRANCH branch to $BRANCH.

Use latest commit to update namespace \`ref\` in app-interface repo. Don't use merge commit, SHAs must be unique when images are created for each branch.
EEOOFF
}

merge()
{
  cd $UI_DIR

  echo "\n*** Checkout $BRANCH"
  git checkout $BRANCH

  echo "\n*** Fetch origin $REMOTE_BRANCH"
  git fetch origin $REMOTE_BRANCH

  echo "\n*** Merge origin/$REMOTE_BRANCH"
  git merge origin/$REMOTE_BRANCH --commit --no-edit --no-ff
}

# Use gh in a non-interactive way -- see https://github.com/cli/cli/issues/1718
pullRequest()
{
  NEW_BRANCH="merge_${BRANCH}.$$"

  git branch -m $NEW_BRANCH

  echo "\n*** Pushing $NEW_BRANCH..."
  git push -u origin HEAD

  TITLE="Deployment commit for $BRANCH"
  BODY=`cat $BODY_FILE`

  gh pr create -t "$TITLE" -b "$BODY" -B $BRANCH
}

push()
{
  echo ""
  read -p "*** You are pushing to the $BRANCH branch. Continue?" YN

  case $YN in
    [Yy]* ) echo "\n*** Pushing $BRANCH..."; git push -u origin $BRANCH;;
    [Nn]* ) exit 0;;
    * ) echo "Please answer yes or no."; push;;
  esac
}

# main()
{
  default

  while getopts hbps c; do
    case $c in
      p) BRANCH=$PROD_BRANCH
         REMOTE_BRANCH=$MAIN_BRANCH;;
      h) usage; exit 0;;
      \?) usage; exit 1;;
    esac
  done

  if [ -z "$BRANCH" ]; then
    usage
    exit 1
  fi

  trap cleanup SIGINT SIGTERM EXIT

  echo "\n*** Merging $REMOTE_BRANCH to $BRANCH...\n"

  clone
  config
  merge

  if [ "$?" -eq 0 ]; then
    if [ -n "$PUSH" ]; then
      push
    else
      createPullRequestBody
      pullRequest
    fi
  else
    echo "\n*** Cannot not push. No changes or check for conflicts"
  fi

  rm -rf $TMP_DIR
}
