import { createAction } from 'typesafe-actions';

export interface FeatureToggleActionMeta {
  isBillingStageFlagEnabled?: boolean;
  isDebugFlagEnabled?: boolean;
}

export const setFeatureToggle = createAction('feature/init_feature_toggle')<FeatureToggleActionMeta>();
export const resetState = createAction('feature/reset_state')();
