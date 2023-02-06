import type { PagedMetaData, PagedResponse } from 'api/api';

export interface FilterData {
  value?: string;
}

export interface FilterMeta extends PagedMetaData {
  // TBD...
}

export interface Filter extends PagedResponse<FilterData, FilterMeta> {}

// eslint-disable-next-line no-shadow
export const enum FilterType {
  affiliate = 'affiliate',
  product = 'product',
  sourceOfSpend = 'source_of_spend',
}

// eslint-disable-next-line no-shadow
export const enum FilterPathsType {
  detailsFilter = 'detailsFilter',
}
