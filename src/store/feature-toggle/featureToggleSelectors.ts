import type { RootState } from 'store/rootReducer';

import { stateKey } from './featureToggleReducer';

export const selectFeatureToggleState = (state: RootState) => state[stateKey];

export const selectHasFeatureToggle = (state: RootState) => selectFeatureToggleState(state).hasFeatureToggle;

export const selectIsBillingStageFlagEnabled = (state: RootState) =>
  selectFeatureToggleState(state).isBillingStageFlagEnabled;
export const selectIsDebugFlagEnabled = (state: RootState) => selectFeatureToggleState(state).isDebugFlagEnabled;
