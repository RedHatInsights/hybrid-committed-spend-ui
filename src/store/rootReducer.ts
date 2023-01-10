import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { combineReducers } from 'redux';
import { dashboardReducer, dashboardStateKey } from 'store/dashboard';
import { exportReducer, exportStateKey } from 'store/export';
import { filterReducer, filterStateKey } from 'store/filters';
import { reportReducer, reportStateKey } from 'store/reports';
import { userAccessReducer, userAccessStateKey } from 'store/user-access';
import type { StateType } from 'typesafe-actions';

import { featureFlagsReducer, featureFlagsStateKey } from './feature-flags';
export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [dashboardStateKey]: dashboardReducer,
  [exportStateKey]: exportReducer,
  [featureFlagsStateKey]: featureFlagsReducer,
  [filterStateKey]: filterReducer,
  [reportStateKey]: reportReducer,
  [userAccessStateKey]: userAccessReducer,
  notifications: notificationsReducer,
});
