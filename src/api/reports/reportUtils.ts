import { runReport as runBillingReport } from './billingReports';
import type { ReportType } from './report';
import { ReportPathsType } from './report';

export function runReport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  let report;
  switch (reportPathsType) {
    case ReportPathsType.billing:
    default:
      report = runBillingReport(reportType, query);
      break;
  }
  return report;
}
