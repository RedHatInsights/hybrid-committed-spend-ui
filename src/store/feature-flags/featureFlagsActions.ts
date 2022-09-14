import { createAction } from 'typesafe-actions';

export interface FeatureFlagsActionMeta {
  isDetailsFeatureEnabled?: boolean;
}

export const setFeatureFlags = createAction('feature/init_feature_flags')<FeatureFlagsActionMeta>();
export const resetState = createAction('feature/reset_state')();
