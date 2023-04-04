import axios from 'axios';

import type { Report, ReportData, ReportMeta } from './report';
import { ReportType } from './report';

export interface DetailsReportData extends ReportData {
  value?: string;
}

export interface DetailsReportMeta extends ReportMeta {
  count?: number;
}

export interface DetailsReport extends Report {
  meta: DetailsReportMeta;
  data: DetailsReportData[];
}

export const ReportTypePaths: Partial<Record<ReportType, string>> = {
  [ReportType.actualSpend]: 'reports/actualSpendBreakdownChart',
  [ReportType.committedSpend]: 'reports/committedSpendTrendChart',
  [ReportType.details]: 'reports/details',
};

export function runReport(reportType: ReportType, query: string) {
  const path = ReportTypePaths[reportType];
  const queryString = query ? `?${query}` : '';
  const fetch = () => axios.get<DetailsReport>(`${path}${queryString}`);

  const insights = (window as any).insights;
  if (insights && insights.chrome && insights.chrome.auth && insights.chrome.auth.getUser) {
    return insights.chrome.auth.getUser().then(() => fetch());
  } else {
    return fetch();
  }
}
