import * as utils from './query';

export interface OverviewFilters extends utils.Filters {
  account?: string | number;
}

type OverviewGroupByValue = string | string[];

interface OverviewGroupBys {
  service?: OverviewGroupByValue;
  account?: OverviewGroupByValue;
  org_unit_id?: OverviewGroupByValue;
  region?: OverviewGroupByValue;
}

interface OverviewOrderBys {
  account?: string;
  region?: string;
  service?: string;
  cost?: string;
  usage?: string;
}

export interface OverviewQuery extends utils.Query {
  delta?: string;
  filter?: OverviewFilters;
  group_by?: OverviewGroupBys;
  order_by?: OverviewOrderBys;
}

// filter_by props are converted and returned with logical OR/AND prefix
export function getOverviewQuery(query: OverviewQuery) {
  return utils.getQuery(query);
}

// filter_by props are not converted
export function getOverviewQueryRoute(query: OverviewQuery) {
  return utils.getQueryRoute(query);
}

export function parseOverviewQuery<T = any>(query: string): T {
  return utils.parseQuery(query);
}
