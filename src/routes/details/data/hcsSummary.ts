// https://billing.dev.api.redhat.com/v1/reports/hcsSummary?limit=2

export const hcsSummary = {
  meta: { count: '1' },
  links: {
    first: '/v1/reports/hcsSummary/?limit=2&offset=0',
    next: null,
    previous: null,
    last: '/v1/reports/hcsSummary/?limit=2&offset=0',
  },
  data: [
    {
      account_name: 'SAP SE',
      account_number: '1290557',
      contract_start_date: null,
      contract_end_date: null,
      consumption_date: null,
      actual_spend: { value: '2500', units: 'EUR' },
      committed_spend: { value: null, units: null },
      excess_committed_spend: { value: null, units: null },
      remaining_committed_spend: { value: null, units: null },
      delta: { value: null, percent: null },
    },
  ],
};
