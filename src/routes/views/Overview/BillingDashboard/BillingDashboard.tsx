import { connect } from 'react-redux';
import { DashboardBase } from 'routes/views/Overview/components/Dashboard';
import { createMapStateToProps } from 'store/common';
import { billingDashboardSelectors } from 'store/dashboard/billingDashboard';

import { BillingDashboardWidget } from './BillingDashboardWidget';

type BillingDashboardOwnProps = any;

interface BillingDashboardStateProps {
  DashboardWidget: typeof BillingDashboardWidget;
  widgets: number[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<BillingDashboardOwnProps, BillingDashboardStateProps>((state, props) => {
  return {
    DashboardWidget: BillingDashboardWidget,
    selectWidgets: billingDashboardSelectors.selectWidgets(state),
    widgets: billingDashboardSelectors.selectCurrentWidgets(state),
  };
});

const BillingDashboard = connect(mapStateToProps, {})(DashboardBase);

export default BillingDashboard;
