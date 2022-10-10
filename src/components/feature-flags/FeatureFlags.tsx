import { useUnleashClient, useUnleashContext } from '@unleash/proxy-client-react';
import { useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { featureFlagsActions } from 'store/feature-flags';

// eslint-disable-next-line no-shadow
export const enum FeatureToggle {
  details = 'hybrid-committed-spend.ui.details',
}

let userId;
const insights = (window as any).insights;
if (insights && insights.chrome && insights.chrome.auth && insights.chrome.auth.getUser) {
  insights.chrome.auth.getUser().then(user => {
    userId = user.identity.account_number;
  });
}

// The FeatureFlags component saves feature flags in store for places where Unleash hooks not available
const useFeatureFlags = () => {
  const updateContext = useUnleashContext();
  const client = useUnleashClient();
  const dispatch = useDispatch();

  const isMounted = useRef(false);
  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Update everytime or flags may be false
  useLayoutEffect(() => {
    if (userId && isMounted.current) {
      updateContext({
        userId,
      });
    }
  });

  useLayoutEffect(() => {
    // Wait for the new flags to pull in from the different context
    const fetchFlags = async () => {
      await updateContext({ userId }).then(() => {
        dispatch(
          featureFlagsActions.setFeatureFlags({
            isDetailsFeatureEnabled: client.isEnabled(FeatureToggle.details),
          })
        );
      });
    };
    if (userId && isMounted.current) {
      fetchFlags();
    }
  });
};

export default useFeatureFlags;
