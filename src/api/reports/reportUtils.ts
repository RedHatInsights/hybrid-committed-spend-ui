import { runReport as runAccountSummaryReport } from './accountSummaryReports';
import { runReport as runDetailsFilterReport } from './detailsFilterReports';
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
    case ReportPathsType.detailsFilter:
      report = runDetailsFilterReport(reportType, query);
      break;
    default:
      break;
  }
  return report;
}
