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
  dashboardCommitmentBalanceTitle: {
    defaultMessage: 'Remaining commitment balance',
    description: 'Remaining commitment balance',
    id: 'dashboardCommitmentBalanceTitle',
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
});
