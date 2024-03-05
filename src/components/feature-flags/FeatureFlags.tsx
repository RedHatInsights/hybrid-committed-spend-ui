import { useUnleashClient } from '@unleash/proxy-client-react';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { featureFlagsActions } from 'store/feature-flags';

// eslint-disable-next-line no-shadow
export const enum FeatureToggle {
  billingStage = 'hybrid-committed-spend.ui.billing-stage', // Toggle to enable billing.stage APIs for demos
}

const useIsFlagEnabled = (flag: FeatureToggle) => {
  const client = useUnleashClient();
  return client.isEnabled(flag);
};

export const useIsBillingStageFeatureEnabled = () => {
  return useIsFlagEnabled(FeatureToggle.billingStage);
};

// The FeatureFlags component saves feature flags in store for places where Unleash hooks not available
const useFeatureFlags = () => {
  const isBillingStageFeatureEnabled = useIsBillingStageFeatureEnabled();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Workaround for code that doesn't use hooks
    dispatch(
      featureFlagsActions.setFeatureFlags({
        isBillingStageFeatureEnabled,
      })
    );
  });
};

export default useFeatureFlags;
