import { ReportPathsType, ReportType } from 'api/reports';
import axios from 'axios';

export interface Export {
  data: string;
}

export function runExport(reportPathsType: ReportPathsType, reportType: ReportType, query: string) {
  const path = reportPathsType[reportType];
  return axios.get<string>(`${path}?${query}`, {
    headers: {
      Accept: 'text/csv',
    },
  });
}
