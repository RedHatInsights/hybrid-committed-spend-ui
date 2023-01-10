// https://billing.dev.api.redhat.com/v1/reports/detailsFilter

// you can either provide an accountNumber to look up for the product names related to that
// and there's another optional param "productName" which would do a query on all the records
// whose product name starts with that param you have provided

/*
Ankit Manendra, Oct 24, 10:32 AM
Hi @Dan Labrecque
While we are working on fixing the properties for the above endpoint, we have pushed the changes for another endpoint relevant to the details filter :
https://billing.dev.api.redhat.com/v1/reports/detailsFilter
QueryParams: accountNumber(optional), productName
Will return you all the product names for the user/accountNumber starting with the value that you have passed for that productName param
let us know if you are able to test this
 */

export const detailsFilterOld = {
  meta: { count: '1' },
  links: {
    first: '/v1/reports/detailsFilter/?limit=10&offset=0',
    next: null,
    previous: null,
    last: '/v1/reports/detailsFilter/?limit=10&offset=0',
  },
  data: [{ value: 'MCT2713' }],
};

export const detailsFilter = {
  meta: { count: '1' },
  links: {
    first: '/v1/reports/detailsFilter/?limit=10&offset=0',
    next: null,
    previous: null,
    last: '/v1/reports/detailsFilter/?limit=10&offset=0',
  },
  data: [{ value: null }],
};
