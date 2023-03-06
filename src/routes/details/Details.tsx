import { Bullseye, PageSection, Pagination, PaginationVariant, Spinner } from '@patternfly/react-core';
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
import {
  getDateRangeType,
  getGroupByType,
  getIdKeyForGroupBy,
  getSourceOfSpendType,
  GroupByType,
  SourceOfSpendType,
} from 'routes/details/types';
import { useAccountSummaryMapToProps, useDetailsMapDateRangeToProps } from 'routes/details/utils';
import { DateRangeType } from 'routes/utils/dateRange';
import type { Filter } from 'routes/utils/filter';
import { addFilterToQuery, removeFilterFromQuery } from 'routes/utils/filter';
import { FetchStatus } from 'store/common';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { useStateCallback } from 'utils/hooks';

import { styles } from './Details.styles';
import { DetailsFilterToolbar } from './DetailsFilterToolbar';
import { DetailsHeaderToolbar } from './DetailsHeaderToolbar';
import { DetailsTable } from './DetailsTable';
const Loading = lazy(() => import('routes/state/loading/Loading'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface DetailsOwnProps {
  dateRange?: string;
  groupBy?: string;
  sourceOfSpend?: string;
}

interface DetailsStateProps {
  consumptionDate?: Date;
  contractLineStartDate?: Date;
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
    consumptionDate,
    contractLineStartDate,
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

  const getFilterToolbar = (isDisabled: boolean) => {
    return (
      <DetailsFilterToolbar
        groupBy={groupBy}
        isDisabled={isDisabled}
        isExportDisabled={isDisabled}
        onExportClicked={handleOnExportModalOpen}
        onFilterAdded={handleOnFilterAdded}
        onFilterRemoved={handleOnFilterRemoved}
        pagination={getPagination(isDisabled)}
        query={query}
      />
    );
  };

  const getComputedItems = () => {
    return getUnsortedComputedReportItems({
      report,
      idKey: groupBy,
    });
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

  const getPagination = (isDisabled = false, isBottom = false) => {
    const count = report && report.meta && report.meta.count !== undefined ? report.meta.count : 0;
    const limit =
      report && report.meta && report.meta.filter && report.meta.filter.limit ? report.meta.filter.limit : 0;
    const offset =
      report && report.meta && report.meta.filter && report.meta.filter.offset ? report.meta.filter.offset : 0;
    const page = limit > 0 ? offset / limit + 1 : 1;

    return (
      <Pagination
        isCompact={!isBottom}
        isDisabled={isDisabled}
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

  const getTable = () => (
    <DetailsTable
      endDate={endDate}
      groupBy={groupBy}
      isLoading={!reportFetchStatus || reportFetchStatus === FetchStatus.inProgress}
      onSort={handleOnSort}
      query={query}
      report={report}
      secondaryGroupBy={secondaryGroupBy}
      sourceOfSpend={sourceOfSpend}
      startDate={startDate}
    />
  );

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
        groupBy: {
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
    newQuery.orderBy = {};
    newQuery.orderBy[sortType] = isSortAscending ? 'asc' : 'desc';

    if (date) {
      newQuery.orderBy.date = date;
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

  const computedItems = getComputedItems();
  const isDisabled = computedItems.length === 0;

  if (reportError) {
    const title = intl.formatMessage(messages.detailsTitle);
    return <NotAvailable title={title} />;
  }
  return (
    <React.Fragment>
      <PageHeading>
        <DetailsHeaderToolbar
          consumptionDate={consumptionDate}
          contractLineStartDate={contractLineStartDate}
          dateRange={dateRange}
          endDate={endDate}
          groupBy={groupBy}
          onDateRangeSelected={handleOnDateRangeSelected}
          onGroupBySelected={handleOnGroupBySelected}
          onSecondaryGroupBySelected={handleOnSecondaryGroupBySelected}
          onSourceOfSpendSelected={handleOnSourceOfSpendSelected}
          secondaryGroupBy={secondaryGroupBy}
          sourceOfSpend={sourceOfSpend}
          startDate={startDate}
        />
      </PageHeading>
      <PageSection>
        <Suspense
          fallback={
            <Bullseye>
              <Spinner size="lg" />
            </Bullseye>
          }
        >
          {getFilterToolbar(isDisabled)}
          {getExportModal()}
          {!reportFetchStatus || reportFetchStatus === FetchStatus.inProgress ? (
            <Loading />
          ) : (
            <React.Fragment>
              <div>{getTable()}</div>
              <div style={styles.pagination}>{getPagination(isDisabled, true)}</div>
            </React.Fragment>
          )}
        </Suspense>
      </PageSection>
    </React.Fragment>
  );
};

const useDefaultDateRange = () => {
  const queryFromRoute = useQueryFromRoute();
  return getDateRangeType(queryFromRoute.dateRange ? queryFromRoute.dateRange : DateRangeType.contractedYtd);
};

const useDefaultGroupBy = () => {
  const queryFromRoute = useQueryFromRoute();
  const groupBy = getIdKeyForGroupBy(queryFromRoute.groupBy);
  return getGroupByType(groupBy ? groupBy : GroupByType.product);
};

const useDefaultSecondaryGroupBy = () => {
  const queryFromRoute = useQueryFromRoute();
  const secondaryGroupBy = getIdKeyForGroupBy(queryFromRoute.secondaryGroupBy);
  return getGroupByType(secondaryGroupBy ? secondaryGroupBy : GroupByType.none);
};

const useDefaultSourceOfSpend = () => {
  const queryFromRoute = useQueryFromRoute();
  return getSourceOfSpendType(queryFromRoute.sourceOfSpend ? queryFromRoute.sourceOfSpend : SourceOfSpendType.all);
};

const useQueryFromRoute = () => {
  const location = useLocation();
  return parseQuery<Query>(location.search);
};

const useMapToProps = ({ dateRange, groupBy, sourceOfSpend }: DetailsOwnProps): DetailsStateProps => {
  const { summary } = useAccountSummaryMapToProps();
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const contractLineStartDate =
    values && values.contract_line_start_date ? new Date(values.contract_line_start_date + 'T00:00:00') : undefined;
  const contractStartDate =
    values && values.contract_start_date ? new Date(values.contract_start_date + 'T00:00:00') : undefined;
  const consumptionDate =
    values && values.consumption_date ? new Date(values.consumption_date + 'T00:00:00') : undefined;

  const { endDate, query, report, reportError, reportFetchStatus, reportQueryString, startDate } =
    useDetailsMapDateRangeToProps({
      consumptionDate,
      contractLineStartDate,
      contractStartDate,
      dateRange,
      groupBy,
      sourceOfSpend,
    });

  return {
    consumptionDate,
    contractLineStartDate,
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
