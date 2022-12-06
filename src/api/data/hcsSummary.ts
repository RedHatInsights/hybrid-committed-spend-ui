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
      account_name: 'SAP SE',
      account_number: '1290557',
      contract_start_date: '2022-03-31',
      contract_end_date: '2032-03-31',
      consumption_date: '2022-11-02',
      committed_spend: { value: '97530019.81', units: 'EUR' },
      actual_committed_spend: { value: '6641613', units: 'EUR' },
      excess_committed_spend: { value: '0', units: 'EUR' },
      remaining_committed_spend: { value: '10025000.96', units: 'EUR' },
      delta: { value: null, percent: null },
      contract_line_start_date: '2022-03-31',
      contract_line_end_date: '2023-03-30',
    },
  ],
};
