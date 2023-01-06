import type { ReportPathsType, ReportType } from 'api/reports/report';
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

// Return true if there is at least one Axios error
export const selectHasReportErrors = (state: RootState) => {
  const errors = selectReportState(state).errors;
  if (errors) {
    for (const value of errors.values()) {
      if (value !== null) {
        return true;
      }
    }
  }
  return false;
};
