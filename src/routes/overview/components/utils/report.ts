import type { Query } from 'api/queries';
import { getQuery } from 'api/queries';
import type { Report } from 'api/reports/report';
import type { ReportPathsType, ReportType } from 'api/reports/report';
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

interface ReportOwnProps {
  consumptionDate?: Date;
  contractLineEndDate?: Date;
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  isExpanded?: boolean;
  limit?: number;
  perspective?: string;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
  reportPathsType?: ReportPathsType;
  reportType?: ReportType;
  resolution?: string;
  startDate?: Date;
}

interface ReportStateProps {
  endDate?: Date;
  query: Query;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
  reportQueryString: string;
  startDate?: Date;
}

export const useReportMapDateRangeToProps = ({
  consumptionDate,
  contractLineEndDate,
  contractLineStartDate,
  dateRange,
  limit,
  perspective,
  previousContractLineEndDate,
  previousContractLineStartDate,
  reportPathsType,
  reportType,
  resolution,
}: ReportOwnProps): ReportStateProps => {
  const { endDate, startDate }: DateType = getDateRange({
    dateRange,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
  });

  return useReportMapToProps({
    consumptionDate,
    dateRange,
    endDate,
    limit,
    perspective,
    reportPathsType,
    reportType,
    resolution,
    startDate,
  });
};

export const useReportMapToProps = ({
  consumptionDate,
  dateRange,
  endDate,
  limit,
  perspective,
  reportPathsType,
  reportType,
  resolution = 'cumulative',
  startDate,
}: ReportOwnProps): ReportStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    ...(perspective && {
      groupBy: {
        [perspective]: '*',
      },
    }),
    filter: {
      ...(limit && { limit }),
      resolution,
    },
    dateRange,
  };

  const reportQueryString = getQuery({
    ...query,
    ...(startDate && endDate && { ...formatDate({ consumptionDate, startDate, endDate }) }),
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
