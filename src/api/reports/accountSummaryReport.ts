import axios from 'axios';

import type { Report, ReportData, ReportMeta, ReportValue } from './report';
import { ReportType } from './report';

export interface AccountSummaryReportData extends ReportData {
  account_name?: string;
  account_number?: string;
  actual_committed_spend?: ReportValue;
  contract_end_date?: string;
  contract_start_date?: string;
  contract_line_start_date?: string;
  contract_line_end_date?: string;
  consumption_date?: string;
  committed_spend?: ReportValue;
  delta?: { value: string; percent: string };
  excess_committed_spend?: ReportValue;
  remaining_committed_spend?: ReportValue;
}

export interface AccountSummaryReportMeta extends ReportMeta {
  count?: string | number;
}

export interface AccountSummaryReport extends Report {
  meta: AccountSummaryReportMeta;
  data: AccountSummaryReportData[];
}

export const ReportTypePaths: Partial<Record<ReportType, string>> = {
  [ReportType.billing]: 'reports/hcsSummary',
};

export function runReport(reportType: ReportType, query: string) {
  const path = ReportTypePaths[reportType];
  const _query = query ? `?${query}` : '';
  return axios.get<AccountSummaryReport>(`${path}${_query}`);
}
