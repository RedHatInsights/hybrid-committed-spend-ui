import type { FilterPathsType, FilterType } from 'api/filters/filter';
import type { RootState } from 'store/rootReducer';

import { filterStateKey, getFetchId } from './filterCommon';

export const selectFilterState = (state: RootState) => state[filterStateKey];

export const selectFilter = (
  state: RootState,
  filterPathsType: FilterPathsType,
  filterType: FilterType,
  filterQueryString: string
) => selectFilterState(state).byId.get(getFetchId(filterPathsType, filterType, filterQueryString));

export const selectFilterFetchStatus = (
  state: RootState,
  filterPathsType: FilterPathsType,
  filterType: FilterType,
  filterQueryString: string
) => selectFilterState(state).fetchStatus.get(getFetchId(filterPathsType, filterType, filterQueryString));

export const selectFilterError = (
  state: RootState,
  filterPathsType: FilterPathsType,
  filterType: FilterType,
  filterQueryString: string
) => selectFilterState(state).errors.get(getFetchId(filterPathsType, filterType, filterQueryString));
