import { ReportPathsType, ReportType } from './report';
import { runReport as runAwsReport } from './overviewReports';

export function runReport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  let report;
  switch (reportPathsType) {
    case ReportPathsType.sample:
      report = runAwsReport(reportType, query);
      break;
  }
  return report;
}
