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
export const primaryGroupBy = {
  meta: {
    count: '6',
    others: null,
    startDate: null,
    endDate: '2022-12-01T16:21:03.938Z',
    links: {
      first: '/v1/reports/details?accountNumber=1290557&endDate=2022-12-01T16:21:03.938Z&limit=10&offset=0',
      next: null,
      previous: null,
      last: '/v1/reports/details?accountNumber=1290557&endDate=2022-12-01T16:21:03.938Z&limit=10&offset=0',
    },
    filter: { limit: '10', offset: '0', resolution: 'monthly', product: [], affiliate: [], source_of_spend: [] },
    group_by: { product: [], affiliate: [], source_of_spend: [] },
    order_by: null,
  },
  data: [
    {
      date: '2022-11',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-11',
              affiliate: 'SAP SE',
              product: 'RHEL Server',
              committed_spend: { value: '39849678', units: 'EUR' },
              source_of_spend: 'Red Hat Marketplace',
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
              product: 'RHEL Server',
              committed_spend: { value: '13283226', units: 'EUR' },
              source_of_spend: 'Red Hat Marketplace',
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
              product: 'RHEL Server',
              committed_spend: { value: '39849678', units: 'EUR' },
              source_of_spend: 'Red Hat Marketplace',
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
              product: 'RHEL Server',
              committed_spend: { value: '39849678', units: 'EUR' },
              source_of_spend: 'RedHat',
            },
          ],
        },
      ],
    },
    {
      date: '2022-06',
      products: [
        {
          product: 'RHEL Server',
          values: [
            {
              date: '2022-06',
              affiliate: 'SAP SE',
              product: 'RHEL Server',
              committed_spend: { value: '13283226', units: 'EUR' },
              source_of_spend: 'Red Hat Marketplace',
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
              product: 'RHEL 8',
              committed_spend: { value: '39849678', units: 'EUR' },
              source_of_spend: 'RedHat',
            },
          ],
        },
      ],
    },
  ],
};
