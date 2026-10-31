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
  MAIN_BRANCH="main"
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
  PROD_MULTICLUSTER_FRONTENDS=/services/insights/frontend-operator/namespaces/prod-multicluster-frontends.yml
  STAGE_FRONTENDS=/services/insights/frontend-operator/namespaces/stage-frontends.yml
  STAGE_MULTICLUSTER_FRONTENDS=/services/insights/frontend-operator/namespaces/stage-multicluster-frontends.yml

  DESC_FILE="$TMP_DIR/desc"
  DEPLOY_CLOWDER_FILE="$APP_INTERFACE_DIR/data/services/insights/hybrid-committed-spend/deploy.yml"
  DEPLOYMENTS_FILE="$TMP_DIR/deployments"
}

usage()
{
cat <<- EEOOFF

    This script deploys app-interface with the latest SHA on $MAIN_BRANCH, then creates a merge request.
    SSH keys are assumed.

    Pushing to $MAIN_BRANCH builds images and updates stage. Prod (-p) pins namespace refs to that SHA.
    release:all deploys prod only. -s remains so stage can be pinned by hand.

    sh [-x] $SCRIPT [-h|-p|-s|-u]

    OPTIONS:
    h       Display this message
    p       Deploy SHA refs from $MAIN_BRANCH to app-interface prod
    s       Deploy SHA refs from $MAIN_BRANCH to app-interface stage
    u       Update fork master to match upstream before pushing the deploy branch

    Note: Stage refs can stay on "$MAIN_BRANCH" for auto-deploy.

    This script lacks permission to push directly upstream, so commits will be pushed to this fork:
    $APP_INTERFACE_FORK -- override user via the GITLAB_USER env var.

EEOOFF
}

cleanup()
{
  echo "\n*** Cleaning temp directory..."
  rm -rf $TMP_DIR
}

cloneAppInterface()
{
  mkdir -p $TMP_DIR
  cd $TMP_DIR

  if [ ! -d "$APP_INTERFACE_DIR" ]; then
    echo ""
    git clone $APP_INTERFACE_REPO
  fi
}

cloneUI()
{
  mkdir -p $TMP_DIR
  cd $TMP_DIR

  if [ ! -d "$HCS_UI_DIR" ]; then
    echo ""
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

  if [ "$UPDATE_FORK_MASTER" = true ]; then
    updateForkMaster
  fi

  git branch -m $SOURCE_BRANCH
  git commit -m "$TITLE" $DEPLOY_CLOWDER_FILE
}

createDeploymentDesc()
{
  mkdir -p $TMP_DIR

  {
    if [ "$DEPLOY_STAGE" = "true" ]; then
      echo "${HCS_UI}: Stage deployment"
    fi
    if [ "$DEPLOY_PROD" = "true" ]; then
      if [ -n "$HCS_TAG" ]; then
        echo "${HCS_UI}: Prod deployment | <a href=https://github.com/RedHatInsights/hybrid-committed-spend-ui/releases/tag/${HCS_TAG} target="_blank">${HCS_TAG}</a>"
      else
        echo "${HCS_UI}: Prod deployment"
      fi
    fi
  } > "$DEPLOYMENTS_FILE"

  DEPLOYMENTS=`cat $DEPLOYMENTS_FILE`
}

createMergeRequestDesc()
{
  createDeploymentDesc

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

# Tag created by tag_release.yml for the given SHA, if it is new.
#
# $1: commit SHA
# $2: tags that existed before the workflow ran
createdTag()
{
  RESULT=
  for TAG in `git tag --points-at "$1"`
  do
    echo "$TAG" | grep -Eq "^r\.[0-9]{4}\.[0-9]{2}\.[0-9]{2}\.[0-9]+$" || continue
    echo "$2" | grep -qx "$TAG" && continue
    RESULT="$TAG"
  done
  echo "$RESULT"
}

# Get SHA for given namespace ref
#
# Note that the deploy.yml file may contain multiple namespace refs.
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
  fi
}

initAppInterfaceSHA()
{
  getAppInterfaceSHA $HCS_UI $STAGE_FRONTENDS
  STAGE_FRONTENDS_SHA="$RESULT"

  getAppInterfaceSHA $HCS_UI $STAGE_MULTICLUSTER_FRONTENDS
  STAGE_MULTICLUSTER_FRONTENDS_SHA="$RESULT"

  getAppInterfaceSHA $HCS_UI $PROD_FRONTENDS
  PROD_FRONTENDS_SHA="$RESULT"

  getAppInterfaceSHA $HCS_UI $PROD_MULTICLUSTER_FRONTENDS
  PROD_MULTICLUSTER_FRONTENDS_SHA="$RESULT"

  echo "\nExisting SHA refs..."
  echo "$HCS_UI stage: $STAGE_FRONTENDS_SHA"
  echo "$HCS_UI stage multicluster: $STAGE_MULTICLUSTER_FRONTENDS_SHA"
  echo "$HCS_UI prod: $PROD_FRONTENDS_SHA"
  echo "$HCS_UI prod multicluster: $PROD_MULTICLUSTER_FRONTENDS_SHA"
}

initSHA()
{
  cd $HCS_UI_DIR

  SHA=`git rev-parse origin/$MAIN_BRANCH`

  echo "\nLatest SHA refs..."
  echo "$HCS_UI ($MAIN_BRANCH): $SHA"
}

