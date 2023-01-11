import * as utils from './query';

export interface BillingFilters extends utils.Filters {
  project?: string | number;
}

type BillingGroupByValue = string | string[];

interface BillingGroupBys {
  cluster?: BillingGroupByValue;
  node?: BillingGroupByValue;
  project?: BillingGroupByValue;
}

interface BillingOrderBys {
  account?: string;
  region?: string;
  service?: string;
  cost?: string;
  usage?: string;
}

export interface BillingQuery extends utils.Query {
  delta?: string;
  filter?: BillingFilters;
  group_by?: BillingGroupBys;
  primaryGroupBy?: BillingGroupBys; // Todo: use group_by?
  secondaryGroupBy?: BillingGroupBys; // Todo: Use group_by?
  orderBy?: BillingOrderBys;
}

// filter_by props are converted and returned with logical OR/AND prefix
export function getBillingQuery(query: BillingQuery) {
  return utils.getQuery(query);
}

// filter_by props are not converted
export function getBillingQueryRoute(query: BillingQuery) {
  return utils.getQueryRoute(query);
}

export function parseBillingQuery<T = any>(query: string): T {
  return utils.parseQuery(query);
}
