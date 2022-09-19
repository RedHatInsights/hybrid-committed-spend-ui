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
  chartCostLegendLabel: {
    defaultMessage:
      '{month, select, ' +
      '0 {{count, plural, one {Cost (Jan {startDate})} other {Cost (Jan {startDate}-{endDate})}}} ' +
      '1 {{count, plural, one {Cost (Feb {startDate})} other {Cost (Feb {startDate}-{endDate})}}} ' +
      '2 {{count, plural, one {Cost (Mar {startDate})} other {Cost (Mar {startDate}-{endDate})}}} ' +
      '3 {{count, plural, one {Cost (Apr {startDate})} other {Cost (Apr {startDate}-{endDate})}}} ' +
      '4 {{count, plural, one {Cost (May {startDate})} other {Cost (May {startDate}-{endDate})}}} ' +
      '5 {{count, plural, one {Cost (Jun {startDate})} other {Cost (Jun {startDate}-{endDate})}}} ' +
      '6 {{count, plural, one {Cost (Jul {startDate})} other {Cost (Jul {startDate}-{endDate})}}} ' +
      '7 {{count, plural, one {Cost (Aug {startDate})} other {Cost (Aug {startDate}-{endDate})}}} ' +
      '8 {{count, plural, one {Cost (Sep {startDate})} other {Cost (Sep {startDate}-{endDate})}}} ' +
      '9 {{count, plural, one {Cost (Oct {startDate})} other {Cost (Oct {startDate}-{endDate})}}} ' +
      '10 {{count, plural, one {Cost (Nov {startDate})} other {Cost (Nov {startDate}-{endDate})}}} ' +
      '11 {{count, plural, one {Cost (Dec {startDate})} other {Cost (Dec {startDate}-{endDate})}}} ' +
      'other {}}',
    description: 'Cost date label',
    id: 'chartCostLegendLabel',
  },
  chartCostLegendNoDataLabel: {
    defaultMessage: 'Cost (no data)',
    description: 'Cost (no data)',
    id: 'chartCostLegendNoDataLabel',
  },
  chartCostLegendTooltip: {
    defaultMessage:
      '{month, select, ' +
      '0 {Cost (Jan)} ' +
      '1 {Cost (Feb)} ' +
      '2 {Cost (Mar)} ' +
      '3 {Cost (Apr)} ' +
      '4 {Cost (May)} ' +
      '5 {Cost (Jun)} ' +
      '6 {Cost (Jul)} ' +
      '7 {Cost (Aug)} ' +
      '8 {Cost (Sep)} ' +
      '9 {Cost (Oct)} ' +
      '10 {Cost (Nov)} ' +
      '11 {Cost (Dec)} ' +
      'other {}}',
    description: 'Cost (month)',
    id: 'chartCostLegendTooltip',
  },
  chartDateRange: {
    defaultMessage:
      '{month, select, ' +
      '0 {{count, plural, one {Jan {startDate} {year}} other {{startDate}-{endDate} Jan {year}}}} ' +
      '1 {{count, plural, one {Feb {startDate} {year}} other {{startDate}-{endDate} Feb {year}}}} ' +
      '2 {{count, plural, one {Mar {startDate} {year}} other {{startDate}-{endDate} Mar {year}}}} ' +
      '3 {{count, plural, one {Apr {startDate} {year}} other {{startDate}-{endDate} Apr {year}}}} ' +
      '4 {{count, plural, one {May {startDate} {year}} other {{startDate}-{endDate} May {year}}}} ' +
      '5 {{count, plural, one {Jun {startDate} {year}} other {{startDate}-{endDate} Jun {year}}}} ' +
      '6 {{count, plural, one {Jul {startDate} {year}} other {{startDate}-{endDate} Jul {year}}}} ' +
      '7 {{count, plural, one {Aug {startDate} {year}} other {{startDate}-{endDate} Aug {year}}}} ' +
      '8 {{count, plural, one {Sep {startDate} {year}} other {{startDate}-{endDate} Sep {year}}}} ' +
      '9 {{count, plural, one {Oct {startDate} {year}} other {{startDate}-{endDate} Oct {year}}}} ' +
      '10 {{count, plural, one {Nov {startDate} {year}} other {{startDate}-{endDate} Nov {year}}}} ' +
      '11 {{count, plural, one {Dec {startDate} {year}} other {{startDate}-{endDate} Dec {year}}}} ' +
      'other {}}',
    description: 'Date range that handles singular and plural',
    id: 'chartDateRange',
  },
  chartDayOfTheMonth: {
    defaultMessage: 'Day {day}',
    description: 'The day of the month',
    id: 'chartDayOfTheMonth',
  },
  chartNoData: {
    defaultMessage: 'no data',
    description: 'no data',
    id: 'chartNoData',
  },
  chartOthers: {
    defaultMessage: '{count, plural, one {{count} Other} other {{count} Others}}',
    description: 'TODO: UNUSED Others category for top costliest',
    id: 'chartOthers',
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
