import { ReportPathsType, ReportType } from 'api/reports/report';
import messages from 'locales/messages';

import { BillingCardType, BillingDashboardWidget } from './billingDashboardCommon';

let currrentId = 0;
const getId = () => currrentId++;

export const actualSpendWidget: BillingDashboardWidget = {
  id: getId(),
  title: messages.dashboardActualSpendTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  type: BillingCardType.actualSpend,
};

export const committedSpendWidget: BillingDashboardWidget = {
  id: getId(),
  title: messages.dashboardCommitmentBalanceTitle,
  reportPathsType: ReportPathsType.billing,
  reportType: ReportType.cost,
  type: BillingCardType.committedSpend,
};
