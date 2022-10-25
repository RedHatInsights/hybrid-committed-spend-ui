import type { DashboardWidget } from './dashboardCommon';
import { DashboardSize, dashboardStateKey } from './dashboardCommon';
import { dashboardReducer } from './dashboardReducer';
import * as dashboardSelectors from './dashboardSelectors';

export { dashboardStateKey, dashboardReducer, dashboardSelectors, DashboardSize };
export type { DashboardWidget };
