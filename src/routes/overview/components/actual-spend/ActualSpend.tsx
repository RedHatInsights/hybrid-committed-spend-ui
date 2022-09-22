import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import { parseISO } from 'date-fns';
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
import { formatCurrency, formatPercentage } from 'utils/format';

import { styles } from './ActualSpend.styles';

interface ActualSpendOwnProps {
  widgetId: number;
}

interface ActualSpendStateProps {
  query: Query;
  queryString: string;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

interface ActualSpendDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

export type ActualSpendProps = ActualSpendStateProps &
  ActualSpendOwnProps &
  ActualSpendDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const ActualSpendBase: React.FC<ActualSpendProps> = ({
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

  let actualSpend: string | React.ReactNode = <EmptyValueState />;
  let dateRange: string | React.ReactNode = <EmptyValueState />;
  let percent: string | React.ReactNode = <EmptyValueState />;

  const isTest = true;
  const hasTotal = report && report.meta && report.meta.total;

  if (isTest || hasTotal) {
    actualSpend = formatCurrency(817945.1, 'USD');
    percent = formatPercentage(10);

    const startDate = new Date(parseISO('2021-08-01T23:59:59z'));
    const endDate = new Date(parseISO('2022-02-01T23:59:59z'));

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <ReportSummary bodyStyle={styles.body} fetchStatus={reportFetchStatus} title={widget.title}>
      <div>{dateRange}</div>
      <div style={styles.valueContainer}>
        <div style={styles.value}>{actualSpend}</div>
        <div>
          <div style={styles.percentContainer}>
            <ArrowUpIcon style={styles.arrowIcon} />
            <span style={styles.percent}>{intl.formatMessage(messages.percent, { value: percent })}</span>
          </div>
          {intl.formatMessage(messages.overLastMonth)}
        </div>
      </div>
    </ReportSummary>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<ActualSpendOwnProps, ActualSpendStateProps>((state, { widgetId }) => {
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
  const reportError = reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, queryString);
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
});

const mapDispatchToProps: ActualSpendDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const ActualSpend = withRouter(ActualSpendBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActualSpend));
