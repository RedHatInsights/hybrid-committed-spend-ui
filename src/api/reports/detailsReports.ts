import axios from 'axios';

import type { Report, ReportData, ReportMeta } from './report';
import { ReportType } from './report';

export interface DetailsFilterReportData extends ReportData {
  value?: string;
}

export interface DetailsFilterReportMeta extends ReportMeta {
  count?: string;
}

export interface DetailsFilterReport extends Report {
  meta: DetailsFilterReportMeta;
  data: DetailsFilterReportData[];
}

export const ReportTypePaths: Partial<Record<ReportType, string>> = {
  [ReportType.billing]: 'reports/details',
};

export function runReport(reportType: ReportType, query: string) {
  const path = ReportTypePaths[reportType];
  const _query = query ? `?${query}` : '';
  return axios.get<DetailsFilterReport>(`${path}${_query}`);
}
