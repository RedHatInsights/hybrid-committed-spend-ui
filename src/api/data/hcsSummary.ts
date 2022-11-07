// https://billing.dev.api.redhat.com/v1/reports/hcsSummary

export const hcsSummary = {
  meta: { count: '1' },
  links: {
    first: '/v1/reports/hcsSummary/?limit=10&offset=0',
    next: null,
    previous: null,
    last: '/v1/reports/hcsSummary/?limit=10&offset=0',
  },
  data: [
    {
      account_name: null,
      account_number: '1290557',
      contract_start_date: '2022-03-31',
      contract_end_date: '2032-03-31',
      consumption_date: '2022-01-12',
      committed_spend: { value: '9.753001971E7', units: 'EUR' },
      actual_committed_spend: { value: '6626413.14', units: 'EUR' },
      excess_committed_spend: { value: null, units: null },
      remaining_committed_spend: { value: '1.004020082E7', units: 'EUR' },
      delta: { value: null, percent: null },
    },
  ],
};
