import { Bullseye, Pagination, PaginationVariant, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import type { Query } from 'api/queries';
import { getQueryRoute } from 'api/queries';
import type { Report } from 'api/reports/report';
import { ReportPathsType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExportModal } from 'routes/components/export';
import { PageHeading } from 'routes/components/page-heading';
import { DateRangeType } from 'routes/utils/dateRange';
import type { Filter } from 'routes/utils/filter';
import { addFilterToQuery, removeFilterFromQuery } from 'routes/utils/filter';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportSelectors } from 'store/reports';
import { useStateCallback } from 'utils/hooks';

import { useAccountSummaryMapToProps, useDetailsMapDateRangeToProps } from './api';
import { styles } from './Details.styles';
import { DetailsFilterToolbar } from './DetailsFilterToolbar';
import { DetailsHeaderToolbar } from './DetailsHeaderToolbar';
import { DetailsTable } from './DetailsTable';
import { getDateRangeType, getGroupByType, getSourcesOfSpendType, GroupByType, SourcesOfSpendType } from './types';
const Loading = lazy(() => import('routes/state/loading/Loading'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface DetailsOwnProps {
  dateRange?: string;
  groupBy?: string;
  sourcesOfSpend?: string;
}

interface DetailsStateProps {
  contractStartDate?: Date;
  endDate?: Date;
  hasReportErrors?: boolean;
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
  const [dateRange, setDateRange] = useState(getDateRangeType(DateRangeType.contractedYtd));
  const [groupBy, setGroupBy] = useStateCallback(getGroupByType(GroupByType.product));
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [secondaryGroupBy, setSecondaryGroupBy] = useState(GroupByType.none);
  const [sourcesOfSpend, setSourcesOfSpend] = useState(getSourcesOfSpendType(SourcesOfSpendType.marketplace));

  const {
    contractStartDate,
    endDate,
    hasReportErrors,
    query,
    report,
    reportFetchStatus,
    reportQueryString,
    startDate,
  } = useMapToProps({
    dateRange,
    groupBy,
    sourcesOfSpend,
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
    const page = offset / limit + 1;

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
        sourcesOfSpend={sourcesOfSpend}
        startDate={startDate}
      />
    );
  };

  const handleOnDateRangeSelected = value => {
    setDateRange(value);
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
    setGroupBy(value, () => {
      const groupByKey: keyof Query['group_by'] = value as any;
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        filter_by: undefined, // Reset filter
        group_by: {
          [groupByKey]: '*',
        },
        order_by: { cost: 'desc' },
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
    setSecondaryGroupBy(value);
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

  const handleOnSourcesOfSpendSelected = value => {
    setSourcesOfSpend(value);
  };

  useEffect(() => {
    setSecondaryGroupBy(GroupByType.none);
  }, [groupBy, sourcesOfSpend]);

  // Todo: Remove when APIs are available
  const isTest = true;

  if (hasReportErrors && !isTest) {
    const title = intl.formatMessage(messages.detailsTitle);
    return <NotAvailable title={title} />;
  }

  return (
    <React.Fragment>
      <PageHeading>
        <DetailsHeaderToolbar
          contractStartDate={contractStartDate}
          dateRange={dateRange}
          endDate={endDate}
          groupBy={groupBy}
          onDateRangeSelected={handleOnDateRangeSelected}
          onGroupBySelected={handleOnGroupBySelected}
          onSecondaryGroupBySelected={handleOnSecondaryGroupBySelected}
          onSourcesOfSpendSelected={handleOnSourcesOfSpendSelected}
          secondaryGroupBy={secondaryGroupBy}
          sourcesOfSpend={sourcesOfSpend}
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

const useMapToProps = ({ dateRange, groupBy, sourcesOfSpend }: DetailsOwnProps): DetailsStateProps => {
  const hasReportErrors = useSelector((state: RootState) => reportSelectors.selectHasErrors(state));

  const { summary } = useAccountSummaryMapToProps();
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const contractStartDate =
    values && values.contract_start_date ? new Date(values.contract_start_date + 'T00:00:00') : undefined;

  const { endDate, query, report, reportFetchStatus, reportQueryString, startDate } = useDetailsMapDateRangeToProps({
    contractStartDate,
    dateRange,
    groupBy,
    sourcesOfSpend,
  });

  return {
    contractStartDate,
    endDate,
    hasReportErrors,
    query,
    report,
    reportFetchStatus,
    reportQueryString,
    startDate,
  };
};

export default injectIntl(Details);
