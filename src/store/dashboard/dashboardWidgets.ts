import { ReportPathsType, ReportType } from 'api/reports/report';
import messages from 'locales/messages';
import { lazy } from 'react';
import { paths } from 'Routes';

import { DashboardSize, DashboardType, DashboardWidget } from './dashboardCommon';

const ActualSpend = lazy(() => import('routes/overview/components/actual-spend/ActualSpend'));
const CommittedSpend = lazy(() => import('routes/overview/components/committed-spend/CommittedSpend'));
const CommittedSpendTrend = lazy(() => import('routes/overview/components/committed-spend-trend/CommittedSpendTrend'));

let currrentId = 0;
const getId = () => currrentId++;

export const actualSpendWidget: DashboardWidget = {
  component: ActualSpend,
  id: getId(),
  title: messages.dashboardActualSpendTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  size: DashboardSize.half,
  type: DashboardType.actualSpend,
};

export const committedSpendWidget: DashboardWidget = {
  component: CommittedSpend,
  id: getId(),
  title: messages.dashboardCommitmentSpendTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  size: DashboardSize.half,
  type: DashboardType.committedSpend,
};

export const committedSpendTrendWidget: DashboardWidget = {
  component: CommittedSpendTrend,
  id: getId(),
  title: messages.dashboardCommitmentSpendTrendTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  type: DashboardType.committedSpendTrend,
  viewAllPath: paths.details,
};
