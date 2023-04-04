import axios from 'axios';

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
  const fetch = () => axios.get<DetailsOption>(`${path}?${queryString}`);

  const insights = (window as any).insights;
  if (insights && insights.chrome && insights.chrome.auth && insights.chrome.auth.getUser) {
    return insights.chrome.auth.getUser().then(() => fetch());
  } else {
    return fetch();
  }
}
