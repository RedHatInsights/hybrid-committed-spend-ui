import {
  Alert,
  Bullseye,
  Card,
  CardBody,
  PageSection,
  Pagination,
  PaginationVariant,
  Spinner,
} from '@patternfly/react-core';
import type { Query } from 'api/queries';
import { getQueryRoute, parseQuery } from 'api/queries';
import type { Report } from 'api/reports/report';
import { ReportPathsType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import { useIsOverridePermissionsToggleEnabled } from 'components/feature-toggle';
import messages from 'locales/messages';
import React, { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExportModal } from 'routes/components/export';
import { PageHeading } from 'routes/components/page-heading';
import type { SelectWrapperOption } from 'routes/components/selectWrapper';
import {
  getDateRangeType,
  getGroupByType,
  getIdKeyForGroupBy,
  getSourceOfSpendType,
  GroupByType,
  SourceOfSpendType,
} from 'routes/details/types';
import { getAccountSummaryDates, useAccountSummaryMapToProps } from 'routes/utils/accountSummary';
import { DateRangeType } from 'routes/utils/dateRange';
import type { Filter } from 'routes/utils/filter';
import { addFilterToQuery, removeFilterFromQuery } from 'routes/utils/filter';
import { FetchStatus } from 'store/common';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { useStateCallback } from 'utils/hooks';
import { isHcsDataVisibilitySummaryOnly, useUserAccessMapToProps } from 'utils/userAccess';

import { styles } from './Details.styles';
import { DetailsFilterToolbar } from './DetailsFilterToolbar';
import { DetailsHeaderToolbar } from './DetailsHeaderToolbar';
import { DetailsTable } from './DetailsTable';
import { useDetailsMapDateRangeToProps } from './utils';
const Loading = lazy(() => import('routes/state/loading/Loading'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface DetailsOwnProps {
  dateRange?: string;
  groupBy?: string;
  secondaryGroupBy?: string;
  sourceOfSpend?: string;
}

interface DetailsStateProps {
  consumptionDate?: Date;
  contractLineStartDate?: Date;
  endDate?: Date;
  exportQueryString?: string;
  hasReportErrors?: boolean;
  previousContractLineEndDate?: Date;
  previousContractLineStartDate?: Date;
  query?: Query;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
  startDate?: Date;
  summaryError?: AxiosError;
}

type DetailsProps = DetailsOwnProps;

const Details: React.FC<DetailsProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAccess } = useUserAccessMapToProps();
  const [dateRange, setDateRange] = useStateCallback(useDefaultDateRange());
  const [groupBy, setGroupBy] = useStateCallback(useDefaultGroupBy());
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [secondaryGroupBy, setSecondaryGroupBy] = useStateCallback(useDefaultSecondaryGroupBy());
  const [sourceOfSpend, setSourceOfSpend] = useStateCallback(useDefaultSourceOfSpend());
  const isOverridePermissionsToggleEnabled = useIsOverridePermissionsToggleEnabled();
  const intl = useIntl();

  const {
    consumptionDate,
    contractLineStartDate,
    endDate,
    exportQueryString,
    previousContractLineEndDate,
    previousContractLineStartDate,
    query,
    report,
    reportError,
    reportFetchStatus,
    startDate,
    summaryError,
  } = useMapToProps({
    dateRange,
    groupBy,
    secondaryGroupBy,
    sourceOfSpend,
  });

  const getFilterToolbar = (isDisabled: boolean) => {
    return (
      <DetailsFilterToolbar
        endDate={endDate}
        groupBy={groupBy}
        isDisabled={isDisabled}
        isExportDisabled={isDisabled || report?.meta?.count === 0}
        onExportClicked={handleOnExportModalOpen}
        onFilterAdded={handleOnFilterAdded}
        onFilterRemoved={handleOnFilterRemoved}
        pagination={getPagination(isDisabled)}
        query={query}
        startDate={startDate}
      />
    );
  };

  const getComputedItems = () => {
    return getUnsortedComputedReportItems({
      report,
      idKey: groupBy as any,
    });
  };

  const getExportModal = () => {
    return (
      <ExportModal
        endDate={endDate}
        groupBy={groupBy}
        isOpen={isExportModalOpen}
        onClose={handleOnExportModalClose}
        reportPathsType={ReportPathsType.details}
        reportQueryString={exportQueryString}
        secondaryGroupBy={secondaryGroupBy}
        startDate={startDate}
      />
    );
  };

  const getPaginationProps = () => {
    const count = report?.meta?.count !== undefined ? Number(report.meta.count) : 0;
    const limit = report?.meta?.filter?.limit ? Number(report.meta.filter.limit) : 0;
    const offset = report?.meta?.filter?.offset ? Number(report.meta.filter.offset) : 0;
    const page = limit > 0 ? offset / limit + 1 : 1;

    return { count, limit, offset, page };
  };

  const getPagination = (isDisabled = false, isBottom = false) => {
    const { count, limit, page } = getPaginationProps();

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
          paginationAriaLabel: intl.formatMessage(messages.paginationTitle, {
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

  const handleOnDateRangeSelect = (_evt, selection: SelectWrapperOption) => {
    setDateRange(selection.value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        dateRange: selection.value,
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

  const handleOnGroupBySelect = (_evt, selection: SelectWrapperOption) => {
    handleOnFilterRemoved(null); // Clear all
    setSecondaryGroupBy(GroupByType.none);
    setGroupBy(selection.value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        groupBy: {
          [selection.value]: '*',
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

  const handleOnSecondaryGroupBySelect = (_evt, selection: SelectWrapperOption) => {
    setSecondaryGroupBy(selection.value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        secondaryGroupBy: {
          [selection.value]: '*',
        },
      };
      navigate(getRouteForQuery(newQuery, true), { replace: true });
    });
  };

  const handleOnSetPage = (event, pageNumber) => {
    const limit = report?.meta?.filter?.limit ? report.meta.filter.limit : 10;
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

  const handleOnSourceOfSpendSelect = (_evt, selection: SelectWrapperOption) => {
    setSecondaryGroupBy(GroupByType.none);
    setSourceOfSpend(selection.value, () => {
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        sourceOfSpend: selection.value,
        secondaryGroupBy: undefined,
      };
      navigate(getRouteForQuery(newQuery, true), { replace: true });
    });
  };

  const computedItems = getComputedItems();
  const isDisabled = computedItems.length === 0;

  if ((reportError || summaryError) && !isOverridePermissionsToggleEnabled) {
    const title = intl.formatMessage(messages.detailsTitle);
    return <NotAvailable title={title} />;
  }
  return (
    <React.Fragment>
      <PageSection style={styles.headerContainer}>
        <PageHeading>
          {isHcsDataVisibilitySummaryOnly(userAccess) && (
            <div style={styles.alertContainer}>
              <Alert isInline variant="info" title={intl.formatMessage(messages.breakdownAlertTitle)}>
                <p>{intl.formatMessage(messages.breakdownAlertDesc)}</p>
              </Alert>
            </div>
          )}
          <DetailsHeaderToolbar
            consumptionDate={consumptionDate}
            contractLineStartDate={contractLineStartDate}
            dateRange={dateRange}
            endDate={endDate}
            groupBy={groupBy}
            onDateRangeSelect={handleOnDateRangeSelect}
            onGroupBySelect={handleOnGroupBySelect}
            onSecondaryGroupBySelect={handleOnSecondaryGroupBySelect}
            onSourceOfSpendSelect={handleOnSourceOfSpendSelect}
            previousContractLineEndDate={previousContractLineEndDate}
            previousContractLineStartDate={previousContractLineStartDate}
            secondaryGroupBy={secondaryGroupBy}
            sourceOfSpend={sourceOfSpend}
            startDate={startDate}
          />
        </PageHeading>
      </PageSection>
      <PageSection>
        <Suspense
          fallback={
            <Bullseye>
              <Spinner size="lg" />
            </Bullseye>
          }
        >
          <Card>
            <CardBody>
              {getFilterToolbar(isDisabled)}
              {getExportModal()}
              {!reportFetchStatus || reportFetchStatus === FetchStatus.inProgress ? (
                <Loading />
              ) : (
                <React.Fragment>
                  {getTable()}
                  <div style={styles.pagination}>{getPagination(isDisabled, true)}</div>
                </React.Fragment>
              )}
            </CardBody>
          </Card>
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

const useMapToProps = ({ dateRange, groupBy, secondaryGroupBy, sourceOfSpend }: DetailsOwnProps): DetailsStateProps => {
  const { summary, summaryError } = useAccountSummaryMapToProps();
  const {
    consumptionDate,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
  } = getAccountSummaryDates(summary);

  const { endDate, exportQueryString, query, report, reportError, reportFetchStatus, reportQueryString, startDate } =
    useDetailsMapDateRangeToProps({
      consumptionDate,
      contractLineEndDate,
      contractLineStartDate,
      dateRange,
      groupBy,
      previousContractLineEndDate,
      previousContractLineStartDate,
      secondaryGroupBy,
      sourceOfSpend,
    });

  return {
    consumptionDate,
    contractLineStartDate,
    endDate,
    exportQueryString,
    previousContractLineEndDate,
    previousContractLineStartDate,
    query,
    report,
    reportError,
    reportFetchStatus,
    reportQueryString,
    startDate,
    summaryError,
  };
};

export default Details;
