import { MessageDescriptor } from '@formatjs/intl/src/types';
import { BillingFilters, BillingQuery, getBillingQuery } from 'api/queries';
import { ReportPathsType, ReportType } from 'api/reports';
import React from 'react';

export const dashboardStateKey = 'dashboard';
export const dashboardDefaultFilters: BillingFilters = {
  time_scope_units: 'month',
  time_scope_value: -1,
  resolution: 'daily',
};

// eslint-disable-next-line no-shadow
export const enum DashboardSize {
  full = 'full',
  half = 'half',
}

// eslint-disable-next-line no-shadow
export const enum DashboardType {
  actualSpend = 'actualSpend',
  actualSpendBreakdown = 'actualSpendBreakdown',
  committedSpend = 'committedSpend',
  committedSpendTrend = 'committedSpendTrend',
}

export interface DashboardWidget {
  component: React.ReactNode;
  filter?: any;
  id: number;
  reportPathsType?: ReportPathsType;
  reportType?: ReportType;
  size?: DashboardSize;
  title?: MessageDescriptor;
  type: DashboardType;
  viewAllPath?: string;
}

export function getQueryForWidget(filter: BillingFilters = dashboardDefaultFilters, props?) {
  const query: BillingQuery = {
    filter,
    ...(props ? props : {}),
  };
  return getBillingQuery(query);
}
