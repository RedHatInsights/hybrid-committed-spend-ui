import { createAction } from 'typesafe-actions';

export interface FeatureToggleActionMeta {
  isBillingStageToggleEnabled?: boolean;
  isDebugToggleEnabled?: boolean;
  isOverridePermissionsToggleEnabled?: boolean;
}

export const setFeatureToggle = createAction('feature/init_feature_toggle')<FeatureToggleActionMeta>();
export const resetState = createAction('feature/reset_state')();
