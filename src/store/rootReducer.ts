import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { combineReducers } from 'redux';
import { reportReducer, reportStateKey } from 'store/reports';
import { userAccessReducer, userAccessStateKey } from 'store/userAccess';
import { StateType } from 'typesafe-actions';

import { featureFlagsReducer, featureFlagsStateKey } from './featureFlags';
export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [featureFlagsStateKey]: featureFlagsReducer,
  [reportStateKey]: reportReducer,
  [userAccessStateKey]: userAccessReducer,
  notifications: notificationsReducer,
});
