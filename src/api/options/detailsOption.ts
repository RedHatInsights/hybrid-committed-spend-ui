import { axiosInstance } from 'api';

import type { Option, OptionData, OptionMeta } from './option';
import { OptionType } from './option';

export type DetailsOptionData = OptionData;

export interface DetailsOptionMeta extends OptionMeta {
  count?: number;
}

export interface DetailsOption extends Option {
  meta: DetailsOptionMeta;
  data: DetailsOptionData;
}

export const OptionTypePaths: Partial<Record<OptionType, string>> = {
  [OptionType.all]: 'reports/detailsOptions',
};

export function runOption(reportType: OptionType, query: string) {
  const path = OptionTypePaths[reportType];
  const queryString = query ? `?${query}` : '';
  return axiosInstance.get<DetailsOption>(`${path}${queryString}`);
}
