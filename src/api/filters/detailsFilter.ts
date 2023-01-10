import axios from 'axios';

import type { Filter, FilterData, FilterMeta } from './filter';
import { FilterType } from './filter';

export interface DetailsFilterReportData extends FilterData {
  value?: string;
}

export interface DetailsFilterReportMeta extends FilterMeta {
  count?: string;
}

export interface DetailsFilterReport extends Filter {
  meta: DetailsFilterReportMeta;
  data: DetailsFilterReportData[];
}

export const FilterTypePaths: Partial<Record<FilterType, string>> = {
  [FilterType.affiliate]: 'reports/detailsFilter',
  [FilterType.product]: 'reports/detailsFilter',
  [FilterType.sourceOfSpend]: 'reports/detailsFilter',
};

export function runFilter(reportType: FilterType, query: string) {
  const path = FilterTypePaths[reportType];
  const _query = query ? `?${query}` : '';
  return axios.get<DetailsFilterReport>(`${path}${_query}`);
}
