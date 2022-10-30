// https://billing.dev.api.redhat.com/v1/reports/hcsSummary

export const hcsSummary = {
  meta: { count: '3' },
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
      actual_committed_spend: { value: '5375.4', units: 'EUR' },
      excess_committed_spend: { value: null, units: null },
      remaining_committed_spend: { value: 'null', units: 'EUR' },
      delta: { value: null, percent: null },
    },
    {
      account_name: null,
      account_number: '1290557',
      contract_start_date: '2022-10-01',
      contract_end_date: '2025-10-01',
      consumption_date: '2022-01-12',
      committed_spend: { value: '1.45001E7', units: 'EUR' },
      actual_committed_spend: { value: 'null', units: 'EUR' },
      excess_committed_spend: { value: null, units: null },
      remaining_committed_spend: { value: 'null', units: 'EUR' },
      delta: { value: null, percent: null },
    },
    {
      account_name: null,
      account_number: '1290557',
      contract_start_date: '2022-03-31',
      contract_end_date: '2022-09-19',
      consumption_date: '2022-01-12',
      committed_spend: { value: '9.753001971E7', units: 'EUR' },
      actual_committed_spend: { value: '8375.4', units: 'EUR' },
      excess_committed_spend: { value: null, units: null },
      remaining_committed_spend: { value: '991624.6', units: 'EUR' },
      delta: { value: null, percent: null },
    },
  ],
};
