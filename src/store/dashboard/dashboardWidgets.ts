import { ReportPathsType, ReportType } from 'api/reports/report';
import messages from 'locales/messages';
import { lazy } from 'react';
import { routes } from 'Routes';
import { formatPath } from 'utils/paths';

import type { DashboardWidget } from './dashboardCommon';
import { DashboardSize } from './dashboardCommon';

const ActualSpend = lazy(() => import('routes/overview/components/actual-spend'));
const ActualSpendBreakdown = lazy(() => import('routes/overview/components/actual-spend-breakdown'));
const CommittedSpend = lazy(() => import('routes/overview/components/committed-spend'));
const CommittedSpendTrend = lazy(() => import('routes/overview/components/committed-spend-trend'));

let currrentId = 0;
const getId = () => currrentId++;

export const actualSpendWidget: DashboardWidget = {
  component: ActualSpend,
  chartName: 'actualSpend',
  id: getId(),
  title: messages.dashboardActualSpendTitle,
  reportPathsType: ReportPathsType.accountSummary,
  reportType: ReportType.details,
  size: DashboardSize.half,
};

export const actualSpendBreakdownWidget: DashboardWidget = {
  component: ActualSpendBreakdown,
  chartName: 'actualSpendBreakdown',
  id: getId(),
  title: messages.dashboardActualSpendBreakdownTitle,
  reportPathsType: ReportPathsType.details,
  reportType: ReportType.actualSpend,
  viewAllPath: formatPath(routes.details.path),
};

export const committedSpendWidget: DashboardWidget = {
  component: CommittedSpend,
  chartName: 'committedSpend',
  id: getId(),
  title: messages.dashboardCommitmentSpendTitle,
  reportPathsType: ReportPathsType.accountSummary,
  reportType: ReportType.details,
  size: DashboardSize.half,
};

export const committedSpendTrendWidget: DashboardWidget = {
  component: CommittedSpendTrend,
  chartName: 'committedSpendTrend',
  id: getId(),
  title: messages.dashboardCommitmentSpendTrendTitle,
  reportPathsType: ReportPathsType.details,
  reportType: ReportType.committedSpend,
  viewAllPath: formatPath(routes.details.path),
};
