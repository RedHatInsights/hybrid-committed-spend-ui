/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

export default defineMessages({
  accountName: {
    defaultMessage: 'Account name: {value}',
    description: 'Account name: {value}',
    id: 'accountName',
  },
  accountNumber: {
    defaultMessage: 'Account number: {value}',
    description: 'Account number: {value}',
    id: 'accountNumber',
  },
  actualSpendBreakdownPerspectiveValues: {
    defaultMessage:
      '{value, select, ' +
      'sources {Top 3 sources of spend} ' +
      'affiliates {Top 3 affiliates of spend} ' +
      'products {Top 3 products of spend} ' +
      'other {}}',
    description: 'Actual spend breakdown perspective values',
    id: 'actualSpendBreakdownPerspectiveValues',
  },
  chartCurrentSpendLegendLabel: {
    defaultMessage: 'Actual spend YTD ({dateRange})',
    description: 'Actual spend YTD ({dateRange})',
    id: 'chartCurrentSpendLegendLabel',
  },
  chartCurrentSpendNoDataLegendLabel: {
    defaultMessage: 'Actual spend YTD (no data)',
    description: 'Actual spend YTD (no data)',
    id: 'chartCurrentSpendNoDataLegendLabel',
  },
  chartCurrentSpendTooltip: {
    defaultMessage: 'Actual spend YTD',
    description: 'Actual spend YTD',
    id: 'chartCurrentSpendTooltip',
  },
  chartNoData: {
    defaultMessage: 'no data',
    description: 'no data',
    id: 'chartNoData',
  },
  chartOthers: {
    defaultMessage: '{count, plural, one {{count} Other} other {{count} Others}}',
    description: 'Others category for top costliest',
    id: 'chartOthers',
  },
  chartPreviousSpendLegendLabel: {
    defaultMessage: 'Previous year spend ({dateRange})',
    description: 'Previous year spend ({dateRange})',
    id: 'chartPreviousSpendLegendLabel',
  },
  chartPreviousSpendNoDataLegendLabel: {
    defaultMessage: 'Previous year spend (no data)',
    description: 'Previous year spend (no data)',
    id: 'chartPreviousSpendNoDataLegendLabel',
  },
  chartPreviousSpendTooltip: {
    defaultMessage: 'Previous year spend',
    description: 'Previous year spend',
    id: 'chartPreviousSpendTooltip',
  },
  chartThresholdSpendLegendLabel: {
    defaultMessage: 'Committed spend ({dateRange})',
    description: 'Committed spend ({dateRange})',
    id: 'chartThresholdSpendLegendLabel',
  },
  chartThresholdSpendNoDataLegendLabel: {
    defaultMessage: 'Committed spend (no data)',
    description: 'Committed spend (no data)',
    id: 'chartThresholdSpendNoDataLegendLabel',
  },
  chartThresholdSpendTooltip: {
    defaultMessage: 'Committed spend',
    description: 'Committed spend',
    id: 'chartThresholdSpendTooltip',
  },
  chartTooltipTitle: {
    defaultMessage: '{value}',
    description: 'Chart tooltip title showing datum month',
    id: 'chartTooltipTitle',
  },
  committedSpendTrendPerspectiveValues: {
    defaultMessage:
      '{value, select, ' +
      'actual {Actual spend} ' +
      'past_two_actual {Past two years actual spend} ' +
      'previous_over_actual {Previous year over actual spend} ' +
      'other {}}',
    description: 'Committed spend trend perspective values',
    id: 'committedSpendPerspectiveValuescommittedSpendTrendPerspectiveValues',
  },
  consumptionDate: {
    defaultMessage: 'Consumption date: {date}',
    description: 'Consumption date: {date}',
    id: 'consumptionDate',
  },
  contractDates: {
    defaultMessage: 'Contract dates: {startDate} - {endDate}',
    description: 'Contract dates: {startDate} - {endDate}',
    id: 'contractDates',
  },
  currencyAbbreviations: {
    defaultMessage:
      '{symbol, select, ' +
      'billion {{value} B} ' +
      'million {{value} M} ' +
      'quadrillion {{value} q} ' +
      'thousand {{value} K} ' +
      'trillion {{value} t} ' +
      'other {}}',
    description: 'str.match(/([\\D]*)([\\d.,]+)([\\D]*)/)',
    id: 'currencyAbbreviations',
  },
  dashboardActualSpendBreakdownTitle: {
    defaultMessage: 'Actual spend breakdowns',
    description: 'Actual spend breakdowns',
    id: 'dashboardActualSpendBreakdownTitle',
  },
  dashboardActualSpendTitle: {
    defaultMessage: 'Actual spend of included products YTD',
    description: 'Actual spend of included products YTD',
    id: 'dashboardActualSpendTitle',
  },
  dashboardCommitmentSpendTitle: {
    defaultMessage: 'Remaining commitment balance',
    description: 'Remaining commitment balance',
    id: 'dashboardCommitmentSpendTitle',
  },
  dashboardCommitmentSpendTrendTitle: {
    defaultMessage: 'Committed spend trend',
    description: 'Committed spend trend',
    id: 'dashboardCommitmentSpendTrendTitle',
  },
  detailsTitle: {
    defaultMessage: 'Committed Spend details',
    description: 'Committed Spend details',
    id: 'detailsTitle',
  },
  errorStateNotAuthorizedDesc: {
    defaultMessage: 'Contact the cost management administrator to provide access to this application',
    description: 'Contact the cost management administrator to provide access to this application',
    id: 'errorStateNotAuthorizedDesc',
  },
  errorStateNotAuthorizedTitle: {
    defaultMessage: "You don't have access to the Cost management application",
    description: "You don't have access to the Cost management application",
    id: 'errorStateNotAuthorizedTitle',
  },
  errorStateUnexpectedDesc: {
    defaultMessage: 'We encountered an unexpected error. Contact your administrator.',
    description: 'We encountered an unexpected error. Contact your administrator.',
    id: 'errorStateUnexpectedDesc',
  },
  errorStateUnexpectedTitle: {
    defaultMessage: 'Oops!',
    description: 'Oops!',
    id: 'errorStateUnexpectedTitle',
  },
  exploreMore: {
    defaultMessage: 'Explore more',
    description: 'Explore more',
    id: 'exploreMore',
  },
  hcs: {
    defaultMessage: 'Hybrid Committed Spend',
    description: 'Hybrid Committed Spend',
    id: 'hcs',
  },
  loadingStateDesc: {
    defaultMessage: 'Searching for your sources. Do not refresh the browser',
    description: 'Searching for your sources. Do not refresh the browser',
    id: 'loadingStateDesc',
  },
  loadingStateTitle: {
    defaultMessage: 'Looking for sources...',
    description: 'Looking for sources',
    id: 'loadingStateTitle',
  },
  outOf: {
    defaultMessage: 'out of {value}',
    description: 'out of {value}',
    id: 'outOf',
  },
  overLastMonth: {
    defaultMessage: 'Over last month',
    description: 'Over last month',
    id: 'overLastMonth',
  },
  overviewTitle: {
    defaultMessage: 'Committed Spend overview',
    description: 'Committed Spend overview',
    id: 'overviewTitle',
  },
  pageTitleDefault: {
    defaultMessage: 'Hybrid Committed Spend | Red Hat Business Services',
    description: 'Hybrid Committed Spend | Red Hat Business Services',
    id: 'pageTitleDefault',
  },
  pageTitleDetails: {
    defaultMessage: 'Details - Hybrid Committed Spend | Red Hat Business Services',
    description: 'Details - Hybrid Committed Spend | Red Hat Business Services',
    id: 'pageTitleDetails',
  },
  pageTitleOverview: {
    defaultMessage: 'Overview - Hybrid Committed Spend | Red Hat Business Services',
    description: 'Overview - Hybrid Committed Spend | Red Hat Business Services',
    id: 'pageTitleOverview',
  },
  percent: {
    defaultMessage: '{value} %',
    description: 'Percent value',
    id: 'percent',
  },
  viewDetails: {
    defaultMessage: 'View details',
    description: 'View details',
    id: 'viewDetails',
  },
});
