import './ActualSpendBreakdown.scss';

import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EmptyValueState } from 'routes/components/state';
import { NotAvailable } from 'routes/state';
import { ReportSummary } from 'routes/views/Overview/components/ReportSummary';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';
import { formatCurrency } from 'utils/format';

interface ActualSpendBreakdownOwnProps {
  widgetId: number;
}

interface ActualSpendBreakdownStateProps {
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
  widget: DashboardWidget;
}

interface ActualSpendBreakdownDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

export type ActualSpendBreakdownProps = ActualSpendBreakdownStateProps &
  ActualSpendBreakdownOwnProps &
  ActualSpendBreakdownDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const ActualSpendBreakdownBase: React.SFC<ActualSpendBreakdownProps> = ({
  fetchReport,
  intl,
  queryString,
  report,
  reportError,
  reportFetchStatus,
  widget,
}) => {
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, queryString);
  }, [queryString]);

  let value: string | React.ReactNode = <EmptyValueState />;

  const hasTotal = report && report.meta && report.meta.total;
  const hasCost = hasTotal && report.meta.total.cost && report.meta.total.cost.total;

  if (hasTotal) {
    value = formatCurrency(
      hasCost ? report.meta.total.cost.total.value : 0,
      hasCost ? report.meta.total.cost.total.units : 'USD',
      {}
    );
  }

  // Todo: show errors
  const isTest = true;
  return (
    <ReportSummary fetchStatus={reportFetchStatus} title={widget.title}>
      {!isTest && reportError ? (
        <NotAvailable />
      ) : (
        <>
          <div>August 2022 - February 2023</div>
          <div className="valueContainer">
            <div className={`value`}>{value}</div>
            <div>{intl.formatMessage(messages.overLastMonth)}</div>
          </div>
        </>
      )}
    </ReportSummary>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<ActualSpendBreakdownOwnProps, ActualSpendBreakdownStateProps>(
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

const mapDispatchToProps: ActualSpendBreakdownDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const ActualSpendBreakdown = withRouter(ActualSpendBreakdownBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActualSpendBreakdown));
