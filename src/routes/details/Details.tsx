import { Bullseye, Pagination, PaginationVariant, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import type { Query } from 'api/queries';
import { ReportPathsType } from 'api/reports/report';
import messages from 'locales/messages';
import React, { lazy, Suspense, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { ExportModal } from 'routes/components/export';
import { PageHeading } from 'routes/components/page-heading';
import { DateRangeType } from 'routes/utils/dateRange';
import {
  getRouteForQuery,
  handleOnFilterAdded,
  handleOnFilterRemoved,
  handleOnPerPageSelect,
  handleOnSetPage,
  handleOnSort,
} from 'routes/utils/history';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportSelectors } from 'store/reports';
import { useStateCallback } from 'utils/hooks';

import { detailsMapToProps } from './api';
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
}

interface DetailsStateProps {
  hasReportErrors: boolean;
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

const Details: React.FC<DetailsProps> = ({ history, intl }) => {
  const [dateRange, setDateRange] = useState(getDateRangeType(DateRangeType.contractedYtd));
  const [groupBy, setGroupBy] = useStateCallback(getGroupByType(GroupByType.product));
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [secondaryGroupBy, setSecondaryGroupBy] = useState(GroupByType.none);
  const [sourcesOfSpend, setSourcesOfSpend] = useState(getSourcesOfSpendType(SourcesOfSpendType.all));

  const { query, report, reportFetchStatus } = detailsMapToProps({ dateRange, groupBy });
  const { hasReportErrors } = mapToProps();

  const getFilterToolbar = () => {
    return (
      <DetailsFilterToolbar
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
        reportPathsType={ReportPathsType.accountSummary}
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
        secondaryGroupBy={secondaryGroupBy}
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
      <PageHeading>
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

const mapToProps = (): DetailsStateProps => {
  const hasReportErrors = useSelector((state: RootState) => reportSelectors.selectHasErrors(state));

  return {
    hasReportErrors,
  };
};

export default injectIntl(withRouter(Details));
