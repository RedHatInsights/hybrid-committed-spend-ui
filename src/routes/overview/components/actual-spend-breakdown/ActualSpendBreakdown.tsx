import { getQuery, parseQuery, Query } from 'api/queries/query';
import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { transformReport } from 'routes/components/charts/common/chart-datum-utils';
import { TrendChart } from 'routes/components/charts/trend-chart';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';

import { chartStyles } from './ActualSpendBreakdown.styles';
import { currentData } from './data/currentData';

interface ActualSpendBreakdownOwnProps {
  widgetId: number;
}

interface ActualSpendBreakdownStateProps {
  currentQueryString: string;
  currentReport?: Report;
  currentReportError?: AxiosError;
  currentReportFetchStatus?: FetchStatus;
  query: Query;
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

const ActualSpendBreakdownBase: React.FC<ActualSpendBreakdownProps> = ({
  currentQueryString,
  currentReport,
  currentReportFetchStatus,
  fetchReport,
  intl,
  widget,
}) => {
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, currentQueryString);
  }, [currentQueryString]);

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.viewDetails)}</Link>;
    }
    return null;
  };

  const getChart = () => {
    const current = transformReport({ report: currentReport });

    return <TrendChart adjustContainerHeight currentData={current} height={chartStyles.height} />;
  };

  return (
    <ReportSummary detailsLink={getDetailsLink()} fetchStatus={currentReportFetchStatus} title={widget.title}>
      {getChart()}
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

    const currentQueryString = getQuery(query);
    // const currentReport = reportSelectors.selectReport(
    //   state,
    //   widget.reportPathsType,
    //   widget.reportType,
    //   currentQueryString
    // );
    const currentReport = currentData as any;
    const currentReportError = reportSelectors.selectReportError(
      state,
      widget.reportPathsType,
      widget.reportType,
      currentQueryString
    );
    const currentReportFetchStatus = reportSelectors.selectReportFetchStatus(
      state,
      widget.reportPathsType,
      widget.reportType,
      currentQueryString
    );

    return {
      currentQueryString,
      currentReport,
      currentReportError,
      currentReportFetchStatus,
      query,
      widget,
    };
  }
);

const mapDispatchToProps: ActualSpendBreakdownDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const ActualSpendBreakdown = withRouter(ActualSpendBreakdownBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActualSpendBreakdown));
