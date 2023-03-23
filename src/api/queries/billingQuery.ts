import * as utils from './query';

export interface BillingFilters extends utils.Filters {
  project?: string | number;
}

type BillingGroupByValue = string | string[];

interface BillingGroupBys {
  affiliate?: BillingGroupByValue;
  product?: BillingGroupByValue;
  source_of_spend?: BillingGroupByValue;
}

interface BillingOrderBys {
  affiliate?: string;
  product?: string;
  source_of_spend?: string;
}

export interface BillingQuery extends utils.Query {
  delta?: string;
  filter?: BillingFilters;
  groupBy?: BillingGroupBys;
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
