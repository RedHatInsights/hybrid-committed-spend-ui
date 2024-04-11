# Hybrid Committed Spend UI

[![Apache 2.0][license-badge]](https://github.com/RedHatInsights/hybrid-committed-spend-ui/blob/main/LICENSE)
[![CI Status][build-badge]](https://github.com/RedHatInsights/hybrid-committed-spend-ui/actions/workflows/tag_release.yml)
[![codecov][codecov-badge]](https://codecov.io/gh/RedHatInsights/hybrid-committed-spend-ui)

React.js app for Red Hat Hybrid Committed Spend.

User interface is based on [Patternfly].

Submit issues in [Jira].

## Requirements

* [NodeJS v18.15+][nodejs]
* [npm v9.5+][npm]

## Setup `hosts` entries (do this once)

Edit the `/etc/hosts` file and add the following entries
```
127.0.0.1 prod.foo.redhat.com
127.0.0.1 stage.foo.redhat.com
```

Alternatively, run the [patch-etc-hosts.sh][patch-etc-hosts] script from the insights-proxy repo
```
sudo bash scripts/patch-etc-hosts.sh
```

## Getting Started

1. Install requirements listed above.
2. Setup `/etc/hosts` entries listed above.
3. Clone the repository, and open a terminal in the base of this project.
4. Run the command `npm install` to install all the dependencies.

## Building
```
npm build
```

## Testing
```
npm test
```

## Running Hybrid Committed Spend UI against a hosted Billing API, using webpack proxy

Note that this approach currently supports the Insights stage-beta, stage-stable, prod-beta, and prod-stable environments.

1. Start development server
```
npm start
```

Follow the prompts that follow.

* Do you want to use local api? `no`
* Which platform environment you want to use `stage`
* Which Chrome environment you want to use? `beta`

2. Open the following URL
```
https://stage.foo.redhat.com:1337/beta/business-services/hybrid-committed-spend
```

### Running Hybrid Committed Spend UI with local Cloud Services Backend

Refer to the [serving files locally][serving-files-locally] section of cloud services config for more details

1. Serve files locally from Cloud Services Backend repo
```
make dev-static-node
```

2. Start development server in Hybrid Committed Spend repo
```
npm start:csb
```

## Releasing Hybrid Committed Spend UI

This [release][release-doc] doc describes how to release Hybrid Committed Spend UI to each staging environment.

[build-badge]: https://github.com/RedHatInsights/hybrid-committed-spend-ui/actions/workflows/tag_release.yml/badge.svg
[codecov-badge]: https://codecov.io/gh/RedHatInsights/hybrid-committed-spend-ui/graph/badge.svg?token=1hjFIy1cRe
[Jira]: https://issues.redhat.com/projects/HCS/
[license-badge]: https://img.shields.io/github/license/RedHatInsights/hybrid-committed-spend-ui.svg?longCache=true
[nodejs]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[patch-etc-hosts]: https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh
[Patternfly]: https://www.patternfly.org/
[release-doc]: https://github.com/RedHatInsights/hybrid-committed-spend-ui/blob/main/RELEASE.md
[serving-files-locally]: https://github.com/RedHatInsights/chrome-service-backend/blob/main/docs/cloud-services-config.md#serving-files-locally
