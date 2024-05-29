import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import type { resetState } from './featureToggleActions';
import { setFeatureToggle } from './featureToggleActions';

export type FeatureToggleAction = ActionType<typeof setFeatureToggle | typeof resetState>;

export type FeatureToggleState = Readonly<{
  hasFeatureToggle: boolean;
  isBillingStageToggleEnabled: boolean;
  isDebugToggleEnabled: boolean;
}>;

export const defaultState: FeatureToggleState = {
  hasFeatureToggle: false,
  isBillingStageToggleEnabled: false,
  isDebugToggleEnabled: false,
};

export const stateKey = 'featureToggle';

export function featureToggleReducer(state = defaultState, action: FeatureToggleAction): FeatureToggleState {
  switch (action.type) {
    case getType(setFeatureToggle):
      return {
        ...state,
        hasFeatureToggle: true,
        isBillingStageToggleEnabled: action.payload.isBillingStageToggleEnabled,
        isDebugToggleEnabled: action.payload.isDebugToggleEnabled,
      };

    default:
      return state;
  }
}
