import type { ReportType } from 'api/reports/report';
import { ReportPathsType } from 'api/reports/report';

import { runExport as runDetailsExport } from './detailsExport';

export function runExport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  let result;
  switch (reportPathsType) {
    case ReportPathsType.details:
      result = runDetailsExport(reportType, query);
      break;
  }
  return result;
}
