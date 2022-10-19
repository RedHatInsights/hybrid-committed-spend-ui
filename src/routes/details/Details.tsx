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
import { DateRangeType, getDateRange } from 'routes/utils/dateRange';
import {
  getRouteForQuery,
  handleOnFilterAdded,
  handleOnFilterRemoved,
  handleOnPerPageSelect,
  handleOnSetPage,
  handleOnSort,
} from 'routes/utils/history';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { useStateCallback } from 'utils/hooks';

import { accountData } from './data/accountData';
import { affiliateData } from './data/affiliateData';
import { productData } from './data/productData';
import { sourceData } from './data/sourceData';
import { styles } from './Details.styles';
import { DetailsHeader } from './DetailsHeader';
import { DetailsHeaderToolbar } from './DetailsHeaderToolbar';
import { DetailsTable } from './DetailsTable';
import { FilterToolbar } from './FilterToolbar';
import { getDateRangeType, getGroupByType, getSourcesOfSpendType, GroupByType, SourcesOfSpendType } from './utils';
const Loading = lazy(() => import('routes/state/loading/Loading'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface DetailsOwnProps {
  dateRange?: string;
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

  const { hasReportErrors, query, report, reportFetchStatus } = mapToProps({ dateRange, groupBy });

  const getFilterToolbar = () => {
    return (
      <FilterToolbar
        groupBy={groupBy}
        isExportDisabled={report && report.meta && report.meta.count !== 0}
        onExportClicked={handleOnExportModalOpen}
        onFilterAdded={filter => handleOnFilterAdded(history, query, filter)}
        onFilterRemoved={filter => handleOnFilterRemoved(history, query, filter)}
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
    const page = offset > 0 ? offset / limit + 1 : 1;

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

  const getTable = () => {
    return (
      <DetailsTable
        dateRange={dateRange}
        groupBy={groupBy}
        isLoading={reportFetchStatus === FetchStatus.inProgress}
        onSort={(sortType, isSortAscending, date: string) =>
          handleOnSort(history, query, sortType, isSortAscending, date)
        }
        query={query}
        report={report}
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
              <div>{getTable()}</div>
              <div style={styles.pagination}>{getPagination(true)}</div>
            </React.Fragment>
          )}
        </Suspense>
      </Main>
    </React.Fragment>
  );
};

const mapToProps = ({ dateRange, groupBy = baseQuery.group_by }: DetailsOwnProps): DetailsStateProps => {
  const queryFromRoute = parseQuery<Query>(location.search);
  const { start_date, end_date } = getDateRange(dateRange);

  const query = {
    filter: {
      ...baseQuery.filter,
      ...queryFromRoute.filter,
    },
    filter_by: queryFromRoute.filter_by || baseQuery.filter_by,
    group_by: groupBy,
    order_by: queryFromRoute.order_by,
  };
  const queryString = getQuery({
    ...query,
    dateRange: undefined,
    end_date,
    start_date,
  });

  const hasReportErrors = useSelector((state: RootState) => reportSelectors.selectHasErrors(state));

  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString)

    let result;
    switch (groupBy) {
      case GroupByType.affiliate:
        result = affiliateData;
        break;
      case GroupByType.account:
        result = accountData;
        break;
      case GroupByType.sourceOfSpend:
        result = sourceData;
        break;
      case GroupByType.product:
      default:
        result = productData;
        break;
    }

    const startDate = new Date(start_date + 'T23:59:59z');
    const endDate = new Date(end_date + 'T23:59:59z');
    endDate.setMonth(endDate.getMonth() + 1);

    result.data = result.data.filter(item => {
      const currentDate = new Date(item.date + 'T23:59:59z');
      if (currentDate >= startDate && currentDate <= endDate) {
        return item;
      }
    });

    return result;
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
