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
  actualSpendBreakdownDataValues: {
    defaultMessage: '{value, select, ' + 'monthly {Monthly} ' + 'cumulative {Cumulative} ' + 'other {}}',
    description: 'Actual spend breakdown data values',
    id: 'actualSpendBreakdownDataValues',
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
  cancel: {
    defaultMessage: 'Cancel',
    description: 'Cancel',
    id: 'cancel',
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
  contractDate: {
    defaultMessage: 'Contract dates: {dateRange}',
    description: 'Contract dates: {dateRange}',
    id: 'contractDate',
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
    defaultMessage: 'Actual spend contract YTD',
    description: 'Actual spend contract YTD',
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
  dateRange: {
    defaultMessage:
      '{value, select, ' +
      'contracted_ytd {Contracted YTD} ' +
      'contracted_last_year {Past contracted year} ' +
      'last_nine_months {Last 9 months} ' +
      'last_six_months {Last 6 months} ' +
      'last_three_months {Last 3 months} ' +
      'other {}}',
    description: 'Date range for details table',
    id: 'dateRange',
  },
  dateRangeLabel: {
    defaultMessage: 'Time',
    description: 'Date range dropdown label',
    id: 'dateRangeLabel',
  },
  detailsEmptyState: {
    defaultMessage: 'No data available',
    description: 'No data available',
    id: 'detailsEmptyState',
  },
  detailsTableAriaLabel: {
    defaultMessage: 'Details table',
    description: 'Details table',
    id: 'detailsTableAriaLabel',
  },
  detailsTableSelectAriaLabel: {
    defaultMessage: 'Details table row select',
    description: 'Details table row select',
    id: 'detailsTableSelectAriaLabel',
  },
  detailsTitle: {
    defaultMessage: 'Hybrid Committed Spend Details',
    description: 'Hybrid Committed Spend Details',
    id: 'detailsTitle',
  },
  emptyFilterStateSubtitle: {
    defaultMessage: 'Sorry, no data with the given filter was found.',
    description: 'Sorry, no data with the given filter was found.',
    id: 'emptyFilterStateSubtitle',
  },
  emptyFilterStateTitle: {
    defaultMessage: 'No match found',
    description: 'No match found',
    id: 'emptyFilterStateTitle',
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
  excessActualSpendBreakdownDesc: {
    defaultMessage:
      'The previous year had an excess actual spend of {value}. That amount will not be reflected in these breakdowns',
    description:
      'The previous year had an excess actual spend of {value}. That amount will not be reflected in these breakdowns',
    id: 'excessActualSpendBreakdownDesc',
  },
  excessActualSpendButtonAriaLabel: {
    defaultMessage: 'A dialog with a description of actual spend roll over',
    description: 'A dialog with a description of actual spend roll over',
    id: 'excessActualSpendAriaLabel',
  },
  excessActualSpendDesc: {
    defaultMessage:
      "The previous year had an excess actual spend of {value}. That amount has been rolled over into this current's year actual spend and is reflected in the Actual spend YTD totals.",
    description:
      "The previous year had an excess actual spend of {value}. That amount has been rolled over into this current's year actual spend and is reflected in the Actual spend YTD totals.",
    id: 'excessActualSpendDesc',
  },
  excessActualSpendExcluded: {
    defaultMessage: 'Excess actual spend excluded',
    description: 'Excess actual spend excluded',
    id: 'excessActualSpendExcluded',
  },
  excessActualSpendIncluded: {
    defaultMessage: 'Excess actual spend included',
    description: 'Excess actual spend included',
    id: 'excessActualSpendIncluded',
  },
  excessActualSpendPopoverAriaLabel: {
    defaultMessage: 'A description of actual spend roll over',
    description: 'A description of actual spend roll over',
    id: 'excessActualSpendAriaLabel',
  },
  exploreMore: {
    defaultMessage: 'Explore more',
    description: 'Explore more',
    id: 'exploreMore',
  },
  exportAggregateType: {
    defaultMessage: 'Aggregate type',
    description: 'Aggregate type',
    id: 'exportAggregateType',
  },
  exportAll: {
    defaultMessage: 'Export all',
    description: 'Export all',
    id: 'exportAll',
  },
  exportDataType: {
    defaultMessage: '{value, select, json {Data shown in table} raw {Raw (unfiltered) data} other {}}',
    description: 'Export data type',
    id: 'exportDataType',
  },
  exportDataTypeTitle: {
    defaultMessage: 'Data type',
    description: 'Data type',
    id: 'exportDataTypeTitle',
  },
  exportError: {
    defaultMessage: 'Something went wrong, please try again',
    description: 'Export error',
    id: 'exportError',
  },
  exportFileName: {
    defaultMessage:
      '{groupBy, select, ' +
      'affiliate {{secondaryGroupBy, select, product {affiliate_product_{startDate}_{endDate}} source_of_spend {affiliate_source-of-spend_{startDate}_{endDate}} none {affiliate_{startDate}_{endDate}} other {}}} ' +
      'product {{secondaryGroupBy, select, affiliate {product_affiliate_{startDate}_{endDate}} source_of_spend {product_source-of-spend_{startDate}_{endDate}} none {product_{startDate}_{endDate}} other {}}} ' +
      'source_of_spend {{secondaryGroupBy, select, affiliate {source-of-spend_affiliate_{startDate}_{endDate}} product {source-of-spend_product_{startDate}_{endDate}} none {source-of-spend_{startDate}_{endDate}} other {}}} ' +
      'other {}}',
    description: 'Export file name',
    id: 'exportFileName',
  },
  exportGenerate: {
    defaultMessage: 'Generate export',
    description: 'Export export',
    id: 'exportGenerate',
  },
  exportHeading: {
    defaultMessage:
      'The export file will be in a .CSV format. Any filters that have been applied to the Hybrid Committed Spend Details table, will be used to generate the export file.',
    description: 'Export heading',
    id: 'exportHeading',
  },
  exportTitle: {
    defaultMessage: 'Export',
    description: 'Export title',
    id: 'exportTitle',
  },
  filterByButtonAriaLabel: {
    defaultMessage:
      '{value, select, ' +
      'affiliate {Filter button for affiliates} ' +
      'product {Filter button for products} ' +
      'source_of_spend {Filter button for source of spend} ' +
      'other {}}',
    description: 'Filter button for "value" name',
    id: 'filterByButtonAriaLabel',
  },
  filterByInputAriaLabel: {
    defaultMessage:
      '{value, select, ' +
      'affiliate {Filter input for affiliates} ' +
      'product {Filter input for products} ' +
      'source_of_spend {Filter input for source of spend} ' +
      'other {}}',
    description: 'Filter input for "value" name',
    id: 'filterByInputAriaLabel',
  },
  filterByPlaceholder: {
    defaultMessage:
      '{value, select, ' +
      'affiliate {Filter by affiliate name} ' +
      'product {Filter by product name} ' +
      'source_of_spend {Filter by source of spend} ' +
      'other {}}',
    description: 'Filter by "value" placeholder',
    id: 'filterByPlaceholder',
  },
  filterByValues: {
    defaultMessage:
      '{value, select, ' +
      'affiliate {Affiliate} ' +
      'product {Product} ' +
      'source_of_spend {Source of spend} ' +
      'other {}}',
    description: 'Filter by values',
    id: 'filterByValues',
  },
  furtherGroupByLabel: {
    defaultMessage: 'Further grouped by',
    description: 'Further grouped by dropdown label',
    id: 'furtherGroupByLabel',
  },
  groupBy: {
    defaultMessage:
      '{value, select, ' +
      'affiliate {Affiliates} ' +
      'none {None} ' +
      'product {Products} ' +
      'source_of_spend {Source of spend} ' +
      'other {}}',
    description: 'Group by options for details table',
    id: 'groupBy',
  },
  groupByLabel: {
    defaultMessage: 'Grouped by',
    description: 'Grouped by dropdown label',
    id: 'groupByLabel',
  },
  groupByValueNames: {
    defaultMessage:
      '{groupBy, select, ' +
      'affiliate {Affiliate names} ' +
      'product {Product names} ' +
      'source_of_spend {Source of spend names} ' +
      'other {}}',
    description: 'Selected items for export',
    id: 'groupByValueNames',
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
  names: {
    defaultMessage: '{count, plural, one {Name} other {Names}}',
    description: 'Name plural or singular',
    id: 'names',
  },
  noResultsFound: {
    defaultMessage: 'No results found',
    description: 'No results found',
    id: 'noResultsFound',
  },
  notViewable: {
    defaultMessage: 'Committed Spend data is not available to be viewed',
    description: 'Committed Spend data is not available to be viewed',
    id: 'notViewable',
  },
  notViewableDesc: {
    defaultMessage:
      'Committed Spend data is not viewable at this time. If you need access to this data, please contact your account manager.',
    description:
      'Committed Spend data is not viewable at this time. If you need access to this data, please contact your account manager.',
    id: 'notViewableDesc',
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
    defaultMessage: 'Hybrid Committed Spend Overview',
    description: 'Hybrid Committed Spend Overview',
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
  paginationTitle: {
    defaultMessage:
      '{placement, select, ' +
      'top {{title} top pagination} ' +
      'bottom {{title} bottom pagination} ' +
      'other {{title} pagination}}',
    description: 'title for pagination aria',
    id: 'paginationTitle',
  },
  percent: {
    defaultMessage: '{value} %',
    description: 'Percent value',
    id: 'percent',
  },
  secondaryGroupByLabel: {
    defaultMessage: 'Secondary group by',
    description: 'Secondary group by dropdown label',
    id: 'secondaryGroupByLabel',
  },
  selected: {
    defaultMessage: '{value} selected',
    description: '{value} selected',
    id: 'selected',
  },
  sourceOfSpendLabel: {
    defaultMessage: 'View',
    description: 'Sources of spend dropdown label',
    id: 'sourceOfSpendLabel',
  },
  sourceOfSpendValues: {
    defaultMessage:
      '{value, select, ' +
      'all {All sources of spend} ' +
      'aws {Amazon Web Services} ' +
      'azure {Azure} ' +
      'ccsp {CCSP} ' +
      'consulting {Consulting} ' +
      'gcp {Google Cloud Platform} ' +
      'miscellaneous {Miscellaneous} ' +
      'oci {Oracle Cloud Infrastructure} ' +
      'on_demand {On-demand subscriptions} ' +
      'training {Training} ' +
      'yearly_subscriptions {Yearly subscriptions} ' +
      'other {}}',
    description: 'All sources of spend',
    id: 'sourceOfSpendValues',
  },
  suggestions: {
    defaultMessage: 'Suggestions',
    description: 'Suggestions',
    id: 'suggestions',
  },
  toolBarBulkSelectAll: {
    defaultMessage: 'Select all ({value} items)',
    description: 'Select all ({value} items)',
    id: 'toolBarBulkSelectAll',
  },
  toolBarBulkSelectAriaDeselect: {
    defaultMessage: 'Deselect all items',
    description: 'Deselect all items',
    id: 'toolBarBulkSelectAriaDeselect',
  },
  toolBarBulkSelectAriaSelect: {
    defaultMessage: 'Select all items',
    description: 'Select all items',
    id: 'toolBarBulkSelectAriaSelect',
  },
  toolBarBulkSelectNone: {
    defaultMessage: 'Select none (0 items)',
    description: 'Select none (0 items)',
    id: 'toolBarBulkSelectNone',
  },
  toolBarBulkSelectPage: {
    defaultMessage: 'Select page ({value} items)',
    description: 'Select page ({value} items)',
    id: 'toolBarBulkSelectPage',
  },
  viewDetails: {
    defaultMessage: 'View details',
    description: 'View details',
    id: 'viewDetails',
  },
});
