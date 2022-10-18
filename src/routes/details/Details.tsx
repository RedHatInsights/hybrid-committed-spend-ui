import { Bullseye, Pagination, PaginationVariant, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { getQuery, parseQuery, Query } from 'api/queries';
import { Report, ReportPathsType, ReportType } from 'api/reports';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { lazy, Suspense, useMemo, useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExportModal } from 'routes/components/export';
import {
  getRouteForQuery,
  handleOnFilterAdded,
  handleOnFilterRemoved,
  handleOnPerPageSelect,
  handleOnSetPage,
} from 'routes/utils/history';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { getIdKeyForGroupBy } from 'utils/computedReport/getComputedDetailsReportItems';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { useStateCallback } from 'utils/hooks';

import { styles } from './Details.styles';
import { DetailsHeader } from './DetailsHeader';
import { DetailsHeaderToolbar } from './DetailsHeaderToolbar';
import { FilterToolbar } from './FilterToolbar';
import {
  DateRangeType,
  getDateRangeType,
  getGroupByType,
  getSourcesOfSpendType,
  GroupByType,
  SourcesOfSpendType,
} from './utils';

const Loading = lazy(() => import('routes/state/loading/Loading'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface DetailsOwnProps {
  groupBy?: string;
}

interface DetailsStateProps {
  hasReportErrors: boolean;
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
}

type DetailsProps = DetailsOwnProps & RouteComponentProps<void> & WrappedComponentProps;

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

const reportPathsType = ReportPathsType.billing;
const reportType = ReportType.cost;

const Details: React.FC<DetailsProps> = ({ history, intl }) => {
  const [dateRange, setDateRange] = useState(getDateRangeType(DateRangeType.contractedYtd));
  const [groupBy, setGroupBy] = useStateCallback(getGroupByType(GroupByType.product));
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [secondaryGroupBy, setSecondaryGroupBy] = useState(GroupByType.none);
  const [sourcesOfSpend, setSourcesOfSpend] = useState(getSourcesOfSpendType(SourcesOfSpendType.all));

  const { hasReportErrors, query, report, reportFetchStatus } = mapToProps({ groupBy });

  const getComputedItems = () => {
    const computedItems = getUnsortedComputedReportItems({
      report,
      idKey: getIdKeyForGroupBy(query.group_by),
      isDateMap: false, // Don't use isDateMap here, so we can use a flattened data structure with row selection
    });
    return computedItems;
  };

  const getFilterToolbar = () => {
    const computedItems = getComputedItems();

    return (
      <FilterToolbar
        groupBy={groupBy}
        isExportDisabled={computedItems.length !== 0}
        onExportClicked={handleOnExportModalOpen}
        onFilterAdded={filter => handleOnFilterAdded(history, query, filter)}
        onFilterRemoved={filter => handleOnFilterRemoved(history, query, filter)}
        pagination={getPagination()}
        query={query}
      />
    );
  };

  const getExportModal = () => {
    const groupById = getGroupByType(query.group_by);

    return (
      <ExportModal
        groupBy={groupById}
        isOpen={isExportModalOpen}
        onClose={handleOnExportModalClose}
        query={query}
        reportPathsType={ReportPathsType.billing}
      />
    );
  };

  const getPagination = (isBottom: boolean = false) => {
    const count = report && report.meta && report.meta.count !== undefined ? report.meta.count : 0;
    const limit =
      report && report.meta && report.meta.filter && report.meta.filter.limit ? report.meta.filter.limit : 0;
    const offset =
      report && report.meta && report.meta.filter && report.meta.filter.offset ? report.meta.filter.offset : 0;
    const page = offset > 0 ? offset / limit + 1 : 0;

    return (
      <Pagination
        isCompact={!isBottom}
        itemCount={count}
        onPerPageSelect={(event, perPage) => handleOnPerPageSelect(history, query, perPage)}
        onSetPage={(event, pageNumber) => handleOnSetPage(history, query, report, pageNumber)}
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

  const handleOnDateRangeSelected = value => {
    setDateRange(value);
  };

  const handleOnExportModalClose = (isOpen: boolean) => {
    setIsExportModalOpen(isOpen);
  };

  const handleOnExportModalOpen = () => {
    setIsExportModalOpen(true);
  };

  const handleOnGroupBySelected = value => {
    setGroupBy(value, () => {
      const groupByKey: keyof Query['group_by'] = value as any;
      const newQuery = {
        ...JSON.parse(JSON.stringify(query)),
        // filter_by: undefined, // Preserve filter -- see https://issues.redhat.com/browse/COST-1090
        group_by: {
          [groupByKey]: '*',
        },
        order_by: { cost: 'desc' },
      };
      history.replace(getRouteForQuery(history, newQuery, true));
    });
  };

  const handleOnSecondaryGroupBySelected = value => {
    setSecondaryGroupBy(value);
  };

  const handleOnSourcesOfSpendSelected = value => {
    setSourcesOfSpend(value);
  };

  // Todo: Remove when APIs are available
  const isTest = true;

  if (hasReportErrors && !isTest) {
    const title = intl.formatMessage(messages.detailsTitle);
    return <NotAvailable title={title} />;
  }

  return (
    <React.Fragment>
      <DetailsHeader>
        <DetailsHeaderToolbar
          dateRange={dateRange}
          groupBy={groupBy}
          onDateRangeSelected={handleOnDateRangeSelected}
          onGroupBySelected={handleOnGroupBySelected}
          onSecondaryGroupBySelected={handleOnSecondaryGroupBySelected}
          onSourcesOfSpendSelected={handleOnSourcesOfSpendSelected}
          secondaryGroupBy={secondaryGroupBy}
          sourcesOfSpend={sourcesOfSpend}
        />
      </DetailsHeader>
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
              <div>Table placeholder</div>
              <div style={styles.pagination}>{getPagination(true)}</div>
            </React.Fragment>
          )}
        </Suspense>
      </Main>
    </React.Fragment>
  );
};

const mapToProps = ({ groupBy }: DetailsOwnProps): DetailsStateProps => {
  const queryFromRoute = parseQuery<Query>(location.search);
  const query = {
    filter: {
      limit: baseQuery.filter.limit,
      offset: baseQuery.filter.offset,
    },
    filter_by: queryFromRoute.filter_by || baseQuery.filter_by,
    group_by: groupBy || baseQuery.group_by,
  };
  const queryString = getQuery(query);

  const hasReportErrors = useSelector((state: RootState) => reportSelectors.selectHasErrors(state));

  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString)
    return {
      meta: {
        total: {
          value: 0,
          units: 'USD',
        },
      },
    } as any;
  });
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, queryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, reportPathsType, reportType, queryString)
  );

  useMemo(() => {
    // Todo: Enable via dispatch
    reportActions.fetchReport(reportPathsType, reportType, queryString);
  }, [queryString]);

  return {
    hasReportErrors,
    query,
    queryString,
    report,
    reportFetchStatus,
    reportError,
  };
};

export default injectIntl(withRouter(Details));
