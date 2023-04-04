import { useUnleashClient, useUnleashContext } from '@unleash/proxy-client-react';
import { useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { featureFlagsActions } from 'store/feature-flags';

// eslint-disable-next-line no-shadow
export const enum FeatureToggle {
  details = 'hybrid-committed-spend.ui.details',
}

// The FeatureFlags component saves feature flags in store for places where Unleash hooks not available
const useFeatureFlags = () => {
  const updateContext = useUnleashContext();
  const client = useUnleashClient();
  const dispatch = useDispatch();

  const fetchUser = callback => {
    const insights = (window as any).insights;
    if (insights && insights.chrome && insights.chrome.auth && insights.chrome.auth.getUser) {
      insights.chrome.auth.getUser().then(user => {
        callback(user.identity.account_number);
      });
    }
  };

  const isMounted = useRef(false);
  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Update everytime or flags may be false
  useLayoutEffect(() => {
    fetchUser(userId => {
      if (isMounted.current) {
        updateContext({
          userId,
        });
      }
    });
  });

  useLayoutEffect(() => {
    // Wait for the new flags to pull in from the different context
    const fetchFlags = async userId => {
      await updateContext({ userId }).then(() => {
        dispatch(
          featureFlagsActions.setFeatureFlags({
            // Todo: Save for future feature
            isDetailsFeatureEnabled: client.isEnabled(FeatureToggle.details) || true,
          })
        );
      });
    };
    fetchUser(userId => {
      if (isMounted.current) {
        fetchFlags(userId);
      }
    });
  });
};

export default useFeatureFlags;
