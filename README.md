# Hybrid Committed Spend

[![AGPLv3][license-badge]][license]
[![Build Status][build-badge]][build]

# hybrid-committed-spend

React.js app for Red Hat Hybrid Committed Spend.

User interface is based on Red Hat cloud service frontend components and Patternfly [![Patternfly][pf-logo]][patternfly]

To submit an issue, please visit https://issues.redhat.com/projects/HCS/issues

## Initial etc/hosts setup

In order to access the https://[env].foo.redhat.com in your browser, you have to add entries to your `/etc/hosts` file. This is a **one-time** setup that has to be done only once (unless you modify hosts) on each machine.

To setup the hosts file run following command:
```
npm run patch:hosts
```

If this command throws an error run it as a `sudo`:
```
sudo npm run patch:hosts
```

## Getting started

1. ```npm install```

2. ```npm run start```

3. Open browser in URL listed in the terminal output. For example:

```
https://stage.foo.redhat.com:1337/beta/business-services/hybrid-committed-spend
```

### Testing

`npm run verify` will run `npm run lint` (eslint) and `npm test` (Jest)

## Testing UI changes locally with Cloud Services Config

See https://github.com/RedHatInsights/cloud-services-config#testing-your-changes-locally

```npm run start:csc```

## Deploying

This [release][release-doc] doc describes how to release the UI to each staging environment.

[build]: https://app.travis-ci.com/github/RedHatInsights/hybrid-committed-spend-ui
[build-badge]: https://img.shields.io/travis/RedHatInsights/hybrid-committed-spend-ui.svg?style=for-the-badge
[koku-readme]: https://github.com/project-koku/koku#readme
[license-badge]: https://img.shields.io/github/license/RedHatInsights/hybrid-committed-spend-ui.svg?longCache=true&style=for-the-badge
[license]: https://github.com/RedHatInsights/hybrid-committed-spend-ui/blob/main/LICENSE
[pf-logo]: https://www.patternfly.org/v4/images/logo.4189e7eb1a0741ea2b3b51b80d33c4cb.svg
[patternfly]: https://www.patternfly.org/
[release-doc]: https://github.com/RedHatInsights/hybrid-committed-spend-ui/blob/main/RELEASE.md
