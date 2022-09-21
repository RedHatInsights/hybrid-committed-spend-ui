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
import { CostChart } from 'routes/components/charts/cost-chart';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';

import { chartStyles } from './CommittedSpendTrend.styles';
import { currentData } from './data/currentData';
import { previousData } from './data/previousData';
import { thresholdData } from './data/thresholdData';

interface CommittedSpendTrendOwnProps {
  widgetId: number;
}

interface CommittedSpendTrendStateProps {
  currentQueryString: string;
  currentReport?: Report;
  currentReportError?: AxiosError;
  currentReportFetchStatus?: FetchStatus;
  previousQueryString: string;
  previousReport?: Report;
  previousReportError?: AxiosError;
  previousReportFetchStatus?: FetchStatus;
  query: Query;
  thresholdReport?: Report;
  widget: DashboardWidget;
}

interface CommittedSpendTrendDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

export type CommittedSpendTrendProps = CommittedSpendTrendStateProps &
  CommittedSpendTrendOwnProps &
  CommittedSpendTrendDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendTrendBase: React.FC<CommittedSpendTrendProps> = ({
  currentQueryString,
  currentReport,
  currentReportFetchStatus,
  fetchReport,
  intl,
  previousQueryString,
  previousReport,
  previousReportFetchStatus,
  thresholdReport,
  widget,
}) => {
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, currentQueryString);
  }, [currentQueryString]);
  useMemo(() => {
    fetchReport(widget.reportPathsType, widget.reportType, previousQueryString);
  }, [previousQueryString]);

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
    const previous = transformReport({ report: previousReport, offset: 1 });
    const threshold = transformReport({ report: thresholdReport });

    return (
      <CostChart
        adjustContainerHeight
        currentData={current}
        height={chartStyles.height}
        previousData={previous}
        thresholdData={threshold}
      />
    );
  };

  return (
    <ReportSummary
      detailsLink={getDetailsLink()}
      fetchStatus={[currentReportFetchStatus, previousReportFetchStatus]}
      title={widget.title}
    >
      {getChart()}
    </ReportSummary>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<CommittedSpendTrendOwnProps, CommittedSpendTrendStateProps>(
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

    // Current report
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

    // Previous report
    const previousQueryString = getQuery(query);
    // const previousReport = reportSelectors.selectReport(
    //   state,
    //   widget.reportPathsType,
    //   widget.reportType,
    //   previousQueryString
    // );
    const previousReport = previousData as any;
    const previousReportError = reportSelectors.selectReportError(
      state,
      widget.reportPathsType,
      widget.reportType,
      previousQueryString
    );
    const previousReportFetchStatus = reportSelectors.selectReportFetchStatus(
      state,
      widget.reportPathsType,
      widget.reportType,
      previousQueryString
    );

    return {
      currentQueryString,
      currentReport,
      currentReportError,
      currentReportFetchStatus,
      previousQueryString,
      previousReport,
      previousReportError,
      previousReportFetchStatus,
      query,
      thresholdReport: thresholdData as any,
      widget,
    };
  }
);

const mapDispatchToProps: CommittedSpendTrendDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const CommittedSpendTrend = withRouter(CommittedSpendTrendBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CommittedSpendTrend));
