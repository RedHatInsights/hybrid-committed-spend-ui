import type { RootState } from 'store/rootReducer';

import { stateKey } from './featureToggleReducer';

export const selectFeatureToggleState = (state: RootState) => state[stateKey];

export const selectHasFeatureToggle = (state: RootState) => selectFeatureToggleState(state).hasFeatureToggle;

export const selectIsBillingStageToggleEnabled = (state: RootState) =>
  selectFeatureToggleState(state).isBillingStageToggleEnabled;
export const selectIsDebugToggleEnabled = (state: RootState) => selectFeatureToggleState(state).isDebugToggleEnabled;
export const selectIsOverridePermissionsToggleEnabled = (state: RootState) =>
  selectFeatureToggleState(state).isOverridePermissionsToggleEnabled;
