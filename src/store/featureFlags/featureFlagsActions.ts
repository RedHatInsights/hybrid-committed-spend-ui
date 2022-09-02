import { createAction } from 'typesafe-actions';

export interface FeatureFlagsActionMeta {
  isExplorerFeatureEnabled?: boolean;
}

export const setFeatureFlags = createAction('feature/init_feature_flags')<FeatureFlagsActionMeta>();
export const resetState = createAction('feature/reset_state')();
