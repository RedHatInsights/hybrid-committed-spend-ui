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
import type { DateType } from 'utils/dates';
import { formatDate } from 'utils/dates';

interface AccountSummaryDateProps {
  consumptionDate?: Date;
  contractLineEndDate?: Date;
  contractLineStartDate?: Date;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
}

interface AccountSummaryStateProps {
  summary?: AccountSummaryReport;
  summaryError?: AxiosError;
  summaryFetchStatus?: FetchStatus;
  summaryQueryString?: string;
}

interface DetailsOwnProps {
  consumptionDate?: Date;
  contractLineEndDate?: Date;
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  isExpanded?: boolean;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
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

export const getAccountSummaryDates = (summary: AccountSummaryReport): AccountSummaryDateProps => {
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const consumptionDate =
    values && values.consumption_date ? new Date(values.consumption_date + 'T00:00:00') : undefined;
  const contractLineEndDate =
    values && values.contract_line_end_date ? new Date(values.contract_line_end_date + 'T00:00:00') : undefined;
  const contractLineStartDate =
    values && values.contract_line_start_date ? new Date(values.contract_line_start_date + 'T00:00:00') : undefined;
  const previousContractLineEndDate =
    values && values.previous_contract_line_end_date
      ? new Date(values.previous_contract_line_end_date + 'T00:00:00')
      : undefined;
  const previousContractLineStartDate =
    values && values.previous_contract_line_start_date
      ? new Date(values.previous_contract_line_start_date + 'T00:00:00')
      : undefined;

  return {
    consumptionDate,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
  };
};

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
  contractLineEndDate,
  contractLineStartDate,
  dateRange,
  previousContractLineEndDate,
  previousContractLineStartDate,
  reportPathsType,
  reportType,
}: DetailsOwnProps): DetailsStateProps => {
  const { endDate, startDate }: DateType = getDateRange({
    dateRange,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
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
  }, [endDate, reportQueryString, startDate]);

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
