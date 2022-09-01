import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { combineReducers } from 'redux';
import { reportReducer, reportStateKey } from 'store/reports';
import { StateType } from 'typesafe-actions';

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [reportStateKey]: reportReducer,
  notifications: notificationsReducer,
});
