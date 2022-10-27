import { runReport as runAccountSummaryReport } from './accountSummaryReports';
import { runReport as runDetailsFilterReport } from './detailsFilterReports';
import type { ReportType } from './report';
import { ReportPathsType } from './report';

export function runReport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  let report;
  switch (reportPathsType) {
    case ReportPathsType.accountSummary:
      report = runAccountSummaryReport(reportType, query);
      break;
    case ReportPathsType.detailsFilter:
    default:
      report = runDetailsFilterReport(reportType, query);
      break;
  }
  return report;
}
