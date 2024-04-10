import { axiosInstance } from 'api';

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
  return axiosInstance.get<DetailsReport>(`${path}${queryString}`);
}
