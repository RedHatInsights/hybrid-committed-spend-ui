import { runReport as runBillingReport } from './billingReports';
import { ReportPathsType, ReportType } from './report';

export function runReport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  let report;
  switch (reportPathsType) {
    case ReportPathsType.billing:
      report = runBillingReport(reportType, query);
      break;
  }
  return report;
}
