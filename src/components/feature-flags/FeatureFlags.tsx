import { useUnleashClient } from '@unleash/proxy-client-react';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { featureFlagsActions } from 'store/feature-flags';

// eslint-disable-next-line no-shadow
export const enum FeatureToggle {
  billingStage = 'hybrid-committed-spend.ui.billing-stage', // Toggle to enable billing.stage APIs for demos
}

// The FeatureFlags component saves feature flags in store for places where Unleash hooks not available
const useFeatureFlags = () => {
  const client = useUnleashClient();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Workaround for code that doesn't use hooks
    const flags = {
      isBillingStageFeatureEnabled: client.isEnabled(FeatureToggle.billingStage),
    };
    dispatch(featureFlagsActions.setFeatureFlags(flags));
  });
};

export default useFeatureFlags;
