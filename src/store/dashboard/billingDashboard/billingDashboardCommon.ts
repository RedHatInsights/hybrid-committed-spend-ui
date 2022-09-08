import { BillingFilters, BillingQuery, getBillingQuery } from 'api/queries';
import { DashboardWidget } from 'store/dashboard/common';

export const billingDashboardStateKey = 'billingDashboard';
export const billingDashboardDefaultFilters: BillingFilters = {
  time_scope_units: 'month',
  time_scope_value: -1,
  resolution: 'daily',
};

// eslint-disable-next-line no-shadow
export const enum BillingCardType {
  actualSpend = 'actualSpend',
  actualSpendBreakdown = 'actualSpendBreakdown',
  committedSpend = 'committedSpend',
  committedSpendTrend = 'committedSpendTrend',
}

export interface BillingDashboardWidget extends DashboardWidget<BillingCardType> {}

export function getQueryForWidget(filter: BillingFilters = billingDashboardDefaultFilters, props?) {
  const query: BillingQuery = {
    filter,
    ...(props ? props : {}),
  };
  return getBillingQuery(query);
}

export function getQueryForWidgetTabs(
  widget: BillingDashboardWidget,
  filter: BillingFilters = billingDashboardDefaultFilters
) {
  const query: BillingQuery = {
    filter,
    // group_by: getGroupByForTab(widget.currentTab),
  };
  return getBillingQuery(query);
}
