import type { Filter } from 'api/filters/filter';
import type { FilterPathsType, FilterType } from 'api/filters/filter';
import { runFilter } from 'api/filters/filterUtils';
import type { AxiosError } from 'axios';
import type { ThunkAction } from 'redux-thunk';
import { FetchStatus } from 'store/common';
import type { RootState } from 'store/rootReducer';
import { createAction } from 'typesafe-actions';

import { getFetchId } from './filterCommon';
import { selectFilter, selectFilterError, selectFilterFetchStatus } from './filterSelectors';

const expirationMS = 30 * 60 * 1000; // 30 minutes

interface FilterActionMeta {
  fetchId: string;
}

export const fetchFilterRequest = createAction('filter/request')<FilterActionMeta>();
export const fetchFilterSuccess = createAction('filter/success')<Filter, FilterActionMeta>();
export const fetchFilterFailure = createAction('filter/failure')<AxiosError, FilterActionMeta>();

export function fetchFilter(
  filterPathsType: FilterPathsType,
  filterType: FilterType,
  filterQueryString: string
): ThunkAction<void, RootState, void, any> {
  return (dispatch, getState) => {
    if (!isFilterExpired(getState(), filterPathsType, filterType, filterQueryString)) {
      return;
    }

    const meta: FilterActionMeta = {
      fetchId: getFetchId(filterPathsType, filterType, filterQueryString),
    };

    dispatch(fetchFilterRequest(meta));
    runFilter(filterPathsType, filterType, filterQueryString)
      .then(res => {
        dispatch(fetchFilterSuccess(res.data, meta));
      })
      .catch(err => {
        dispatch(fetchFilterFailure(err, meta));
      });
  };
}

function isFilterExpired(
  state: RootState,
  filterPathsType: FilterPathsType,
  filterType: FilterType,
  filterQueryString: string
) {
  const filter = selectFilter(state, filterPathsType, filterType, filterQueryString);
  const fetchError = selectFilterError(state, filterPathsType, filterType, filterQueryString);
  const fetchStatus = selectFilterFetchStatus(state, filterPathsType, filterType, filterQueryString);
  if (fetchError || fetchStatus === FetchStatus.inProgress) {
    return false;
  }

  if (!filter) {
    return true;
  }

  const now = Date.now();
  return now > filter.timeRequested + expirationMS;
}
