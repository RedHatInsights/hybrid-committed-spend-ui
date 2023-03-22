import type { Query } from 'api/queries';
import { getQuery, parseQuery } from 'api/queries';
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
import type { DateType } from 'utils/dates';
import { formatDate } from 'utils/dates';

import { getSourceOfSpendFilter, GroupByType, SourceOfSpendType } from './types';

interface DetailsOwnProps {
  consumptionDate?: Date;
  contractLineEndDate?: Date;
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  dateRange?: string;
  endDate?: Date;
  groupBy?: string;
  groupByValue?: string;
  isChildNode?: boolean;
  isExpanded?: boolean;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
  reportPathsType?: ReportPathsType;
  reportType?: ReportType;
  secondaryGroupBy?: string;
  sourceOfSpend?: string;
  startDate?: Date;
}

interface DetailsStateProps {
  endDate?: Date;
  exportQueryString?: string;
  query?: Query;
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
  groupBy: {
    product: '*',
  },
  orderBy: {
    cost: 'desc',
  },
};

export const useDetailsMapDateRangeToProps = ({
  consumptionDate,
  contractLineEndDate,
  contractLineStartDate,
  dateRange,
  groupBy,
  groupByValue,
  previousContractLineEndDate,
  previousContractLineStartDate,
  reportPathsType,
  reportType,
  secondaryGroupBy,
  sourceOfSpend,
}: DetailsOwnProps): DetailsStateProps => {
  const { endDate, startDate }: DateType = getDateRange({
    dateRange,
    consumptionDate,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
  });

  return useDetailsMapToProps({
    dateRange,
    endDate,
    groupBy,
    groupByValue,
    reportPathsType,
    reportType,
    secondaryGroupBy,
    sourceOfSpend,
    startDate,
  });
};

// Intended to be used with table rows at the root level
export const useDetailsMapToProps = ({
  dateRange,
  endDate,
  groupBy,
  groupByValue,
  isChildNode = false,
  isExpanded = false,
  reportPathsType = ReportPathsType.details,
  reportType = ReportType.details,
  secondaryGroupBy,
  sourceOfSpend = SourceOfSpendType.all,
  startDate,
}: DetailsOwnProps): DetailsStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const location = useLocation();
  const queryFromRoute = parseQuery<Query>(location.search);

  const query = {
    sourceOfSpend,
    groupBy: {
      [groupBy]: groupByValue ? groupByValue : '*',
      ...(secondaryGroupBy &&
        secondaryGroupBy !== GroupByType.none && {
          [secondaryGroupBy]: '*', // Required for export and child nodes
        }),
    },
    ...(queryFromRoute.filter && { filter: queryFromRoute.filter }),
    ...(queryFromRoute.filter_by && { filter_by: queryFromRoute.filter_by }),
    ...(queryFromRoute.orderBy && { orderBy: queryFromRoute.orderBy }),
    dateRange,
  };

  const reportQuery = {
    ...query,
    filter: {
      ...(query.filter ? query.filter : {}),
      ...(sourceOfSpend !== SourceOfSpendType.all && { source_of_spend: getSourceOfSpendFilter(sourceOfSpend) }),
      ...(secondaryGroupBy && { limit: 1000, offset: undefined }), // Children are not paginated
    },
    ...(startDate && endDate && { ...formatDate(startDate, endDate) }),
    sourceOfSpend: undefined,
    dateRange: undefined,
  };

  // When sorting secondaryGroupBy names, don't use orderBy[product]=*
  if (secondaryGroupBy && query.orderBy && query.orderBy[groupBy]) {
    reportQuery.orderBy[secondaryGroupBy] = query.orderBy[groupBy];
    reportQuery.orderBy[groupBy] = undefined;
  }

  // Save secondaryGroupBy for export
  const exportQueryString = getQuery(reportQuery);

  // If not a child node, omit secondaryGroupBy
  if (!isChildNode) {
    reportQuery.groupBy[secondaryGroupBy] = undefined;
  }

  const reportQueryString = getQuery(reportQuery);
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
      if (isChildNode) {
        if (secondaryGroupBy !== GroupByType.none && isExpanded) {
          dispatch(reportActions.fetchReport(reportPathsType, reportType, reportQueryString));
        }
      } else {
        // Primary group by
        dispatch(reportActions.fetchReport(reportPathsType, reportType, reportQueryString));
      }
    }
  }, [reportQueryString, isExpanded, isChildNode]);

  return {
    endDate,
    exportQueryString,
    query,
    report,
    reportError,
    reportFetchStatus,
    reportQueryString,
    startDate,
  };
};
