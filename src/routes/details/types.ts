import type { Query } from 'api/queries';
import { DateRangeType } from 'routes/utils/dateRange';

// eslint-disable-next-line no-shadow
export enum GroupByType {
  account = 'account',
  affiliate = 'affiliate',
  none = 'none',
  product = 'product',
  sourceOfSpend = 'source_of_spend',
}

// eslint-disable-next-line no-shadow
export enum SourceOfSpendType {
  all = 'all',
  aws = 'aws',
  azure = 'azure',
  ccsp = 'ccsp',
  consulting = 'consulting',
  gcp = 'gcp',
  miscellaneous = 'miscellaneous',
  none = 'none',
  oci = 'oci',
  on_demand = 'on_demand',
  training = 'training',
  yearlySubscriptions = 'yearly_subscriptions',
}

export function getDateRangeType(dateRange: DateRangeType): string {
  switch (dateRange) {
    case DateRangeType.contractedYtd:
      return 'contracted_ytd';
    case DateRangeType.contractedLastYear:
      return 'contracted_last_year';
    case DateRangeType.lastNineMonths:
      return 'last_nine_months';
    case DateRangeType.lastSixMonths:
      return 'last_six_months';
    case DateRangeType.lastThreeMonths:
      return 'last_three_months';
    default:
      return undefined;
  }
}

export function getIdKeyForGroupBy(groupBy: Query['groupBy'] = {}) {
  if (groupBy.affiliate) {
    return GroupByType.affiliate;
  }
  if (groupBy.none) {
    return GroupByType.none;
  }
  if (groupBy.product) {
    return GroupByType.product;
  }
  if (groupBy.source_of_spend) {
    return GroupByType.sourceOfSpend;
  }
  return undefined;
}

export function getGroupByType(groupBy: GroupByType): string {
  switch (groupBy) {
    case GroupByType.affiliate:
      return 'affiliate';
    case GroupByType.product:
      return 'product';
    case GroupByType.sourceOfSpend:
      return 'source_of_spend';
    case GroupByType.none:
    default:
      return 'none';
  }
}

export function getSourceOfSpendFilter(sourceOfSpendType): string {
  switch (sourceOfSpendType) {
    case SourceOfSpendType.aws:
      return 'Amazon Web Services';
    case SourceOfSpendType.azure:
      return 'Azure';
    case SourceOfSpendType.ccsp:
      return 'CCSP';
    case SourceOfSpendType.consulting:
      return 'Consulting';
    case SourceOfSpendType.gcp:
      return 'Google Cloud Platform';
    case SourceOfSpendType.miscellaneous:
      return 'Miscellaneous';
    case SourceOfSpendType.oci:
      return 'Oracle Cloud Infrastructure';
    case SourceOfSpendType.on_demand:
      return 'On-demand subscriptions';
    case SourceOfSpendType.training:
      return 'Training';
    case SourceOfSpendType.yearlySubscriptions:
      return 'Yearly subscriptions';
    case SourceOfSpendType.all:
    default:
      return 'All sources of spend';
  }
}

export function getSourceOfSpendType(sourceOfSpendType: SourceOfSpendType): string {
  switch (sourceOfSpendType) {
    case SourceOfSpendType.aws:
      return 'aws';
    case SourceOfSpendType.azure:
      return 'azure';
    case SourceOfSpendType.ccsp:
      return 'ccsp';
    case SourceOfSpendType.consulting:
      return 'consulting';
    case SourceOfSpendType.gcp:
      return 'gcp';
    case SourceOfSpendType.miscellaneous:
      return 'miscellaneous';
    case SourceOfSpendType.oci:
      return 'oci';
    case SourceOfSpendType.on_demand:
      return 'on_demand';
    case SourceOfSpendType.training:
      return 'training';
    case SourceOfSpendType.yearlySubscriptions:
      return 'yearly_subscriptions';
    case SourceOfSpendType.all:
    default:
      return 'all';
  }
}
