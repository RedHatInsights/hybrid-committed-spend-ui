import type { Filter } from 'api/filters/filter';
import type { AxiosError } from 'axios';
import { FetchStatus } from 'store/common';
import { resetState } from 'store/ui/uiActions';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { fetchFilterFailure, fetchFilterRequest, fetchFilterSuccess } from './filterActions';

export interface CachedFilter extends Filter {
  timeRequested: number;
}

export type FilterState = Readonly<{
  byId: Map<string, CachedFilter>;
  fetchStatus: Map<string, FetchStatus>;
  errors: Map<string, AxiosError>;
}>;

const defaultState: FilterState = {
  byId: new Map(),
  fetchStatus: new Map(),
  errors: new Map(),
};

export type FilterAction = ActionType<
  typeof fetchFilterFailure | typeof fetchFilterRequest | typeof fetchFilterSuccess | typeof resetState
>;

export function filterReducer(state = defaultState, action: FilterAction): FilterState {
  switch (action.type) {
    case getType(resetState):
      state = defaultState;
      return state;

    case getType(fetchFilterRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.payload.fetchId, FetchStatus.inProgress),
      };

    case getType(fetchFilterSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.meta.fetchId, FetchStatus.complete),
        byId: new Map(state.byId).set(action.meta.fetchId, {
          ...action.payload,
          timeRequested: Date.now(),
        }),
        errors: new Map(state.errors).set(action.meta.fetchId, null),
      };

    case getType(fetchFilterFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(action.meta.fetchId, FetchStatus.complete),
        errors: new Map(state.errors).set(action.meta.fetchId, action.payload),
      };
    default:
      return state;
  }
}
