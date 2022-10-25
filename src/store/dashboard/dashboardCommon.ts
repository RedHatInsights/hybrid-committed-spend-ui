import type { MessageDescriptor } from '@formatjs/intl/src/types';
import type { BillingFilters, BillingQuery } from 'api/queries';
import { getBillingQuery } from 'api/queries';
import type { ReportPathsType, ReportType } from 'api/reports';
import type React from 'react';

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

export interface DashboardWidget {
  component: React.ReactNode;
  chartName: string;
  filter?: any;
  id: number;
  reportPathsType?: ReportPathsType;
  reportType?: ReportType;
  size?: DashboardSize;
  title?: MessageDescriptor;
  viewAllPath?: string;
}

export function getQueryForWidget(filter: BillingFilters = dashboardDefaultFilters, props?) {
  const query: BillingQuery = {
    filter,
    ...(props ? props : {}),
  };
  return getBillingQuery(query);
}
