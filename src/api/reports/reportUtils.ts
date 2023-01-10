import { runReport as runAccountSummaryReport } from './accountSummaryReport';
import { runReport as runDetailsReport } from './detailsReport';
import type { ReportType } from './report';
import { ReportPathsType } from './report';

export function runReport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  let report;
  switch (reportPathsType) {
    case ReportPathsType.accountSummary:
      report = runAccountSummaryReport(reportType, query);
      break;
    case ReportPathsType.details:
      report = runDetailsReport(reportType, query);
      break;
    default:
      break;
  }
  return report;
}
