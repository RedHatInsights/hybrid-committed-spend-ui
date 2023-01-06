import type { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import type { RootState } from 'store/rootReducer';

import { getFetchId, reportStateKey } from './reportCommon';

export const selectReportState = (state: RootState) => state[reportStateKey];

export const selectReport = (
  state: RootState,
  reportPathsType: ReportPathsType,
  reportType: ReportType,
  reportQueryString: string
) => selectReportState(state).byId.get(getFetchId(reportPathsType, reportType, reportQueryString));

export const selectReportFetchStatus = (
  state: RootState,
  reportPathsType: ReportPathsType,
  reportType: ReportType,
  reportQueryString: string
) => selectReportState(state).fetchStatus.get(getFetchId(reportPathsType, reportType, reportQueryString));

export const selectReportError = (
  state: RootState,
  reportPathsType: ReportPathsType,
  reportType: ReportType,
  reportQueryString: string
) => selectReportState(state).errors.get(getFetchId(reportPathsType, reportType, reportQueryString));

export const selectReportErrors = (state: RootState) => {
  return selectReportState(state).errors;
};

export const hasReportErrors = (errors: Map<string, AxiosError>) => {
  if (errors) {
    errors.forEach(error => {
      if (error !== null) {
        return true;
      }
    });
  }
  return false;
};
