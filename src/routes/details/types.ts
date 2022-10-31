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
export enum SourcesOfSpendType {
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

export function getGroupByType(groupBy: GroupByType): string {
  switch (groupBy) {
    case GroupByType.account:
      return 'account';
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

export function getSourcesOfSpendType(sourcesOfSpend: SourcesOfSpendType): string {
  switch (sourcesOfSpend) {
    case SourcesOfSpendType.aws:
      return 'aws';
    case SourcesOfSpendType.azure:
      return 'azure';
    case SourcesOfSpendType.consulting:
      return 'consulting';
    case SourcesOfSpendType.gcp:
      return 'gcp';
    case SourcesOfSpendType.marketplace:
      return 'marketplace';
    case SourcesOfSpendType.reseller:
      return 'reseller';
    case SourcesOfSpendType.subs_on_demand:
      return 'subs_on_demand';
    case SourcesOfSpendType.subs_yearly:
      return 'subs_yearly';
    case SourcesOfSpendType.all:
    default:
      return 'all';
  }
}
