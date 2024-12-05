import { notificationsReducer } from '@ausuliv/frontend-components-notifications/redux';
import { combineReducers } from 'redux';
import { dashboardReducer, dashboardStateKey } from 'store/dashboard';
import { exportReducer, exportStateKey } from 'store/export';
import { filterReducer, filterStateKey } from 'store/filters';
import { optionReducer, optionStateKey } from 'store/options';
import { reportReducer, reportStateKey } from 'store/reports';
import { userAccessReducer, userAccessStateKey } from 'store/user-access';
import type { StateType } from 'typesafe-actions';

import { featureToggleReducer, featureToggleStateKey } from './feature-toggle';
export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [dashboardStateKey]: dashboardReducer,
  [exportStateKey]: exportReducer,
  [featureToggleStateKey]: featureToggleReducer,
  [filterStateKey]: filterReducer,
  [optionStateKey]: optionReducer,
  [reportStateKey]: reportReducer,
  [userAccessStateKey]: userAccessReducer,
  notifications: notificationsReducer,
});
