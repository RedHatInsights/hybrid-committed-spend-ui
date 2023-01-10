import { Bullseye, Pagination, PaginationVariant, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import type { Query } from 'api/queries';
import { getQueryRoute, parseQuery } from 'api/queries';
import type { Report } from 'api/reports/report';
import { ReportPathsType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { lazy, Suspense, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExportModal } from 'routes/components/export';
import { PageHeading } from 'routes/components/page-heading';
import { DateRangeType } from 'routes/utils/dateRange';
import type { Filter } from 'routes/utils/filter';
import { addFilterToQuery, removeFilterFromQuery } from 'routes/utils/filter';
import { FetchStatus } from 'store/common';
import { useStateCallback } from 'utils/hooks';

import { styles } from './Details.styles';
import { DetailsFilterToolbar } from './DetailsFilterToolbar';
import { DetailsHeaderToolbar } from './DetailsHeaderToolbar';
import { DetailsTable } from './DetailsTable';
import {
  getDateRangeType,
  getGroupByType,
  getIdKeyForGroupBy,
  getSourceOfSpendType,
  GroupByType,
  SourceOfSpendType,
} from './types';
import { useAccountSummaryMapToProps, useDetailsMapDateRangeToProps } from './utils';
const Loading = lazy(() => import('routes/state/loading/Loading'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface DetailsOwnProps {
  dateRange?: string;
  groupBy?: string;
  sourceOfSpend?: string;
}

interface DetailsStateProps {
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  endDate?: Date;
  query?: Query;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
  startDate?: Date;
}

type DetailsProps = DetailsOwnProps & WrappedComponentProps;

const Details: React.FC<DetailsProps> = ({ intl }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useStateCallback(useDefaultDateRange());
  const [groupBy, setGroupBy] = useStateCallback(useDefaultGroupBy());
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [secondaryGroupBy, setSecondaryGroupBy] = useStateCallback(useDefaultSecondaryGroupBy());
  const [sourceOfSpend, setSourceOfSpend] = useStateCallback(useDefaultSourceOfSpend());

  const {
    contractLineStartDate,
    contractStartDate,
    endDate,
    query,
    report,
    reportError,
    reportFetchStatus,
    reportQueryString,
    startDate,
  } = useMapToProps({
    dateRange,
    groupBy,
    sourceOfSpend,
  });

  const getFilterToolbar = () => {
    return (
      <DetailsFilterToolbar
        groupBy={groupBy}
        isExportDisabled={!(report && report.meta) || report.meta.count === 0}
        onExportClicked={handleOnExportModalOpen}
        onFilterAdded={handleOnFilterAdded}
        onFilterRemoved={handleOnFilterRemoved}
        pagination={getPagination()}
        query={query}
      />
    );
  };

  const getExportModal = () => {
    return (
      <ExportModal
        groupBy={groupBy}
        isOpen={isExportModalOpen}
        onClose={handleOnExportModalClose}
        reportPathsType={ReportPathsType.accountSummary}
        reportQueryString={reportQueryString}
      />
    );
  };

  const getPagination = (isBottom: boolean = false) => {
    const count = report && report.meta && report.meta.count !== undefined ? report.meta.count : 0;
    const limit =
      report && report.meta && report.meta.filter && report.meta.filter.limit ? report.meta.filter.limit : 0;
    const offset =
      report && report.meta && report.meta.filter && report.meta.filter.offset ? report.meta.filter.offset : 0;
    const page = limit > 0 ? offset / limit + 1 : 1;

    return (
      <Pagination
        isCompact={!isBottom}
        itemCount={count as number}
        onPerPageSelect={handleOnPerPageSelect}
        onSetPage={handleOnSetPage}
        page={page}
        perPage={limit}
        titles={{
          paginationTitle: intl.formatMessage(messages.paginationTitle, {
            title: intl.formatMessage(messages.detailsTitle),
            placement: isBottom ? 'bottom' : 'top',
          }),
        }}
        variant={isBottom ? PaginationVariant.bottom : PaginationVariant.top}
        widgetId={`pagination${isBottom ? '-bottom' : ''}`}
      />
    );
  };

  const getRouteForQuery = (newQuery: Query, reset: boolean = false) => {
    // Reset pagination
    if (reset) {
      newQuery.filter = {
        ...newQuery.filter,
        offset: 0,
      };
    }
    return `${location.pathname}?${getQueryRoute(newQuery)}`;
  };

  const getTable = () => {
    return (
      <DetailsTable
        endDate={endDate}
        groupBy={groupBy}
        isLoading={reportFetchStatus === FetchStatus.inProgress}
        onSort={handleOnSort}
        query={query}
        report={report}
        secondaryGroupBy={secondaryGroupBy}
        sourceOfSpendType={sourceOfSpend}
        startDate={startDate}
      />
    );
  };

  const handleOnDateRangeSelected = value => {
    setDateRange(value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        dateRange: value,
      };
      navigate(getRouteForQuery(newQuery, true), { replace: true });
    });
  };

  const handleOnExportModalClose = (isOpen: boolean) => {
    setIsExportModalOpen(isOpen);
  };

  const handleOnExportModalOpen = () => {
    setIsExportModalOpen(true);
  };

  const handleOnFilterAdded = (filter: Filter) => {
    const newQuery = addFilterToQuery(query, filter);
    navigate(getRouteForQuery(newQuery, true), { replace: true });
  };

  const handleOnFilterRemoved = (filter: Filter) => {
    const newQuery = removeFilterFromQuery(query, filter);
    navigate(getRouteForQuery(newQuery, true), { replace: true });
  };

  const handleOnGroupBySelected = value => {
    handleOnFilterRemoved(null); // Clear all
    setSecondaryGroupBy(GroupByType.none);
    setGroupBy(value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        primaryGroupBy: {
          [value]: '*',
        },
        secondaryGroupBy: undefined,
        filter_by: undefined,
      };
      navigate(getRouteForQuery(newQuery, true), { replace: true });
    });
  };

  const handleOnPerPageSelect = (event, perPage) => {
    const newQuery = { ...JSON.parse(JSON.stringify(query)) };
    newQuery.filter = {
      ...query.filter,
      limit: perPage,
    };
    const filteredQuery = getRouteForQuery(newQuery, true);
    navigate(filteredQuery, { replace: true });
  };

  const handleOnSecondaryGroupBySelected = value => {
    setSecondaryGroupBy(value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        secondaryGroupBy: {
          [value]: '*',
        },
      };
      navigate(getRouteForQuery(newQuery, true), { replace: true });
    });
  };

  const handleOnSetPage = (event, pageNumber) => {
    const limit =
      report && report.meta && report.meta.filter && report.meta.filter.limit ? report.meta.filter.limit : 10;
    const offset = pageNumber * limit - limit;

    const newQuery = { ...JSON.parse(JSON.stringify(query)) };
    newQuery.filter = {
      ...query.filter,
      offset,
    };
    const filteredQuery = getRouteForQuery(newQuery);
    navigate(filteredQuery, { replace: true });
  };

  const handleOnSort = (sortType: string, isSortAscending: boolean, date: string = undefined) => {
    const newQuery = { ...JSON.parse(JSON.stringify(query)) };
    newQuery.order_by = {};
    newQuery.order_by[sortType] = isSortAscending ? 'asc' : 'desc';

    if (date) {
      newQuery.order_by.date = date;
    }
    const filteredQuery = getRouteForQuery(newQuery);
    navigate(filteredQuery, { replace: true });
  };

  const handleOnSourceOfSpendSelected = value => {
    setSecondaryGroupBy(GroupByType.none);
    setSourceOfSpend(value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        sourceOfSpend: value,
        secondaryGroupBy: undefined,
      };
      navigate(getRouteForQuery(newQuery, true), { replace: true });
    });
  };

  if (reportError) {
    const title = intl.formatMessage(messages.detailsTitle);
    return <NotAvailable title={title} />;
  }
  return (
    <React.Fragment>
      <PageHeading>
        <DetailsHeaderToolbar
          contractLineStartDate={contractLineStartDate}
          contractStartDate={contractStartDate}
          dateRange={dateRange}
          endDate={endDate}
          groupBy={groupBy}
          onDateRangeSelected={handleOnDateRangeSelected}
          onGroupBySelected={handleOnGroupBySelected}
          onSecondaryGroupBySelected={handleOnSecondaryGroupBySelected}
          onSourceOfSpendSelected={handleOnSourceOfSpendSelected}
          secondaryGroupBy={secondaryGroupBy}
          sourceOfSpendType={sourceOfSpend}
          startDate={startDate}
        />
      </PageHeading>
      <Main>
        <Suspense
          fallback={
            <Bullseye>
              <Spinner size="lg" />
            </Bullseye>
          }
        >
          {getFilterToolbar()}
          {getExportModal()}
          {reportFetchStatus === FetchStatus.inProgress ? (
            <Loading />
          ) : (
            <React.Fragment>
              <div>{getTable()}</div>
              <div style={styles.pagination}>{getPagination(true)}</div>
            </React.Fragment>
          )}
        </Suspense>
      </Main>
    </React.Fragment>
  );
};

