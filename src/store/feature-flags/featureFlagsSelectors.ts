import { RootState } from 'store/rootReducer';

import { stateKey } from './featureFlagsReducer';

export const selectFeatureFlagsState = (state: RootState) => state[stateKey];

export const selectIsDetailsFeatureEnabled = (state: RootState) =>
  selectFeatureFlagsState(state).isDetailsFeatureEnabled;
