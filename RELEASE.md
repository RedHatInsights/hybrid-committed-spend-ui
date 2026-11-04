# Releasing Hybrid Committed Spend UI

Pushing to `main` builds the image and updates stage. Prod is pinned in app-interface to the full git SHA from the Quay `latest` image (OCI labels), which guarantees a deployable image exists when Quay resolution succeeds.

## Stage

No branch merge and no app-interface MR. After a commit reaches `main`, Konflux builds the image and stage follows that branch.

## Deploy prod to app-interface

`release-app-interface.sh` updates prod namespace refs from the Quay `latest` image for `hcs-frontend`:

1. Resolve `latest` → manifest digest on [Quay][quay-hcs]
2. Read `org.opencontainers.image.revision` (or `vcs-ref`) from the image config
3. Confirm the matching short SHA tag exists on that digest
4. Write that full SHA as the prod `ref`

If Quay resolution fails for any reason (labels, manifest, auth, or short-tag digest mismatch), the script warns and asks whether to fall back to tip of `main` (default: abort). Tip of `main` may not have an image yet.

If Quay `latest` differs from tip of `main` (image still building) or matches a current app-interface prod SHA (no change), the script asks whether to **continue**, **wait**, or **abort** (default: abort). Wait polls Quay every 30s for up to 20 minutes until a newer image matches tip of `main`. On timeout, it asks whether to continue with the current Quay SHA or abort.

### Deploy Quay latest to app-interface prod

```
sh scripts/release/release-app-interface.sh -p
```

### Wrapper

```
node scripts/release/release-all.js
```

Follow the prompts below.

* Do you want to update your app-interface fork's master? `Y` (recommended)

### Manual deployment

Update the \`hybrid-committed-spend-frontend\` resource in https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/data/services/insights/hybrid-committed-spend/deploy.yml

Use `main` for stage so it keeps auto-deploying. For prod, use the full git SHA from Quay `latest` (image config labels), not tip of `main` unless you have confirmed that image exists.

```
- name: hybrid-committed-spend-frontend
  ...
    # Stage Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/stage-frontends.yml
    ref: main // auto-deploy from main
    ...
    # Prod Deployment
  - namespace:
      $ref: /services/insights/frontend-operator/namespaces/prod-frontends.yml
    ref: <full SHA from Quay latest>
    ...
```

## Testing

After releasing to each environment, open an incognito window and view one of the environments below.

Please ensure expected changes have been updated before releasing to the next environment.

1. For stage, view https://console.stage.redhat.com/business-services/hybrid-committed-spend/
2. For prod, view https://console.redhat.com/business-services/hybrid-committed-spend/

## Release notes

After releasing to prod, `release-app-interface.sh` triggers the Tag Release workflow for the SHA deployed to prod. A new tag will be created here https://github.com/RedHatInsights/hybrid-committed-spend-ui/tags. Create a new GitHub release based on this tag -- use the tag label as the "release title".

You can also run the [Tag Release](https://github.com/RedHatInsights/hybrid-committed-spend-ui/actions/workflows/tag_release.yml) workflow manually and enter the prod commit SHA.

Note that you may  "Draft a new release", before the latest tag is available, and mark it as a "pre-release" -- don't click "publish release" yet, use "save draft".

Please document any new features and bug fixes available in production and other environments. For example, note any features that are only available in stage.

For release examples, please see existing releases here https://github.com/RedHatInsights/hybrid-committed-spend-ui/releases

## Troubleshooting

If a staging environment has not updated as expected, it's best to ask questions in the forum-consoledot-ui or proj-fecontainer-migration channels of http://coreos.slack.com.

Alternatively, open a Jira issue under the "ConsoleDot Platform (console.redhat.com) (RHCLOUD)" project category. For an example, see https://issues.redhat.com/browse/RHCLOUD-18259

[quay-hcs]: https://quay.io/repository/redhat-services-prod/rh-hcs-tenant/hcs-frontend?tab=tags&tag=latest
