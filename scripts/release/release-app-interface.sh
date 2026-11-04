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
  QUAY_ORG="redhat-services-prod/rh-hcs-tenant"
  QUAY_IMAGE=hcs-frontend
  QUAY_POLL_INTERVAL=30
  QUAY_WAIT_TIMEOUT=1200

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

    This script deploys app-interface with the SHA from the Quay latest image, then creates a merge request.
    SSH keys are assumed.

    Pushing to $MAIN_BRANCH builds images and updates stage. Prod (-p) pins namespace refs to the full
    git SHA from Quay latest OCI labels (org.opencontainers.image.revision / vcs-ref) for $QUAY_IMAGE.
    If Quay labels are unavailable, the script asks whether to fall back to tip of $MAIN_BRANCH.
    If Quay lags tip of $MAIN_BRANCH or matches the current app-interface prod SHA, the script asks
    whether to continue, wait for a newer image (poll every ${QUAY_POLL_INTERVAL}s, timeout ${QUAY_WAIT_TIMEOUT}s),
    or abort.
    release:all deploys prod only. -s remains so stage can be pinned by hand.

    sh [-x] $SCRIPT [-h|-p|-s|-u]

    OPTIONS:
    h       Display this message
    p       Deploy SHA refs for $HCS_UI to app-interface prod
    s       Deploy SHA refs for $HCS_UI to app-interface stage
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

# Ask whether to use tip of the given branch when Quay cannot supply a SHA.
# Default is no (abort) so non-TTY / empty Enter does not pin an unverified SHA.
#
# $1: display name
# $2: branch name (e.g. main)
confirmMainFallback()
{
  APP="$1"
  BRANCH="$2"
  MAIN_TIP=`git rev-parse origin/$BRANCH`

  echo ""
  echo "*** Warning: Could not resolve a deployable SHA from Quay latest for ${APP}."
  echo "*** Tip of origin/${BRANCH} is ${MAIN_TIP}; that commit may not have an image yet."
  printf "Use tip of origin/%s for %s? [y/N] " "$BRANCH" "$APP"
  read REPLY || REPLY=
  case "$REPLY" in
    y|Y|yes|YES)
      RESULT="$MAIN_TIP"
      ;;
    *)
      echo "*** Aborting. Wait for Quay latest labels, then retry."
      exit 1
      ;;
  esac
}

# Warn when Quay lags main or matches existing app-interface prod; prompt continue/wait/abort.
# Sets RESULT to the SHA to deploy.
#
# $1: display name
# $2: branch name
# $3: Quay SHA
# $4: current app-interface prod frontends SHA (may be empty or "main")
# $5: current app-interface prod multicluster SHA (may be empty or "main")
confirmQuaySHA()
{
  APP="$1"
  BRANCH="$2"
  QUAY_SHA="$3"
  AI_SHA="$4"
  AI_MC_SHA="$5"
  MAIN_TIP=`git rev-parse origin/$BRANCH`

  BEHIND_MAIN=
  SAME_AS_AI=
  if [ "$QUAY_SHA" != "$MAIN_TIP" ]; then
    BEHIND_MAIN=true
  fi
  if [ -n "$AI_SHA" ] && [ "$AI_SHA" != "$MAIN_BRANCH" ] && [ "$QUAY_SHA" = "$AI_SHA" ]; then
    SAME_AS_AI=true
  fi
  if [ -n "$AI_MC_SHA" ] && [ "$AI_MC_SHA" != "$MAIN_BRANCH" ] && [ "$QUAY_SHA" = "$AI_MC_SHA" ]; then
    SAME_AS_AI=true
  fi

  if [ -z "$BEHIND_MAIN" ] && [ -z "$SAME_AS_AI" ]; then
    RESULT="$QUAY_SHA"
    return
  fi

  echo ""
  if [ "$BEHIND_MAIN" = true ]; then
    echo "*** Warning: Quay latest for ${APP} (${QUAY_SHA}) differs from tip of origin/${BRANCH} (${MAIN_TIP})."
    echo "*** A merge may still be building; the image for tip of ${BRANCH} may not be ready yet."
  fi
  if [ "$SAME_AS_AI" = true ]; then
    echo "*** Warning: Quay latest for ${APP} (${QUAY_SHA}) matches a current app-interface prod SHA."
    echo "*** Continuing would make no deployment change for that prod ref."
  fi

  printf "Continue with Quay SHA, wait for a newer image, or abort? [c/w/A] "
  read REPLY || REPLY=
  case "$REPLY" in
    c|C|continue|CONTINUE)
      RESULT="$QUAY_SHA"
      ;;
    w|W|wait|WAIT)
      if waitForQuayImage "$APP" "$BRANCH" "$QUAY_SHA"; then
        return
      fi
      getQuayLatestSHA
      CURRENT_QUAY="$RESULT"
      [ -z "$CURRENT_QUAY" ] && CURRENT_QUAY="$QUAY_SHA"
      echo ""
      printf "Continue with current Quay SHA (%s)? [y/N] " "$CURRENT_QUAY"
      read REPLY || REPLY=
      case "$REPLY" in
        y|Y|yes|YES)
          RESULT="$CURRENT_QUAY"
          ;;
        *)
          echo "*** Aborting."
          exit 1
          ;;
      esac
      ;;
    *)
      echo "*** Aborting."
      exit 1
      ;;
  esac
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

