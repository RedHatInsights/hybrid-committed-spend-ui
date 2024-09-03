import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { useUnleashClient } from '@unleash/proxy-client-react';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { featureToggleActions } from 'store/feature-toggle';

export const enum FeatureToggle {
  billingStage = 'hybrid-committed-spend.ui.billing-stage', // Toggle to enable billing.stage APIs for demos
  debug = 'hybrid-committed-spend.ui.debug',
  overridePermissions = 'hybrid-committed-spend.ui.override-permissions', // Toggle to override permissions for testing
}

const useIsToggleEnabled = (toggle: FeatureToggle) => {
  const client = useUnleashClient();
  return client.isEnabled(toggle);
};

export const useIsBillingStageToggleEnabled = () => {
  return useIsToggleEnabled(FeatureToggle.billingStage);
};

export const useIsDebugToggleEnabled = () => {
  return useIsToggleEnabled(FeatureToggle.debug);
};

export const useIsOverridePermissionsToggleEnabled = () => {
  return useIsToggleEnabled(FeatureToggle.overridePermissions);
};

// The FeatureToggle component saves feature toggles in store for places where Unleash hooks not available
const useFeatureToggle = () => {
  const dispatch = useDispatch();
  const { auth } = useChrome();

  const isBillingStageToggleEnabled = useIsBillingStageToggleEnabled();
  const isDebugToggleEnabled = useIsDebugToggleEnabled();
  const isOverridePermissionsToggleEnabled = useIsOverridePermissionsToggleEnabled();

  const fetchUser = callback => {
    auth.getUser().then(user => {
      callback((user as any).identity);
    });
  };

  useLayoutEffect(() => {
    // Workaround for code that doesn't use hooks
    dispatch(
      featureToggleActions.setFeatureToggle({
        isBillingStageToggleEnabled,
        isDebugToggleEnabled,
        isOverridePermissionsToggleEnabled,
      })
    );
    if (isDebugToggleEnabled) {
      // eslint-disable-next-line no-console
      fetchUser(identity => console.log('User identity:', identity));
    }
  }, [isBillingStageToggleEnabled, isDebugToggleEnabled, isOverridePermissionsToggleEnabled]);
};

export default useFeatureToggle;
