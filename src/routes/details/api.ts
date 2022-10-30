import type { Query } from 'api/queries';
import { getQuery, parseQuery } from 'api/queries';
import type { Report } from 'api/reports/report';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { accountSummaryMapToProps } from 'routes/utils/api';
import { getDateRange, getDateRangeDefault } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

import { affiliateData } from './data/affiliateData';
import { emptyData } from './data/emptyData';
import { sourceData } from './data/sourceData';
import { GroupByType, SourcesOfSpendType } from './types';

interface DetailsOwnProps {
  dateRange?: string;
  groupBy?: string;
  groupByValue?: string;
  isExpanded?: boolean;
  secondaryGroupBy?: string;
  sourcesOfSpend?: string;
}

interface DetailsStateProps {
  end_date?: string;
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
  start_date?: string;
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

export const detailsMapToProps = ({
  dateRange,
  groupBy,
  groupByValue,
  isExpanded,
  secondaryGroupBy,
  sourcesOfSpend = SourcesOfSpendType.all,
}: DetailsOwnProps): DetailsStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const { summary } = accountSummaryMapToProps();
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const contractStartDate =
    values && values.contract_start_date ? new Date(values.contract_start_date + 'T23:59:59z') : undefined;

  const queryFromRoute = parseQuery<Query>(location.search);
  const _dateRange = dateRange || getDateRangeDefault(queryFromRoute);
  const { end_date, start_date } = getDateRange(_dateRange, contractStartDate);

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
    end_date,
    start_date,
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

    const startDate = new Date(start_date + 'T23:59:59z');
    const endDate = new Date(end_date + 'T23:59:59z');

    result.data = result.data.filter(item => {
      const currentDate = new Date(item.date + 'T23:59:59z');
      if (currentDate >= startDate && currentDate <= endDate) {
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
  }, [dateRange, isExpanded, secondaryGroupBy, summary]);

  return {
    end_date,
    query,
    queryString,
    report,
    reportFetchStatus,
    reportError,
    start_date,
  };
};
