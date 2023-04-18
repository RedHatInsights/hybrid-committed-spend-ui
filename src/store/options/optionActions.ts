import type { Option } from 'api/options/option';
import type { OptionPathsType, OptionType } from 'api/options/option';
import { runOption } from 'api/options/optionUtils';
import type { AxiosError } from 'axios';
import type { ThunkAction } from 'redux-thunk';
import { FetchStatus } from 'store/common';
import type { RootState } from 'store/rootReducer';
import { createAction } from 'typesafe-actions';

import { getFetchId } from './optionCommon';
import { selectOption, selectOptionError, selectOptionFetchStatus } from './optionSelectors';

const expirationMS = 30 * 60 * 1000; // 30 minutes

interface OptionActionMeta {
  fetchId: string;
}

export const fetchOptionRequest = createAction('option/request')<OptionActionMeta>();
export const fetchOptionSuccess = createAction('option/success')<Option, OptionActionMeta>();
export const fetchOptionFailure = createAction('option/failure')<AxiosError, OptionActionMeta>();

export function fetchOption(
  optionPathsType: OptionPathsType,
  optionType: OptionType,
  optionQueryString: string
): ThunkAction<void, RootState, void, any> {
  return (dispatch, getState) => {
    if (!isOptionExpired(getState(), optionPathsType, optionType, optionQueryString)) {
      return;
    }

    const meta: OptionActionMeta = {
      fetchId: getFetchId(optionPathsType, optionType, optionQueryString),
    };

    dispatch(fetchOptionRequest(meta));
    runOption(optionPathsType, optionType, optionQueryString)
      .then(res => {
        dispatch(fetchOptionSuccess(res.data, meta));
      })
      .catch(err => {
        dispatch(fetchOptionFailure(err, meta));
      });
  };
}

function isOptionExpired(
  state: RootState,
  optionPathsType: OptionPathsType,
  optionType: OptionType,
  optionQueryString: string
) {
  const option = selectOption(state, optionPathsType, optionType, optionQueryString);
  const fetchError = selectOptionError(state, optionPathsType, optionType, optionQueryString);
  const fetchStatus = selectOptionFetchStatus(state, optionPathsType, optionType, optionQueryString);
  if (fetchError || fetchStatus === FetchStatus.inProgress) {
    return false;
  }

  if (!option) {
    return true;
  }

  const now = Date.now();
  return now > option.timeRequested + expirationMS;
}
