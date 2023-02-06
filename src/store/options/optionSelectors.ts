import type { OptionPathsType, OptionType } from 'api/options/option';
import type { RootState } from 'store/rootReducer';

import { getFetchId, optionStateKey } from './optionCommon';

export const selectOptionState = (state: RootState) => state[optionStateKey];

export const selectOption = (
  state: RootState,
  optionPathsType: OptionPathsType,
  optionType: OptionType,
  optionQueryString: string
) => selectOptionState(state).byId.get(getFetchId(optionPathsType, optionType, optionQueryString));

export const selectOptionFetchStatus = (
  state: RootState,
  optionPathsType: OptionPathsType,
  optionType: OptionType,
  optionQueryString: string
) => selectOptionState(state).fetchStatus.get(getFetchId(optionPathsType, optionType, optionQueryString));

export const selectOptionError = (
  state: RootState,
  optionPathsType: OptionPathsType,
  optionType: OptionType,
  optionQueryString: string
) => selectOptionState(state).errors.get(getFetchId(optionPathsType, optionType, optionQueryString));