const getQueryFromRoute = () => {
  const location = useLocation();
  return parseQuery<Query>(location.search);
};

const useDefaultDateRange = () => {
  const queryFromRoute = getQueryFromRoute();
  return getDateRangeType(queryFromRoute.dateRange ? queryFromRoute.dateRange : DateRangeType.contractedYtd);
};

const useDefaultGroupBy = () => {
  const queryFromRoute = getQueryFromRoute();
  const primaryGroupBy = getIdKeyForGroupBy(queryFromRoute.primaryGroupBy);
  return getGroupByType(primaryGroupBy ? primaryGroupBy : GroupByType.product);
};

const useDefaultSecondaryGroupBy = () => {
  const queryFromRoute = getQueryFromRoute();
  const secondaryGroupBy = getIdKeyForGroupBy(queryFromRoute.secondaryGroupBy);
  return getGroupByType(secondaryGroupBy ? secondaryGroupBy : GroupByType.none);
};

const useDefaultSourceOfSpend = () => {
  const queryFromRoute = getQueryFromRoute();
  return getSourceOfSpendType(queryFromRoute.sourceOfSpend ? queryFromRoute.sourceOfSpend : SourceOfSpendType.all);
};

const useMapToProps = ({ dateRange, groupBy, sourceOfSpend }: DetailsOwnProps): DetailsStateProps => {
  const { summary } = useAccountSummaryMapToProps();
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const contractStartDate =
    values && values.contract_start_date ? new Date(values.contract_start_date + 'T00:00:00') : undefined;
  const contractLineStartDate =
    values && values.contract_line_start_date ? new Date(values.contract_line_start_date + 'T00:00:00') : undefined;

  const { endDate, query, report, reportError, reportFetchStatus, reportQueryString, startDate } =
    useDetailsMapDateRangeToProps({
      contractStartDate,
      dateRange,
      groupBy,
      sourceOfSpend,
    });

  return {
    contractLineStartDate,
    contractStartDate,
    endDate,
    query,
    report,
    reportError,
    reportFetchStatus,
    reportQueryString,
    startDate,
  };
};

export default injectIntl(Details);
