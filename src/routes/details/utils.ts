import type { Query } from 'api/queries';
import { getQuery, parseQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReports';
import type { Report } from 'api/reports/report';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { getDateRange } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { formatDate } from 'utils/dates';

import { GroupByType, SourceOfSpendType } from './types';

interface AccountSummaryStateProps {
  summary?: AccountSummaryReport;
  summaryError?: AxiosError;
  summaryFetchStatus?: FetchStatus;
  summaryQueryString?: string;
}

interface DetailsOwnProps {
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  groupBy?: string;
  groupByValue?: string;
  isExpanded?: boolean;
  secondaryGroupBy?: string;
  sourceOfSpend?: string;
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

export const baseQuery: Query = {
  filter: {
    limit: 10,
    offset: 0,
  },
  filter_by: {},
  group_by: {
    product: '*',
  },
  order_by: {
    cost: 'desc',
  },
};

export const useAccountSummaryMapToProps = (deps = []): AccountSummaryStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    // TBD...
  };
  const summaryQueryString = getQuery(query);

  const reportPathsType = ReportPathsType.accountSummary;
  const reportType = ReportType.billing;

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
  contractStartDate,
  dateRange,
  groupBy,
  groupByValue,
  secondaryGroupBy,
  sourceOfSpend,
}: DetailsOwnProps): DetailsStateProps => {
  const { endDate, startDate } = getDateRange(dateRange, contractStartDate);

  return useDetailsMapToProps({
    dateRange,
    endDate,
    groupBy,
    groupByValue,
    secondaryGroupBy,
    sourceOfSpend,
    startDate,
  });
};

export const useDetailsMapToProps = ({
  dateRange,
  endDate,
  groupBy,
  groupByValue,
  isExpanded = false,
  secondaryGroupBy,
  sourceOfSpend = SourceOfSpendType.all,
  startDate,
}: DetailsOwnProps): DetailsStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const location = useLocation();
  const queryFromRoute = parseQuery<Query>(location.search);

  // const query = {
  //   filter: {
  //     ...(secondaryGroupBy
  //       ? {
  //           [groupBy]: groupByValue,
  //         }
  //       : {}),
  //     ...queryFromRoute.filter,
  //   },
  //   filter_by: queryFromRoute.filter_by || baseQuery.filter_by,
  //   group_by: secondaryGroupBy ? secondaryGroupBy : groupBy,
  //   order_by: queryFromRoute.order_by,
  // };
  const query = {
    sourceOfSpend,
    primaryGroupBy: {
      [groupBy]: groupByValue ? groupByValue : '*',
    },
    ...(secondaryGroupBy &&
      secondaryGroupBy !== GroupByType.none && {
        secondaryGroupBy: {
          [secondaryGroupBy]: '*',
        },
      }),
    ...(queryFromRoute.filter && { filter: queryFromRoute.filter }),
    ...(queryFromRoute.filter_by && { filter_by: queryFromRoute.filter_by }),
    dateRange,
  };

  // Todo: current API uses plurals for projects and affiliates.
  const newQuery = { ...query };
  if (groupBy === GroupByType.affiliate || groupBy === GroupByType.product) {
    newQuery.primaryGroupBy = {
      [`${groupBy}s`]: groupByValue ? groupByValue : '*',
    };
  }
  // Todo: current API uses plurals for projects and affiliates.
  if (secondaryGroupBy === GroupByType.affiliate || secondaryGroupBy === GroupByType.product) {
    newQuery.secondaryGroupBy = {
      [`${secondaryGroupBy}s`]: '*',
    };
  }

  const reportPathsType = ReportPathsType.details;
  const reportType = ReportType.billing;
  const reportQueryString = getQuery({
    ...newQuery,
    filter: {
      limit: 10,
      offset: 0,
      ...(sourceOfSpend !== SourceOfSpendType.all && { sources_of_spend: sourceOfSpend }),
    },
    ...formatDate(startDate, endDate),
    sourceOfSpend: undefined,
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
    if (!reportError && reportFetchStatus !== FetchStatus.inProgress && startDate) {
      if (secondaryGroupBy) {
        if (secondaryGroupBy !== GroupByType.none && isExpanded) {
          dispatch(reportActions.fetchReport(reportPathsType, reportType, reportQueryString));
        }
      } else {
        // Primary group by
        dispatch(reportActions.fetchReport(reportPathsType, reportType, reportQueryString));
      }
    }
  }, [reportQueryString]);

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
