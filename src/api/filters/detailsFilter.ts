import axios from 'axios';

import type { Filter, FilterData, FilterMeta } from './filter';
import { FilterType } from './filter';

export interface DetailsFilterData extends FilterData {
  value?: string;
}

export interface DetailsFilterMeta extends FilterMeta {
  count?: number;
}

export interface DetailsFilter extends Filter {
  meta: DetailsFilterMeta;
  data: DetailsFilterData[];
}

export const FilterTypePaths: Partial<Record<FilterType, string>> = {
  [FilterType.affiliate]: 'reports/detailsFilter',
  [FilterType.product]: 'reports/detailsFilter',
  [FilterType.sourceOfSpend]: 'reports/detailsFilter',
};

export function runFilter(reportType: FilterType, query: string) {
  const path = FilterTypePaths[reportType];
  const queryString = query ? `?${query}` : '';
  return axios.get<DetailsFilter>(`${path}${queryString}`);
}
