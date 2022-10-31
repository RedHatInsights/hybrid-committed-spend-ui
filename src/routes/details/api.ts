import type { Query } from 'api/queries';
import { getQuery, parseQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReports';
import type { Report } from 'api/reports/report';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { getDateRange } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { compareDateYearAndMonth } from 'utils/dates';

import { affiliateData } from './data/affiliateData';
import { emptyData } from './data/emptyData';
import { productData } from './data/productData';
import { sourceData } from './data/sourceData';
import { GroupByType, SourcesOfSpendType } from './types';

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
  sourcesOfSpend?: string;
  startDate?: Date;
}

interface DetailsStateProps {
  endDate?: Date;
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
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

export const accountSummaryMapToProps = (deps = []): AccountSummaryStateProps => {
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
    if (summaryFetchStatus !== FetchStatus.inProgress) {
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

export const detailsMapDateRangeToProps = ({
  contractStartDate,
  dateRange,
  groupBy,
  groupByValue,
  secondaryGroupBy,
  sourcesOfSpend,
}: DetailsOwnProps): DetailsStateProps => {
  const { endDate, startDate } = getDateRange(dateRange, contractStartDate);

  return detailsMapToProps({
    endDate,
    groupBy,
    groupByValue,
    secondaryGroupBy,
    sourcesOfSpend,
    startDate,
  });
};

export const detailsMapToProps = ({
  endDate,
  groupBy,
  groupByValue,
  isExpanded,
  secondaryGroupBy,
  sourcesOfSpend = SourcesOfSpendType.all,
  startDate,
}: DetailsOwnProps): DetailsStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const queryFromRoute = parseQuery<Query>(location.search);
  const query = {
    filter: {
      ...(secondaryGroupBy
        ? {
            [groupBy]: groupByValue,
          }
        : {}),
      ...queryFromRoute.filter,
    },
    filter_by: queryFromRoute.filter_by || baseQuery.filter_by,
    group_by: secondaryGroupBy ? secondaryGroupBy : groupBy,
    order_by: queryFromRoute.order_by,
  };
  const queryString = getQuery({
    ...query,
    dateRange: undefined,
    end_date: endDate,
    start_date: startDate,
  });

  // Todo: temporary placeholder for upcoming API
  const reportPathsType = ReportPathsType.details;
  const reportType = ReportType.billing;

  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString)

    let result;
    switch (secondaryGroupBy || groupBy) {
      case GroupByType.affiliate:
        result = cloneDeep(affiliateData);
        break;
      case GroupByType.product:
        result = cloneDeep(productData);
        break;
      case GroupByType.sourceOfSpend:
        result = cloneDeep(sourceData);
        break;
      case GroupByType.none:
      default:
        result = cloneDeep(emptyData);
        break;
    }

    if (startDate && endDate) {
      result.data = result.data.filter(item => {
        const currentDate = new Date(item.date + 'T23:59:59z');
        if (
          compareDateYearAndMonth(currentDate, startDate) >= 0 &&
          compareDateYearAndMonth(currentDate, endDate) <= 0
        ) {
          return item;
        }
      });

      if (
        sourcesOfSpend !== SourcesOfSpendType.all &&
        secondaryGroupBy !== GroupByType.none &&
        groupBy === GroupByType.product
      ) {
        result.data.map(item => {
          for (const key in item) {
            if (item[key] instanceof Array) {
              item[key].map(dataPoint => {
                dataPoint.values = dataPoint.values.filter(val => val.source_of_spend === sourcesOfSpend);
              });
            }
          }
        });
      }
    }
    return result;
  });
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, queryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, reportPathsType, reportType, queryString)
  );

  useEffect(() => {
    if (reportFetchStatus !== FetchStatus.inProgress && isExpanded) {
      dispatch(reportActions.fetchReport(reportPathsType, reportType, queryString));
    }
  }, [isExpanded, secondaryGroupBy]);

  return {
    endDate,
    query,
    queryString,
    report,
    reportFetchStatus,
    reportError,
    startDate,
  };
};
