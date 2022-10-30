/* eslint-disable @typescript-eslint/no-loss-of-precision */

// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?filter[limit]=3&group_by[affiliate]=*&start_date=2022-06-23&end_date=2022-09-21&filter[resolution]=monthly

export const emptyData = {
  meta: {
    count: 0,
    start_date: '2022-06-23',
    end_date: '2022-09-21',
    filter: {
      resolution: 'monthly',
      limit: 3,
    },
    group_by: {
      affiliate: ['*'],
    },
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 0,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 0,
          units: 'USD',
        },
        distributed: {
          value: 0,
          units: 'USD',
        },
        total: {
          value: 0,
          units: 'USD',
        },
      },
      supplementary: {
        raw: {
          value: 0,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 0,
          units: 'USD',
        },
        distributed: {
          value: 0,
          units: 'USD',
        },
        total: {
          value: 0,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 0,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 0,
          units: 'USD',
        },
        distributed: {
          value: 0,
          units: 'USD',
        },
        total: {
          value: 0,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Baffiliate%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
    next: null,
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Baffiliate%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
  },
  data: [],
};
