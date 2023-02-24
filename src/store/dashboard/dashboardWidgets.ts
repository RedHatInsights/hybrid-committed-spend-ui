import { ReportPathsType, ReportType } from 'api/reports/report';
import messages from 'locales/messages';
import { lazy } from 'react';
import { routes } from 'Routes';
import { formatPath } from 'utils/paths';

import type { DashboardWidget } from './dashboardCommon';
import { DashboardSize } from './dashboardCommon';

const ActualSpend = lazy(() => import('routes/overview/components/actual-spend/ActualSpend'));
const ActualSpendBreakdown = lazy(
  () => import('routes/overview/components/actual-spend-breakdown/ActualSpendBreakdown')
);
const CommittedSpend = lazy(() => import('routes/overview/components/committed-spend/CommittedSpend'));
const CommittedSpendTrend = lazy(
  () => import('routes/overview/components/committed-spend-trend-poc/CommittedSpendTrend')
);

let currrentId = 0;
const getId = () => currrentId++;

export const actualSpendWidget: DashboardWidget = {
  component: ActualSpend,
  chartName: 'actualSpend',
  id: getId(),
  title: messages.dashboardActualSpendTitle,
  reportPathsType: ReportPathsType.accountSummary,
  reportType: ReportType.billing,
  size: DashboardSize.half,
};

export const actualSpendBreakdownWidget: DashboardWidget = {
  component: ActualSpendBreakdown,
  chartName: 'actualSpendBreakdown',
  id: getId(),
  title: messages.dashboardActualSpendBreakdownTitle,
  reportPathsType: ReportPathsType.actualSpendBreakdown,
  reportType: ReportType.billing,
  viewAllPath: formatPath(routes.details.path),
};

export const committedSpendWidget: DashboardWidget = {
  component: CommittedSpend,
  chartName: 'committedSpend',
  id: getId(),
  title: messages.dashboardCommitmentSpendTitle,
  reportPathsType: ReportPathsType.accountSummary,
  reportType: ReportType.billing,
  size: DashboardSize.half,
};

export const committedSpendTrendWidget: DashboardWidget = {
  component: CommittedSpendTrend,
  chartName: 'committedSpendTrend',
  id: getId(),
  title: messages.dashboardCommitmentSpendTrendTitle,
  reportPathsType: ReportPathsType.details,
  reportType: ReportType.billing,
  viewAllPath: formatPath(routes.details.path),
};
