import axios from 'axios';

import type { Report, ReportData, ReportMeta, ReportValue } from './report';
import { ReportType } from './report';

export interface DetailsFilterReportData extends ReportData {
  account_name?: string;
  account_number?: string;
  contract_start_date?: string;
  contract_end_date?: string;
  consumption_date?: string;
  committed_spend?: ReportValue;
  delta: { value: string; percent: string };
  excess_committed_spend?: ReportValue;
  remaining_committed_spend?: ReportValue;
}

export interface DetailsFilterReportMeta extends ReportMeta {
  count?: string;
}

export interface DetailsFilterReport extends Report {
  meta: DetailsFilterReportMeta;
  data: DetailsFilterReportData[];
}

export const ReportTypePaths: Partial<Record<ReportType, string>> = {
  [ReportType.billing]: 'reports/detailsFilter',
};

export function runReport(reportType: ReportType, query: string) {
  const path = ReportTypePaths[reportType];
  const _query = query ? `?${query}` : '';
  return axios.get<DetailsFilterReport>(`${path}${_query}`);
}
