import { ReportPathsType, ReportType } from 'api/reports/report';
import messages from 'locales/messages';
import { lazy } from 'react';

import { DashboardType, DashboardWidget } from './dashboardCommon';

const ActualSpend = lazy(() => import('routes/overview/components/actual-spend/ActualSpend'));
const CommittedSpend = lazy(() => import('routes/overview/components/committed-spend/CommittedSpend'));

let currrentId = 0;
const getId = () => currrentId++;

export const actualSpendWidget: DashboardWidget = {
  component: ActualSpend,
  id: getId(),
  title: messages.dashboardActualSpendTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  type: DashboardType.actualSpend,
};

export const committedSpendWidget: DashboardWidget = {
  component: CommittedSpend,
  id: getId(),
  title: messages.dashboardCommitmentBalanceTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  type: DashboardType.committedSpend,
};
