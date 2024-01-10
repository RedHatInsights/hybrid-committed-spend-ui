# Releasing Hybrid Committed Spend UI

This doc describes how to release Hybrid Committed Spend UI to each staging environment. Note that this should be done in order for testing purposes; stage-stable, prod-beta, and finally prod-stable

## Release script

The release script creates a PR with a unique SHA, used for a namespace \`ref\` in the app-interface repo. The script also ensures that code is always pulled from the correct branches. For example, we always:

1. Pull from master when pushing to stage-stable
2. Pull from stage-stable when pushing to prod-beta
3. Pull from prod-beta when pushing to prod-stable

### Release to stage-stable

```
sh scripts/release-branch.sh -s
```

### Release to prod-beta

```
sh scripts/release-branch.sh -b
```

### Release to prod-stable

```
sh scripts/release-branch.sh -p
```

## Deployment

After all PRs have been merged, update the \`hybrid-committed-spend-frontend\` resource in https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/data/services/insights/hybrid-committed-spend/deploy.yml

Use the latest commit of each branch to update namespaces \`ref\` in the app-interface repo. Don't use a merge commit, SHAs must be unique when images are created for each branch.

```
- name: hybrid-committed-spend-frontend
  ...
    # Stage Stable Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/stage-frontends.yml
    ref: 4b19fba6c54b6679a7be5010b9d97a5aab1fd48c // Replace with latest SHA for stage-beta branch
    ...
    # Prod Beta Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/prod-beta-frontends.yml
    ref: 13f34a18f2c97faa814228fa38b5f5d32bed2ba3 // Replace with latest SHA for prod-beta branch
    ...
    # Prod Stable Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/prod-frontends.yml
    ref: fbb0a70816dd656dbf6cb06654ed3c5d7e1ab379 // Replace with latest SHA for prod-stable branch
    ...
```

## Testing

After releasing to each staging environment, open an incognito window and view one of the staging environments below.

Please ensure expected changes have been updated before releasing to the next staging environment.

1. For stage-stable, view https://console.stage.redhat.com/business-services/hybrid-committed-spend/
2. For prod-beta, view https://console.redhat.com/beta/business-services/hybrid-committed-spend/
3. For prod-stable, view https://console.redhat.com/business-services/hybrid-committed-spend/

## Troubleshooting

If a staging environment has not updated as expected, it's best to ask questions in the forum-consoledot-ui or proj-fecontainer-migration channels of http://coreos.slack.com.

Alternatively, open a Jira issue under the "ConsoleDot Platform (console.redhat.com) (RHCLOUD)" project category. For an example, see https://issues.redhat.com/browse/RHCLOUD-18259
