#!/bin/sh

default()
{
  PATH=/usr/bin:/usr/sbin:${PATH}
  export PATH

  SCRIPT=`basename $0`
  SCRIPT_DIR=`dirname $0`
  SCRIPT_DIR=`cd $SCRIPT_DIR; pwd`
  TMP_DIR="/tmp/$SCRIPT.$$"

  GITLAB_USER=${GITLAB_USER:-`whoami`}
  PROD_BRANCH="prod-stable"
  TARGET_BRANCH="master"
  TARGET_PROJECT="service/app-interface"

  APP_INTERFACE="app-interface"
  APP_INTERFACE_DIR="$TMP_DIR/$APP_INTERFACE"
  APP_INTERFACE_REPO="git@gitlab.cee.redhat.com:service/app-interface.git"
  APP_INTERFACE_FORK="git@gitlab.cee.redhat.com:$GITLAB_USER/app-interface.git"

  HCS_UI_DIR="$TMP_DIR/hybrid-committed-spend-ui"
  HCS_UI_REPO="git@github.com:RedHatInsights/hybrid-committed-spend-ui.git"
  HCS_UI=hybrid-committed-spend-frontend

  PROD_FRONTENDS=/services/insights/frontend-operator/namespaces/prod-frontends.yml

  DESC_FILE="$TMP_DIR/desc"
  DEPLOY_CLOWDER_FILE="$APP_INTERFACE_DIR/data/services/insights/hybrid-committed-spend/deploy.yml"
  DEPLOYMENTS_FILE="$TMP_DIR/deployments"
}

usage()
{
cat <<- EEOOFF

    This script will update app-interface with the latest SHA refs from the hcs-ui branches below. Then, it will
    either create an merge request (default) or push to the origin without an MR. It's assumed SSH keys are in use.

    $PROD_BRANCH

    sh [-x] $SCRIPT [-h|-p]

    OPTIONS:
    h       Display this message
    p       Update SHA refs from $PROD_BRANCH to $TARGET_BRANCH

    Note: This script lacks permission to push directly upstream, so commits will be pushed to this fork:
    $APP_INTERFACE_FORK -- override user via the GITLAB_USER env var.

EEOOFF
}

cloneAppInterface()
{
  mkdir -p $TMP_DIR
  cd $TMP_DIR

  if [ ! -d "$APP_INTERFACE_DIR" ]; then
    git clone $APP_INTERFACE_REPO
  fi
}

cloneUI()
{
  mkdir -p $TMP_DIR
  cd $TMP_DIR

  if [ ! -d "$HCS_UI_DIR" ]; then
    git clone $HCS_UI_REPO
  fi
}

commit()
{
  SOURCE_BRANCH="hybrid-committed-spend_deploy.$$"
  TITLE="Update Hybrid Committed Spend UI deployments"

  cd $APP_INTERFACE_DIR

  git remote rename origin upstream
  git remote add origin $APP_INTERFACE_FORK

  git branch -m $SOURCE_BRANCH
  git commit -m "$TITLE" $DEPLOY_CLOWDER_FILE
}

createDeploymentDesc()
{
  mkdir -p $TMP_DIR

  {
    if [ "$DEPLOY_HCCM_PROD" = "true" ]; then
      echo "${HCS_UI}: Prod deployment"
    fi
  } > "$DEPLOYMENTS_FILE"

  DEPLOYMENTS=`cat $DEPLOYMENTS_FILE`
}

createMergeRequestDesc()
{
cat <<- EEOOFF > $DESC_FILE
<b>What:</b>
Update Hybrid Committed Spend UI deployments to latest commit

Updated deployments:
$DEPLOYMENTS

<b>Why:</b>
To promote new features, latest bug fixes, and dependency updates

<b>Tickets:</b>
N/A

<b>Validation:</b>
QE has verified all queued issues
EEOOFF
}

