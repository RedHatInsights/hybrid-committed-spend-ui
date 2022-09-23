import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EmptyValueState } from 'routes/components/state';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';
import { formatCurrency } from 'utils/format';

import { styles } from './CommittedSpend.styles';

interface CommittedSpendOwnProps {
  widgetId: number;
}

interface CommittedSpendStateProps {
  query: Query;
  queryString: string;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

interface CommittedSpendDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

export type CommittedSpendProps = CommittedSpendStateProps &
  CommittedSpendOwnProps &
  CommittedSpendDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendBase: React.FC<CommittedSpendProps> = ({
  fetchReport,
  intl,
  queryString,
  report,
  reportFetchStatus,
  widget,
}) => {
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, queryString);
  }, [queryString]);

  let balance: string | React.ReactNode = <EmptyValueState />;
  let committedSpend: string | React.ReactNode = <EmptyValueState />;
  let dateRange: string | React.ReactNode = <EmptyValueState />;

  const isTest = true;
  const hasTotal = report && report.meta && report.meta.total;

  if (isTest || hasTotal) {
    balance = formatCurrency(182054.9, 'USD');
    committedSpend = formatCurrency(1000000.0, 'USD');

    const startDate = new Date('2022-09-01T23:59:59z');
    const endDate = new Date('2022-11-01T23:59:59z');

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <ReportSummary bodyStyle={styles.body} fetchStatus={reportFetchStatus} title={widget.title}>
      <div>{dateRange}</div>
      <div style={styles.valueContainer}>
        <div>
          <div style={styles.value}>{balance}</div>
          <div style={styles.committedSpend}>
            <div>{intl.formatMessage(messages.outOf, { value: committedSpend })}</div>
          </div>
        </div>
      </div>
    </ReportSummary>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<CommittedSpendOwnProps, CommittedSpendStateProps>(
  (state, { widgetId }) => {
    const widget = dashboardSelectors.selectWidget(state, widgetId);
    // const queries = dashboardSelectors.selectWidgetQueries(state, widgetId);

    // TBD...
    const queryFromRoute = parseQuery<Query>(location.search);
    const query = {
      filter: {
        ...queryFromRoute.filter,
      },
    };
    const queryString = getQuery(query);
    const report = reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString);
    const reportError = reportSelectors.selectReportError(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );
    const reportFetchStatus = reportSelectors.selectReportFetchStatus(
      state,
      widget.reportPathsType,
      widget.reportType,
      queryString
    );

    return {
      query,
      queryString,
      report,
      reportError,
      reportFetchStatus,
      widget,
    };
  }
);

const mapDispatchToProps: CommittedSpendDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const CommittedSpend = withRouter(CommittedSpendBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CommittedSpend));
