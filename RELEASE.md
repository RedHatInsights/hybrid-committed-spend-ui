# Releasing Hybrid Committed Spend UI

This doc describes how to release Hybrid Committed Spend UI to each staging environment. Note that this should be done in order for testing purposes; stage-stable, prod-beta, and finally prod-stable

## Merge branches script

The merge-branch script creates a PR with a unique SHA, used for a namespace \`ref\` in the app-interface repo. The script also ensures that code is always pulled from the correct branches. For example, we always:

1. Pull from master when pushing to prod-stable

Note: Pushing to master automatically deploys to the stage env.

### Merge main to prod-stable

```
sh scripts/release-branch.sh -p
```

### Wrapper for all merges

```
node ../../scripts/release-all.js
```

Follow the prompts below.

* Are you deploying to app-interface? `N`
* Which Chrome environment do you want to release? `stage`

## Deployments for app-interface

The deploy-branch script will update app-interface with the latest SHA refs from the koku-ui branches above. The script also ensures that SHA refs are always pulled from the correct branches. For example, we always:

1. Pull from prod-stable when updating the stage deployment in app-interface

### Deploy prod-hccm to app-interface

```
sh ../../scripts/deploy-branch.sh -p
```

### Wrapper for all deployments

```
node ../../scripts/release-all.js
```

Follow the prompts below.

* Are you deploying to app-interface? `Y`
* Which Chrome environment do you want to release? `stage`

## Manual deployment

After all PRs have been merged, update the \`hybrid-committed-spend-frontend\` resource in https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/data/services/insights/hybrid-committed-spend/deploy.yml

Use the latest commit of each branch to update namespaces \`ref\` in the app-interface repo. Don't use a merge commit, SHAs must be unique when images are created for each branch.

```
- name: hybrid-committed-spend-frontend
  ...
    # Stage Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/stage-frontends.yml
    ref: 68ce48592f5222029f27f6fb708698013d2f0a58 // Replace with latest SHA for stage-hccm branch
    ...
    # Prod Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/prod-frontends.yml
    ref: c7f6c75fd1e895afbc05a2a6d26835fa16a0edfa // Replace with latest SHA for prod-hccm branch
    ...
```

## Testing

After releasing to each staging environment, open an incognito window and view one of the staging environments below.

Please ensure expected changes have been updated before releasing to the next staging environment.

1. For stage, view https://console.stage.redhat.com/business-services/hybrid-committed-spend/
2. For prod-stable, view https://console.redhat.com/business-services/hybrid-committed-spend/

## Release notes

After releasing to prod-hccm, a new tag will be created here https://github.com/RedHatInsights/hybrid-committed-spend-ui/tags. Create a new GitHub release based on this tag -- use the tag label as the "release title".

Note that you may  "Draft a new release", before the latest tag is available, and mark it as a "pre-release" -- don't click "publish release" yet, use "save draft".

Please document any new features and bug fixes available in production and other staging environments. For example, note any features that are only available in stage.

For release examples, please see existing releases here https://github.com/RedHatInsights/hybrid-committed-spend-ui/releases

## Troubleshooting

If a staging environment has not updated as expected, it's best to ask questions in the forum-consoledot-ui or proj-fecontainer-migration channels of http://coreos.slack.com.

Alternatively, open a Jira issue under the "ConsoleDot Platform (console.redhat.com) (RHCLOUD)" project category. For an example, see https://issues.redhat.com/browse/RHCLOUD-18259
