import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  DashboardWidgetBase,
  DashboardWidgetOwnProps,
  DashboardWidgetStateProps,
} from 'routes/views/Overview/components/Dashboard';
import { createMapStateToProps } from 'store/common';
import { billingDashboardSelectors } from 'store/dashboard/billingDashboard';
import { reportSelectors } from 'store/reports';

interface BillingDashboardWidgetDispatchProps {
  // TBD...
}

const mapStateToProps = createMapStateToProps<DashboardWidgetOwnProps, DashboardWidgetStateProps>(
  (state, { widgetId }) => {
    const widget = billingDashboardSelectors.selectWidget(state, widgetId);
    const queries = billingDashboardSelectors.selectWidgetQueries(state, widgetId);

    return {
      ...widget,
      currentQuery: queries.current,
      currentReport: reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queries.current),
      currentReportError: reportSelectors.selectReportError(
        state,
        widget.reportPathsType,
        widget.reportType,
        queries.current
      ),
      currentReportFetchStatus: reportSelectors.selectReportFetchStatus(
        state,
        widget.reportPathsType,
        widget.reportType,
        queries.current
      ),
      previousQuery: queries.previous,
      previousReport: reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queries.previous),
      previousReportError: reportSelectors.selectReportError(
        state,
        widget.reportPathsType,
        widget.reportType,
        queries.current
      ),
      previousReportFetchStatus: reportSelectors.selectReportFetchStatus(
        state,
        widget.reportPathsType,
        widget.reportType,
        queries.previous
      ),
    };
  }
);

const mapDispatchToProps: BillingDashboardWidgetDispatchProps = {
  // TBD...
};

const BillingDashboardWidget = injectIntl(connect(mapStateToProps, mapDispatchToProps)(DashboardWidgetBase));

export { BillingDashboardWidget };
