import { UserAccess } from 'api/userAccess';
import { AxiosError } from 'axios';
import { FetchStatus } from 'store/common';
import { resetState } from 'store/ui/uiActions';
import { ActionType, getType } from 'typesafe-actions';

import { fetchUserAccessFailure, fetchUserAccessRequest, fetchUserAccessSuccess } from './userAccessActions';

export type UserAccessState = Readonly<{
  byId: Map<string, UserAccess>;
  errors: Map<string, AxiosError>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: UserAccessState = {
  byId: new Map(),
  errors: new Map(),
  fetchStatus: new Map(),
};

export type UserAccessAction = ActionType<
  typeof fetchUserAccessFailure | typeof fetchUserAccessRequest | typeof fetchUserAccessSuccess | typeof resetState
>;

export function userAccessReducer(state = defaultState, action: UserAccessAction): UserAccessState {
  switch (action.type) {
    case getType(resetState):
      state = defaultState;
      return state;

    case getType(fetchUserAccessRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.payload.reportId, FetchStatus.inProgress),
      };
    case getType(fetchUserAccessSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.meta.reportId, FetchStatus.complete),
        byId: new Map(state.byId).set(action.meta.reportId, {
          ...action.payload,
        }),
        errors: new Map(state.errors).set(action.meta.reportId, null),
      };
    case getType(fetchUserAccessFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.meta.reportId, FetchStatus.complete),
        errors: new Map(state.errors).set(action.meta.reportId, action.payload),
      };
    default:
      return state;
  }
}