# Use gh in a non-interactive way -- see https://github.com/cli/cli/issues/1718
mergeRequest()
{
  DESC=`sed -e ':a' -e 'N' -e '$!ba' -e 's|\n|<br/>|g' $DESC_FILE`

  echo "\n*** Pushing $SOURCE_BRANCH..."

  git push \
    -o merge_request.create \
    -o merge_request.title="$TITLE" \
    -o merge_request.description="$DESC" \
    -o merge_request.target_project=$TARGET_PROJECT \
    -o merge_request.target=$TARGET_BRANCH origin $SOURCE_BRANCH
}

push()
{
  echo ""
  read -p "*** You are pushing to the $SOURCE_BRANCH branch. Continue?" YN

  case $YN in
    [Yy]* ) echo "\n*** Pushing $SOURCE_BRANCH..."; git push -u origin $SOURCE_BRANCH;;
    [Nn]* ) exit 0;;
    * ) echo "Please answer yes or no."; push;;
  esac
}

# Get SHA for given namespace ref
#
# Note that the deply.yml file may contain multiple namespace refs.
#
# $1: Which SHA to return (e.g., hybrid-committed-spend-frontend)
# $2: The namespace ref
#
getAppInterfaceSHA()
{
  RESULT=
  SHA=
  NAMESPACE_REFS=`grep -n "\$ref: $2" $DEPLOY_CLOWDER_FILE | sed 's| ||g'`

  for NAMESPACE_REF in `echo "$NAMESPACE_REFS"`
  do
    NAMESPACE_LINE=`echo $NAMESPACE_REF | awk -F: '{print $1}'`
    COMMIT_LINE=`echo "$NAMESPACE_LINE + 1" | bc`
    COMMIT_REF=`head -n $COMMIT_LINE $DEPLOY_CLOWDER_FILE | tail -n 1 | sed 's| ||g'`
    SHA="$SHA `echo $COMMIT_REF | awk -F: '{print $2}'`"
  done

  if [ $1 = $HCS_UI ]; then
    RESULT=`echo "$SHA" | awk -F' ' '{print $1}' | sed 's| ||g'`
  elif [ $1 = $HCS_UI_ROS ]; then
    RESULT=`echo "$SHA" | awk -F' ' '{print $2}' | sed 's| ||g'`
  fi
}

initAppInterfaceSHA()
{
  getAppInterfaceSHA $HCS_UI $PROD_FRONTENDS
  HCCM_PROD_FRONTENDS_SHA="$RESULT"

  echo "Existing SHA refs..."
  echo "$HCS_UI prod: $HCCM_PROD_FRONTENDS_SHA"
}

initSHA()
{
  cd $HCS_UI_DIR

  HCCM_PROD_SHA=`git rev-parse origin/$PROD_BRANCH`

  echo "Latest SHA refs..."
  echo "$HCS_UI-hccm prod: $HCCM_PROD_SHA"
}

updateDeploySHA()
{
  # prod deploy
  if [ "$DEPLOY_HCCM_PROD" = true ]; then
      sed "s|$HCCM_PROD_FRONTENDS_SHA|$HCCM_PROD_SHA|" $DEPLOY_CLOWDER_FILE > ${DEPLOY_CLOWDER_FILE}.tmp
      mv ${DEPLOY_CLOWDER_FILE}.tmp $DEPLOY_CLOWDER_FILE
  fi
}

# main()
{
  default

  while getopts hp c; do
    case $c in
      p) DEPLOY_HCCM_PROD=true;;
      u) PUSH=true;;
      h) usage; exit 0;;
      \?) usage; exit 1;;
    esac
  done

  if [ -z "$DEPLOY_HCCM_PROD" ]; then
    usage
    exit 1
  fi

  echo "\n*** Deploying $APP_INTERFACE with SHA updates for...\n"
  createDeploymentDesc
  cat $DEPLOYMENTS_FILE
  echo

  cloneAppInterface
  cloneUI

  initAppInterfaceSHA
  initSHA

  updateDeploySHA
  commit

  if [ "$?" -eq 0 ]; then
    createMergeRequestDesc
    mergeRequest
  else
    echo "\n*** Cannot push. No changes or check for conflicts"
  fi

  rm -rf $TMP_DIR
}
