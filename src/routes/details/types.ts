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
  marketplace = 'marketplace',
  reseller = 'reseller',
  subs_on_demand = 'subs_on_demand',
  subs_yearly = 'subs_yearly',
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

export function getIdKeyForGroupBy(groupBy: Query['group_by'] = {}) {
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
    case SourceOfSpendType.marketplace:
      return 'marketplace';
    case SourceOfSpendType.reseller:
      return 'reseller';
    case SourceOfSpendType.subs_on_demand:
      return 'subs_on_demand';
    case SourceOfSpendType.subs_yearly:
      return 'subs_yearly';
    case SourceOfSpendType.all:
    default:
      return 'all';
  }
}
