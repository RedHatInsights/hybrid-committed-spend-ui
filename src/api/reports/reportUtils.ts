import { runReport as runAccountSummaryReport } from './accountSummaryReports';
import { runReport as runDetailsReport } from './detailsReports';
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
