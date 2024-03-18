import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { useUnleashClient } from '@unleash/proxy-client-react';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { featureToggleActions } from 'store/feature-toggle';

// eslint-disable-next-line no-shadow
export const enum FeatureToggle {
  billingStage = 'hybrid-committed-spend.ui.billing-stage', // Toggle to enable billing.stage APIs for demos
  debug = 'hybrid-committed-spend.ui.debug',
}

const useIsToggleEnabled = (toggle: FeatureToggle) => {
  const client = useUnleashClient();
  return client.isEnabled(toggle);
};

export const useIsBillingStageFlagEnabled = () => {
  return useIsToggleEnabled(FeatureToggle.billingStage);
};

export const useIsDebugFlagEnabled = () => {
  return useIsToggleEnabled(FeatureToggle.debug);
};

// The FeatureToggle component saves feature toggles in store for places where Unleash hooks not available
const useFeatureToggle = () => {
  const dispatch = useDispatch();
  const { auth } = useChrome();

  const isBillingStageFlagEnabled = useIsBillingStageFlagEnabled();
  const isDebugFlagEnabled = useIsDebugFlagEnabled();

  const fetchUser = callback => {
    auth.getUser().then(user => {
      callback((user as any).identity);
    });
  };

  useLayoutEffect(() => {
    // Workaround for code that doesn't use hooks
    dispatch(
      featureToggleActions.setFeatureToggle({
        isBillingStageFlagEnabled,
        isDebugFlagEnabled,
      })
    );
    if (isDebugFlagEnabled) {
      // eslint-disable-next-line no-console
      fetchUser(identity => console.log('User identity:', identity));
    }
  }, [isBillingStageFlagEnabled, isDebugFlagEnabled]);
};

export default useFeatureToggle;
