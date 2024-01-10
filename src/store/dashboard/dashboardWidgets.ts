import { ReportPathsType, ReportType } from 'api/reports/report';
import messages from 'locales/messages';
import { routes } from 'Routes';

import type { DashboardWidget } from './dashboardCommon';
import { DashboardComponent, DashboardSize } from './dashboardCommon';

let currrentId = 0;
const getId = () => currrentId++;

export const actualSpendWidget: DashboardWidget = {
  component: DashboardComponent.ActualSpend,
  chartName: 'actualSpend',
  id: getId(),
  title: messages.dashboardActualSpendTitle,
  reportPathsType: ReportPathsType.accountSummary,
  reportType: ReportType.details,
  size: DashboardSize.half,
};

export const actualSpendBreakdownWidget: DashboardWidget = {
  component: DashboardComponent.ActualSpendBreakdown,
  chartName: 'actualSpendBreakdown',
  id: getId(),
  title: messages.dashboardActualSpendBreakdownTitle,
  reportPathsType: ReportPathsType.details,
  reportType: ReportType.actualSpend,
  viewAllPath: routes.details.path,
};

export const committedSpendWidget: DashboardWidget = {
  component: DashboardComponent.CommittedSpend,
  chartName: 'committedSpend',
  id: getId(),
  title: messages.dashboardCommitmentSpendTitle,
  reportPathsType: ReportPathsType.accountSummary,
  reportType: ReportType.details,
  size: DashboardSize.half,
};

export const committedSpendTrendWidget: DashboardWidget = {
  component: DashboardComponent.CommittedSpendTrend,
  chartName: 'committedSpendTrend',
  id: getId(),
  title: messages.dashboardCommitmentSpendTrendTitle,
  reportPathsType: ReportPathsType.details,
  reportType: ReportType.committedSpend,
  viewAllPath: routes.details.path,
};
