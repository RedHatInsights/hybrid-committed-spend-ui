import axios from 'axios';
import { Omit } from 'react-redux';

import { Report, ReportData, ReportItem, ReportItemValue, ReportMeta, ReportType, ReportValue } from './report';

export interface OverviewReportItem extends ReportItem {
  account?: string;
  account_alias?: string;
  org_unit_id?: string;
  region?: string;
  service?: string;
}

export interface GroupByAccountData extends Omit<OverviewReportData, 'accounts'> {
  account: string;
}

export interface GroupByRegionData extends Omit<OverviewReportData, 'regions'> {
  region: string;
}

export interface GroupByServiceData extends Omit<OverviewReportData, 'services'> {
  service: string;
}

export interface OverviewReportData extends ReportData {
  accounts?: GroupByAccountData[];
  regions?: GroupByRegionData[];
  services?: GroupByServiceData[];
}

export interface OverviewReportMeta extends ReportMeta {
  total?: {
    cost?: ReportItemValue;
    infrastructure?: ReportItemValue;
    supplementary?: ReportItemValue;
    usage?: ReportValue;
  };
}

export interface OverviewReport extends Report {
  meta: OverviewReportMeta;
  data: OverviewReportData[];
}

export const ReportTypePaths: Partial<Record<ReportType, string>> = {
  [ReportType.cost]: '', // 'reports/aws/costs/',
};

export function runReport(reportType: ReportType, query: string) {
  const path = ReportTypePaths[reportType];
  const _query = query ? `?${query}` : '';
  return axios.get<OverviewReport>(`${path}${_query}`);
}