# Resolve full git SHA from Quay latest image config labels.
# Sets RESULT to the SHA on success, empty on failure. Requires jq.
getQuayLatestSHA()
{
  RESULT=
  REPO="${QUAY_ORG}/${QUAY_IMAGE}"
  TAG_URL="https://quay.io/api/v1/repository/${REPO}/tag/?specificTag=latest&onlyActiveTags=true"

  DIGEST=`curl -fsSL "$TAG_URL" 2>/dev/null | jq -r '.tags[0].manifest_digest // empty'` || DIGEST=

  if [ -z "$DIGEST" ]; then
    return
  fi

  CFG=`curl -fsSL "https://quay.io/api/v1/repository/${REPO}/manifest/${DIGEST}" 2>/dev/null \
    | jq -r '.manifest_data | fromjson | .config.digest // empty'` || CFG=

  if [ -z "$CFG" ]; then
    return
  fi

  TOK=`curl -fsSL "https://quay.io/v2/auth?service=quay.io&scope=repository:${REPO}:pull" 2>/dev/null \
    | jq -r '.token // empty'` || TOK=

  if [ -z "$TOK" ]; then
    return
  fi

  SHA_LABEL=`curl -fsSL \
    -H "Authorization: Bearer ${TOK}" \
    -H "Accept: application/vnd.docker.container.image.v1+json" \
    "https://quay.io/v2/${REPO}/blobs/${CFG}" 2>/dev/null \
    | jq -r '.config.Labels["org.opencontainers.image.revision"] // .config.Labels["vcs-ref"] // empty'` || SHA_LABEL=

  if [ -z "$SHA_LABEL" ]; then
    return
  fi

  case "$SHA_LABEL" in
    *[!0-9a-f]*)
      echo "*** Warning: Quay label for ${QUAY_IMAGE} is not a lowercase hex SHA" >&2
      return
      ;;
  esac
  if [ "${#SHA_LABEL}" -ne 40 ]; then
    echo "*** Warning: Quay label for ${QUAY_IMAGE} is not a full 40-character SHA" >&2
    return
  fi

  # Deploy registry tags short SHAs; confirm the short tag matches latest's digest.
  SHORT=`echo "$SHA_LABEL" | cut -c1-7`
  SHORT_DIGEST=`curl -fsSL \
    "https://quay.io/api/v1/repository/${REPO}/tag/?specificTag=${SHORT}&onlyActiveTags=true" 2>/dev/null \
    | jq -r '.tags[0].manifest_digest // empty'` || SHORT_DIGEST=

  if [ -z "$SHORT_DIGEST" ] || [ "$SHORT_DIGEST" != "$DIGEST" ]; then
    echo "*** Warning: Quay short tag ${SHORT} missing or digest mismatch for ${QUAY_IMAGE}" >&2
    return
  fi

  RESULT="$SHA_LABEL"
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

  echo "\nResolving deploy SHA ref from Quay latest (${QUAY_ORG}/${QUAY_IMAGE})..."
  resolveSHA "$PROD_FRONTENDS_SHA" "$PROD_MULTICLUSTER_FRONTENDS_SHA"
  SHA="$RESULT"
  echo "$HCS_UI: $SHA"
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

# Resolve SHA: Quay latest preferred; prompt for tip-of-branch fallback.
#
# $1: current app-interface prod frontends SHA
# $2: current app-interface prod multicluster SHA
resolveSHA()
{
  AI_SHA="$1"
  AI_MC_SHA="$2"
  RESULT=

  getQuayLatestSHA
  if [ -n "$RESULT" ]; then
    if ! git merge-base --is-ancestor "$RESULT" "origin/$MAIN_BRANCH" 2>/dev/null; then
      echo "*** Warning: Quay SHA $RESULT for ${HCS_UI} is not an ancestor of origin/${MAIN_BRANCH}" >&2
    fi
    confirmQuaySHA "$HCS_UI" "$MAIN_BRANCH" "$RESULT" "$AI_SHA" "$AI_MC_SHA"
    return
  fi

  confirmMainFallback "$HCS_UI" "$MAIN_BRANCH"
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

# Poll Quay until latest differs from START_SHA and matches tip of BRANCH.
# Sets RESULT to the new SHA on success; empty RESULT and return 1 on timeout.
#
# $1: display name
# $2: branch name
# $3: Quay SHA when wait started
waitForQuayImage()
{
  APP="$1"
  BRANCH="$2"
  START_SHA="$3"
  ELAPSED=0

  echo ""
  echo "*** Waiting up to ${QUAY_WAIT_TIMEOUT}s for a newer Quay image matching origin/${BRANCH}..."
  echo "*** Polling every ${QUAY_POLL_INTERVAL}s (Konflux builds often take 10+ minutes)."

  while [ "$ELAPSED" -lt "$QUAY_WAIT_TIMEOUT" ]
  do
    sleep "$QUAY_POLL_INTERVAL"
    ELAPSED=`expr "$ELAPSED" + "$QUAY_POLL_INTERVAL"`

    git fetch origin "$BRANCH" >/dev/null 2>&1
    MAIN_TIP=`git rev-parse origin/$BRANCH`
    getQuayLatestSHA
    QUAY_NOW="$RESULT"

    QUAY_SHORT=`echo "${QUAY_NOW:-unknown}" | cut -c1-7`
    MAIN_SHORT=`echo "$MAIN_TIP" | cut -c1-7`
    echo "*** [${ELAPSED}s/${QUAY_WAIT_TIMEOUT}s] Quay=${QUAY_SHORT} main=${MAIN_SHORT}"

    if [ -n "$QUAY_NOW" ] && [ "$QUAY_NOW" != "$START_SHA" ] && [ "$QUAY_NOW" = "$MAIN_TIP" ]; then
      echo "*** New image ready: $QUAY_NOW"
      RESULT="$QUAY_NOW"
      return 0
    fi
  done

  echo "*** Timed out after ${QUAY_WAIT_TIMEOUT}s waiting for Quay to catch origin/${BRANCH}."
  RESULT=
  return 1
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

  if ! command -v jq >/dev/null 2>&1; then
    echo "*** Required command not found: jq"
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
