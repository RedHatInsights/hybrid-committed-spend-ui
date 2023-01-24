// https://billing.dev.api.redhat.com/v1/reports/details

/*
Ankit Manendra, 9:43 AM
Hello @Dan Labrecque
I've pushed some new changes as per our last discussion.
> I've fixed the authentication issue, you should be able to access the details API now. LMK if you still have the same issue

> I've made updates to the existing code to support groupBy and filters on multiple columns. For now you can test primary groupby , I'm working on the secondary API call and will lyk when that is complete.

> you can use parameters for groupBy as: primaryGroupBy[affiliates] or primaryGroupBy[products] or primaryGroupBy[source_of_spend]. So for example: /details?primaryGroupBy[affiliates]=SAP SE

> similarly for filters, you can use: filter[products] or filter[affiliates] or filter[source_of_spend]

> for start date and end date, you can use parameters: startDate or endDate. So for example: ?startDate=22-09&endDate=2022-12

> Orderby/sorting support is WIP

Let me know if you find any issues or have any questions/concerns .

 */

export const primaryGroupByProduct = {
  meta: {
    count: '6',
    others: null,
    startDate: '2022-03',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&groupBy[product]=*&startDate=2022-03&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&groupBy[product]=*&startDate=2022-03&endDate=2022-12&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: ['*'], affiliate: [], source_of_spend: [] },
    order_by: {},
  },
  data: [
    {
      date: '2022-06',
      products: [
        { product: 'RHEL 8', values: [] },
        {
          product: 'RHEL Server',
          values: [
            {
              actual_spend: { value: '60', units: 'EUR' },
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283225', units: 'EUR' },
              product: 'RHEL Server',
              date: '2022-06',
            },
          ],
        },
      ],
    },
    {
      date: '2022-07',
      products: [
        {
          product: 'RHEL 8',
          values: [
            {
              actual_spend: { value: '70', units: 'EUR' },
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL 8',
              date: '2022-07',
            },
          ],
        },
        { product: 'RHEL Server', values: [] },
      ],
    },
    {
      date: '2022-08',
      products: [
        { product: 'RHEL 8', values: [] },
        {
          product: 'RHEL Server',
          values: [
            {
              actual_spend: { value: '60', units: 'EUR' },
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
              date: '2022-08',
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      products: [
        { product: 'RHEL 8', values: [] },
        {
          product: 'RHEL Server',
          values: [
            {
              actual_spend: { value: '70', units: 'EUR' },
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
              date: '2022-09',
            },
          ],
        },
      ],
    },
    {
      date: '2022-10',
      products: [
        { product: 'RHEL 8', values: [] },
        {
          product: 'RHEL Server',
          values: [
            {
              actual_spend: { value: '70', units: 'EUR' },
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
              date: '2022-10',
            },
          ],
        },
      ],
    },
    {
      date: '2022-11',
      products: [
        { product: 'RHEL 8', values: [] },
        {
          product: 'RHEL Server',
          values: [
            {
              actual_spend: { value: '70', units: 'EUR' },
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
              date: '2022-11',
            },
          ],
        },
      ],
    },
  ],
};

export const affiliate = {
  meta: {
    count: '6',
    others: null,
    startDate: '2022-05',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&primaryGroupBy[affiliate]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&primaryGroupBy[affiliate]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: [], affiliate: ['*'], source_of_spend: [] },
    order_by: { date: null, committedSpend: null, products: null, affiliates: null, sourcesOfSpend: null },
  },
  data: [
    {
      date: '2022-06',
      affiliates: [
        {
          values: [
            {
              date: '2022-06',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
          affiliate: 'SAP SE',
        },
      ],
    },
    {
      date: '2022-07',
      affiliates: [
        {
          values: [
            {
              date: '2022-07',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL 8',
            },
          ],
          affiliate: 'SAP SE',
        },
      ],
    },
    {
      date: '2022-08',
      affiliates: [
        {
          values: [
            {
              date: '2022-08',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
          affiliate: 'SAP SE',
        },
      ],
    },
    {
      date: '2022-09',
      affiliates: [
        {
          values: [
            {
              date: '2022-09',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
          affiliate: 'SAP SE',
        },
      ],
    },
    {
      date: '2022-10',
      affiliates: [
        {
          values: [
            {
              date: '2022-10',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
          affiliate: 'SAP SE',
        },
      ],
    },
    {
      date: '2022-11',
      affiliates: [
        {
          values: [
            {
              date: '2022-11',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
          affiliate: 'SAP SE',
        },
      ],
    },
  ],
};

export const sourceOfSpend = {
  meta: {
    count: '6',
    others: null,
    startDate: '2022-05',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&primaryGroupBy[source_of_spend]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&primaryGroupBy[source_of_spend]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: [], affiliate: [], source_of_spend: ['*'] },
    order_by: { date: null, committedSpend: null, products: null, affiliates: null, sourcesOfSpend: null },
  },
  data: [
    {
      date: '2022-06',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-06',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-07',
      sources_of_spend: [
        {
          source_of_spend: 'RedHat',
          values: [
            {
              date: '2022-07',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL 8',
            },
          ],
        },
      ],
    },
    {
      date: '2022-08',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-08',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      sources_of_spend: [
        {
          source_of_spend: 'RedHat',
          values: [
            {
              date: '2022-09',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-10',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-10',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-11',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-11',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
  ],
};

export const filter = {
  meta: {
    count: '6',
    others: null,
    startDate: '2022-05',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&primaryGroupBy[product]=*&filter[product]=RHEL 8&filter[product]=RHEL Server&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&primaryGroupBy[product]=*&filter[product]=RHEL 8&filter[product]=RHEL Server&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
    },
    filter: {
      limit: '10',
      offset: '0',
      resolution: 'monthly',
      product: ['RHEL 8,RHEL Server'],
      affiliate: [],
      source_of_spend: [],
    },
    group_by: { product: ['*'], affiliate: [], source_of_spend: [] },
    order_by: { date: null, committedSpend: null, products: null, affiliates: null, sourcesOfSpend: null },
  },
  data: [
    {
      date: '2022-06',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-06',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-07',
      products: [
        {
          product: 'RHEL 8',
          values: [
            {
              date: '2022-07',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL 8',
            },
          ],
        },
      ],
    },
    {
      date: '2022-08',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-08',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-09',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-10',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-10',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-11',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-11',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
  ],
};

export const secondaryGroupByRHEL8 = {
  meta: {
    count: '1',
    others: null,
    startDate: '2022-05',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&primaryGroupBy[product]=RHEL 8&secondaryGroupBy[affiliate]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&primaryGroupBy[product]=RHEL 8&secondaryGroupBy[affiliate]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: ['RHEL 8'], affiliate: ['*'], source_of_spend: [] },
    order_by: { date: null, committedSpend: null, products: null, affiliates: null, sourcesOfSpend: null },
  },
  data: [
    {
      date: '2022-07',
      products: [
        {
          product: 'RHEL 8',
          affiliates: [
            {
              values: [
                {
                  date: '2022-07',
                  affiliate: 'SAP SE',
                  source_of_spend: 'RedHat',
                  committed_spend: { value: '39849678', units: 'EUR' },
                  product: 'RHEL 8',
                },
              ],
              affiliate: 'SAP SE',
            },
          ],
        },
      ],
    },
  ],
};

export const secondaryGroupByRHELServer = {
  meta: {
    count: '5',
    others: null,
    startDate: '2022-05',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&primaryGroupBy[product]=RHEL Server&secondaryGroupBy[affiliate]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&primaryGroupBy[product]=RHEL Server&secondaryGroupBy[affiliate]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: ['RHEL Server'], affiliate: ['*'], source_of_spend: [] },
    order_by: { date: null, committedSpend: null, products: null, affiliates: null, sourcesOfSpend: null },
  },
  data: [
    {
      date: '2022-06',
      products: [
        {
          product: 'RHEL Server',
          affiliates: [
            {
              values: [
                {
                  date: '2022-06',
                  affiliate: 'SAP SE',
                  source_of_spend: 'Red Hat Marketplace',
                  committed_spend: { value: '13283226', units: 'EUR' },
                  product: 'RHEL Server',
                },
              ],
              affiliate: 'SAP SE',
            },
          ],
        },
      ],
    },
    {
      date: '2022-08',
      products: [
        {
          product: 'RHEL Server',
          affiliates: [
            {
              values: [
                {
                  date: '2022-08',
                  affiliate: 'SAP SE',
                  source_of_spend: 'Red Hat Marketplace',
                  committed_spend: { value: '13283226', units: 'EUR' },
                  product: 'RHEL Server',
                },
              ],
              affiliate: 'SAP SE',
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      products: [
        {
          product: 'RHEL Server',
          affiliates: [
            {
              values: [
                {
                  date: '2022-09',
                  affiliate: 'SAP SE',
                  source_of_spend: 'RedHat',
                  committed_spend: { value: '39849678', units: 'EUR' },
                  product: 'RHEL Server',
                },
              ],
              affiliate: 'SAP SE',
            },
          ],
        },
      ],
    },
    {
      date: '2022-10',
      products: [
        {
          product: 'RHEL Server',
          affiliates: [
            {
              values: [
                {
                  date: '2022-10',
                  affiliate: 'SAP SE',
                  source_of_spend: 'Red Hat Marketplace',
                  committed_spend: { value: '39849678', units: 'EUR' },
                  product: 'RHEL Server',
                },
              ],
              affiliate: 'SAP SE',
            },
          ],
        },
      ],
    },
    {
      date: '2022-11',
      products: [
        {
          product: 'RHEL Server',
          affiliates: [
            {
              values: [
                {
                  date: '2022-11',
                  affiliate: 'SAP SE',
                  source_of_spend: 'Red Hat Marketplace',
                  committed_spend: { value: '39849678', units: 'EUR' },
                  product: 'RHEL Server',
                },
              ],
              affiliate: 'SAP SE',
            },
          ],
        },
      ],
    },
  ],
};

export const test = {
  meta: {
    count: '6',
    others: null,
    startDate: '2022-05',
    endDate: '2022-12',
    links: {
      first:
        '/v1/reports/details?accountNumber=1290557&primaryGroupBy[source_of_spend]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&primaryGroupBy[source_of_spend]=*&startDate=2022-05&endDate=2022-12&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: [], affiliate: [], source_of_spend: ['*'] },
    order_by: { date: null, committedSpend: null, products: null, affiliates: null, sourcesOfSpend: null },
  },
  data: [
    {
      date: '2022-06',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-06',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-07',
      sources_of_spend: [
        {
          source_of_spend: 'RedHat',
          values: [
            {
              date: '2022-07',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL 8',
            },
          ],
        },
      ],
    },
    {
      date: '2022-08',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-08',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '13283226', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      sources_of_spend: [
        {
          source_of_spend: 'RedHat',
          values: [
            {
              date: '2022-09',
              affiliate: 'SAP SE',
              source_of_spend: 'RedHat',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-10',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-10',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
    {
      date: '2022-11',
      sources_of_spend: [
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2022-11',
              affiliate: 'SAP SE',
              source_of_spend: 'Red Hat Marketplace',
              committed_spend: { value: '39849678', units: 'EUR' },
              product: 'RHEL Server',
            },
          ],
        },
      ],
    },
  ],
};
