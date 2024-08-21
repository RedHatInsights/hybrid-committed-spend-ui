import type { PagedMetaData, PagedResponse } from 'api/api';

export interface FilterData {
  value?: string;
}

export type FilterMeta = PagedMetaData;

export type Filter = PagedResponse<FilterData, FilterMeta>;

export const enum FilterType {
  affiliate = 'affiliate',
  product = 'product',
  sourceOfSpend = 'source_of_spend',
}

export const enum FilterPathsType {
  detailsFilter = 'detailsFilter',
}
