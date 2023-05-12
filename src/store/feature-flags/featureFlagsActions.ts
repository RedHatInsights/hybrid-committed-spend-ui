import { createAction } from 'typesafe-actions';

export interface FeatureFlagsActionMeta {
  isBillingStageFeatureEnabled?: boolean;
}

export const setFeatureFlags = createAction('feature/init_feature_flags')<FeatureFlagsActionMeta>();
export const resetState = createAction('feature/reset_state')();
