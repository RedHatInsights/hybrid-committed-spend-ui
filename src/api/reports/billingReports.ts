import axios from 'axios';
import { Omit } from 'react-redux';

import { Report, ReportData, ReportItem, ReportItemValue, ReportMeta, ReportType, ReportValue } from './report';

export interface BillingReportItem extends ReportItem {
  account?: string;
  account_alias?: string;
  org_unit_id?: string;
  region?: string;
  service?: string;
}

export interface GroupByAccountData extends Omit<BillingReportData, 'accounts'> {
  account: string;
}

export interface GroupByRegionData extends Omit<BillingReportData, 'regions'> {
  region: string;
}

export interface GroupByServiceData extends Omit<BillingReportData, 'services'> {
  service: string;
}

export interface BillingReportData extends ReportData {
  accounts?: GroupByAccountData[];
  regions?: GroupByRegionData[];
  services?: GroupByServiceData[];
}

export interface BillingReportMeta extends ReportMeta {
  total?: {
    cost?: ReportItemValue;
    infrastructure?: ReportItemValue;
    supplementary?: ReportItemValue;
    usage?: ReportValue;
  };
}

export interface BillingReport extends Report {
  meta: BillingReportMeta;
  data: BillingReportData[];
}

export const ReportTypePaths: Partial<Record<ReportType, string>> = {
  // [ReportType.cost]: 'reports/aws/costs/',
  [ReportType.cost]: '',

  [ReportType.actualSpend]: '',
  [ReportType.actualSpendBreakdown]: '',
  [ReportType.committedSpend]: '',
  [ReportType.committedSpendTrend]: '',

  [ReportType.summary]: 'reports/hcsSummary',
};

export function runReport(reportType: ReportType, query: string) {
  const path = ReportTypePaths[reportType];
  const _query = query ? `?${query}` : '';
  return axios.get<BillingReport>(`${path}${_query}`);
}