# Use gh in a non-interactive way -- see https://github.com/cli/cli/issues/1718
mergeRequest()
{
  cd $APP_INTERFACE_DIR

  createMergeRequestDesc

  DESC=`sed -e ':a' -e 'N' -e '$!ba' -e 's|\n|<br/>|g' $DESC_FILE`

  echo "\n*** Pushing $SOURCE_BRANCH..."

  git push \
    -o merge_request.create \
    -o merge_request.title="$TITLE" \
    -o merge_request.description="$DESC" \
    -o merge_request.target_project=$TARGET_PROJECT \
    -o merge_request.target=$TARGET_BRANCH origin $SOURCE_BRANCH
}

# Replace the commit SHA only on the target whose namespace $ref matches.
# Stage and prod can share the same SHA after consolidating to main,
# so we must not gsub across the whole resource block.
#
# $1: resource name (hybrid-committed-spend-frontend)
# $2: namespace $ref path
# $3: new SHA
replaceSHA()
{
  RESOURCE="$1"
  NAMESPACE="$2"
  NEW_SHA="$3"

  if [ -z "$NEW_SHA" ] || [ "$NEW_SHA" = "$MAIN_BRANCH" ]; then
    return
  fi

  awk -v resource="$RESOURCE" -v ns="$NAMESPACE" -v new="$NEW_SHA" '
    /^[[:space:]]*- name:[[:space:]]+/ {
      in_block = ($0 ~ ("name:[[:space:]]*" resource "([[:space:]]|$)"))
      match_ns = 0
      print
      next
    }
    in_block && index($0, "$ref: " ns) {
      match_ns = 1
      print
      next
    }
    in_block && match_ns && $0 ~ /^[[:space:]]*ref:[[:space:]]/ {
      sub(/ref:[[:space:]].*/, "ref: " new)
      match_ns = 0
      print
      next
    }
    { print }
  ' "$DEPLOY_CLOWDER_FILE" > "${DEPLOY_CLOWDER_FILE}.tmp"
  mv "${DEPLOY_CLOWDER_FILE}.tmp" "$DEPLOY_CLOWDER_FILE"
}

# Tag the SHA in hybrid-committed-spend-ui (does not tag stage deploys).
# Triggers .github/workflows/tag_release.yml, then fetches the tags it created.
tagRelease()
{
  cd $HCS_UI_DIR

  if [ "$DEPLOY_PROD" != true ]; then
    return
  fi

  git fetch origin --tags --force >/dev/null 2>&1
  EXISTING_TAGS=`git tag --list 'r.*'`

  echo "\n*** Tagging prod release for $HCS_UI at $SHA..."
  gh workflow run tag_release.yml -f commit="$SHA"

  echo "\n*** Waiting for tags... https://github.com/RedHatInsights/hybrid-committed-spend-ui/actions/workflows/tag_release.yml"

  TRIES=0
  while [ $TRIES -lt 24 ]
  do
    sleep 5
    git fetch origin --tags --force >/dev/null 2>&1
    HCS_TAG=`createdTag "$SHA" "$EXISTING_TAGS"`
    if [ -n "$HCS_TAG" ]; then
      break
    fi
    TRIES=`expr $TRIES + 1`
  done

  echo "*** $HCS_UI tag: ${HCS_TAG:-not found}"
}

updateDeploySHA()
{
  # hybrid-committed-spend-frontend stage deploy
  if [ "$DEPLOY_STAGE" = true ]; then
    replaceSHA "$HCS_UI" "$STAGE_FRONTENDS" "$SHA"
    replaceSHA "$HCS_UI" "$STAGE_MULTICLUSTER_FRONTENDS" "$SHA"
  fi

  # hybrid-committed-spend-frontend prod deploy
  if [ "$DEPLOY_PROD" = true ]; then
    replaceSHA "$HCS_UI" "$PROD_FRONTENDS" "$SHA"
    replaceSHA "$HCS_UI" "$PROD_MULTICLUSTER_FRONTENDS" "$SHA"
  fi
}

# Push current upstream master to the fork. A large first-time pack can make
# GitLab reject merge_request.create with "Source branch does not exist".
updateForkMaster()
{
  cd $APP_INTERFACE_DIR

  echo "\n*** Updating fork master..."
  if git push origin HEAD:master; then
    echo "*** Fork master updated."
  else
    echo "*** Failed to update fork master. Update it in GitLab (Update fork), then retry."
  fi
}

# main()
{
  default

  while getopts hpsu c; do
    case $c in
      p) DEPLOY_PROD=true;;
      s) DEPLOY_STAGE=true;;
      u) UPDATE_FORK_MASTER=true;;
      h) usage; exit 0;;
      \?) usage; exit 1;;
    esac
  done

  if [ -z "$DEPLOY_PROD" -a -z "$DEPLOY_STAGE" ]; then
    usage
    exit 1
  fi

  trap cleanup SIGINT SIGTERM EXIT

  echo "\n*** Deploying $APP_INTERFACE with SHA updates for...\n"
  createDeploymentDesc
  cat $DEPLOYMENTS_FILE

  cloneAppInterface
  cloneUI

  initAppInterfaceSHA
  initSHA

  updateDeploySHA
  commit

  if [ "$?" -eq 0 ]; then
    tagRelease
    mergeRequest
  else
    echo "\n*** Cannot push. No changes or check for conflicts"
  fi
}
