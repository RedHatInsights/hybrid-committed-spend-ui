import type { PagedMetaData, PagedResponse } from 'api/api';

export interface FilterData {
  account_alias: string;
  cluster_alias: string;
  value?: string;
}

export interface FilterMeta extends PagedMetaData {
  // TBD...
}

export interface Filter extends PagedResponse<FilterData, FilterMeta> {}

// eslint-disable-next-line no-shadow
export const enum FilterType {
  affiliate = 'affiliates', // Todo: current API uses plural here.
  product = 'products', // Todo: current API uses plural here.
  sourceOfSpend = 'source_of_spend',
}

// eslint-disable-next-line no-shadow
export const enum FilterPathsType {
  detailsFilter = 'detailsFilter',
}
