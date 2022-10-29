// https://billing.dev.api.redhat.com/v1/reports/detailsFilter

// you can either provide an accountNumber to look up for the product names related to that
// and there's another optional param "productName" which would do a query on all the records
// whose product name starts with that param you have provided

export const detailsFilter = {
  meta: { count: '1' },
  links: {
    first: '/v1/reports/detailsFilter/?limit=10&offset=0',
    next: null,
    previous: null,
    last: '/v1/reports/detailsFilter/?limit=10&offset=0',
  },
  data: [{ value: 'MCT2713' }],
};
