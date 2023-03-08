import type { Query } from 'api/queries';
import { getQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReport';
import type { Report } from 'api/reports/report';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { getDateRange } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { formatDate } from 'utils/dates';

interface AccountSummaryStateProps {
  summary?: AccountSummaryReport;
  summaryError?: AxiosError;
  summaryFetchStatus?: FetchStatus;
  summaryQueryString?: string;
}

interface DetailsOwnProps {
  consumptionDate?: Date;
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  isExpanded?: boolean;
  reportPathsType?: ReportPathsType;
  reportType?: ReportType;
  startDate?: Date;
}

interface DetailsStateProps {
  endDate?: Date;
  query: Query;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
  reportQueryString: string;
  startDate?: Date;
}

export const useAccountSummaryMapToProps = (deps = []): AccountSummaryStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    // TBD...
  };
  const summaryQueryString = getQuery(query);

  const reportPathsType = ReportPathsType.accountSummary;
  const reportType = ReportType.details;

  const summary: AccountSummaryReport = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, reportPathsType, reportType, summaryQueryString)
  );
  const summaryError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, reportPathsType, reportType, summaryQueryString)
  );
  const summaryFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, summaryQueryString)
  );

  useEffect(() => {
    if (!summaryError && summaryFetchStatus !== FetchStatus.inProgress) {
      dispatch(reportActions.fetchReport(reportPathsType, reportType, summaryQueryString));
    }
  }, deps);

  return {
    summary,
    summaryError,
    summaryFetchStatus,
    summaryQueryString,
  };
};

export const useDetailsMapDateRangeToProps = ({
  consumptionDate,
  contractLineStartDate,
  contractStartDate,
  dateRange,
  reportPathsType,
  reportType,
}: DetailsOwnProps): DetailsStateProps => {
  const { endDate, startDate } = getDateRange({
    dateRange,
    consumptionDate,
    contractLineStartDate,
    contractStartDate,
  });

  return useDetailsMapToProps({
    dateRange,
    endDate,
    reportPathsType,
    reportType,
    startDate,
  });
};

export const useDetailsMapToProps = ({
  dateRange,
  endDate,
  isExpanded = false,
  reportPathsType = ReportPathsType.details,
  reportType = ReportType.committedSpend,
  startDate,
}: DetailsOwnProps): DetailsStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    filter: {
      resolution: 'cumulative',
    },
    dateRange,
  };

  const reportQueryString = getQuery({
    ...query,
    ...(startDate && endDate && { ...formatDate(startDate, endDate) }),
    dateRange: undefined,
  });

  const report = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, reportPathsType, reportType, reportQueryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, reportQueryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, reportPathsType, reportType, reportQueryString)
  );

  useEffect(() => {
    if (!reportError && reportFetchStatus !== FetchStatus.inProgress && startDate && endDate) {
      dispatch(reportActions.fetchReport(reportPathsType, reportType, reportQueryString));
    }
  }, [reportQueryString, isExpanded]);

  return {
    endDate,
    query,
    report,
    reportError,
    reportFetchStatus,
    reportQueryString,
    startDate,
  };
};
