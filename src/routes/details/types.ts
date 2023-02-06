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
  consulting = 'consulting',
  gcp = 'gcp',
  on_demand = 'on_demand',
  redhat = 'redhat',
  red_hat_marketplace = 'red_hat_marketplace',
  reseller_distributor = 'reseller_distributor',
  yearly_subscriptions = 'subs_yearly',
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

// Todo: details API only handles exact matches
export function getSourceOfSpendFilter(sourceOfSpendType): string {
  switch (sourceOfSpendType) {
    case SourceOfSpendType.aws:
      return 'Amazon Web Services';
    case SourceOfSpendType.azure:
      return 'Microsoft Azure';
    case SourceOfSpendType.consulting:
      return 'Consulting';
    case SourceOfSpendType.gcp:
      return 'Google Cloud Platform';
    case SourceOfSpendType.on_demand:
      return 'On-demand subscriptions';
    case SourceOfSpendType.redhat:
      return 'Red Hat';
    case SourceOfSpendType.red_hat_marketplace:
      return 'Red Hat Marketplace';
    case SourceOfSpendType.reseller_distributor:
      return 'Reseller / Distributor';
    case SourceOfSpendType.yearly_subscriptions:
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
    case SourceOfSpendType.consulting:
      return 'consulting';
    case SourceOfSpendType.gcp:
      return 'gcp';
    case SourceOfSpendType.red_hat_marketplace:
      return 'red_hat_marketplace';
    case SourceOfSpendType.redhat:
      return 'reseller_distributor';
    case SourceOfSpendType.on_demand:
      return 'on_demand';
    case SourceOfSpendType.yearly_subscriptions:
      return 'yearly_subscriptions';
    case SourceOfSpendType.all:
    default:
      return 'all';
  }
}
