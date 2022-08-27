# Releasing Hybrid Committed Spend

This doc describes how to release the UI to each staging environment. Note that this should be done in order for testing purposes; stage-stable, prod-beta, and finally prod-stable

## Release script

Using our script ensures that code is always pulled from the correct branches. For example, we always pull from: 

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

## Travis build

Whenever a branch is merged, our Travis script automatically builds and pushes a bundle to our RedHatInsights build repo.

To view our Travis build, see https://app.travis-ci.com/github/RedHatInsights/hybrid-committed-spend-ui/builds

## RedHatInsights build repo

After each successfully Travis build, you should see a new commit here https://github.com/RedHatInsights/hybrid-committed-spend-ui-build.

At this point, the Insights pipeline takes over and the bundle should be available shortly in the expected staging environment. 

Depending on how many builds are queued, this could take a few minutes or hours. Typically, the prod-stable environment is updated within 15-30 min.

## Testing

After releasing to each staging environment, open an incognito window and view one of the staging environments below.

Please ensure expected changes have been updated before releasing to the next staging environment.

1. For stage-stable, view https://console.stage.redhat.com/business-services/hybrid-committed-spend/
2. For prod-beta, view https://console.redhat.com/beta/business-services/hybrid-committed-spend/
3. For prod-stable, view https://console.redhat.com/business-services/hybrid-committed-spend/

## Troubleshooting

If a staging environment has not updated as expected, it's best to ask questions in the forum-consoledot-ui channel of http://coreos.slack.com.

Alternatively, open a Jira issue under the "ConsoleDot Platform (console.redhat.com) (RHCLOUD)" project category. For an example, see https://issues.redhat.com/browse/RHCLOUD-18259
