import type { Option } from 'api/options/option';
import type { AxiosError } from 'axios';
import { FetchStatus } from 'store/common';
import { resetState } from 'store/ui/uiActions';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { fetchOptionFailure, fetchOptionRequest, fetchOptionSuccess } from './optionActions';

export interface CachedOption extends Option {
  timeRequested: number;
}

export type OptionState = Readonly<{
  byId: Map<string, CachedOption>;
  fetchStatus: Map<string, FetchStatus>;
  errors: Map<string, AxiosError>;
}>;

const defaultState: OptionState = {
  byId: new Map(),
  fetchStatus: new Map(),
  errors: new Map(),
};

export type OptionAction = ActionType<
  typeof fetchOptionFailure | typeof fetchOptionRequest | typeof fetchOptionSuccess | typeof resetState
>;

export function optionReducer(state = defaultState, action: OptionAction): OptionState {
  switch (action.type) {
    case getType(resetState):
      state = defaultState;
      return state;

    case getType(fetchOptionRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.payload.fetchId, FetchStatus.inProgress),
      };

    case getType(fetchOptionSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.meta.fetchId, FetchStatus.complete),
        byId: new Map(state.byId).set(action.meta.fetchId, {
          ...action.payload,
          timeRequested: Date.now(),
        }),
        errors: new Map(state.errors).set(action.meta.fetchId, null),
      };

    case getType(fetchOptionFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.meta.fetchId, FetchStatus.complete),
        errors: new Map(state.errors).set(action.meta.fetchId, action.payload),
      };
    default:
      return state;
  }
}
