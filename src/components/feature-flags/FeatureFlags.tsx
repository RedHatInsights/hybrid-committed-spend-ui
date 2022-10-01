import { useUnleashClient, useUnleashContext } from '@unleash/proxy-client-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { featureFlagsActions } from 'store/feature-flags/';

interface FeatureFlagsOwnProps {
  children?: React.ReactNode;
}

type FeatureFlagsProps = FeatureFlagsOwnProps & RouteComponentProps<void>;

// eslint-disable-next-line no-shadow
const enum FeatureToggle {
  details = 'hybrid-committed-spend.ui.details',
}

const useFeatureFlags = () => {
  const dispatch = useDispatch();
  const updateContext = useUnleashContext();
  const client = useUnleashClient();
  const [userId, setUserId] = useState();

  const insights = (window as any).insights;
  if (insights && insights.chrome && insights.chrome.auth && insights.chrome.auth.getUser) {
    insights.chrome.auth.getUser().then(user => {
      if (user.identity && user.identity.account_number) {
        setUserId(user.identity.account_number);
      }
    });
  }

  const isMounted = useRef(false);
  useMemo(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [userId]);

  useEffect(() => {
    if (userId && isMounted.current) {
      updateContext({
        userId,
      });
    }
  }, [userId]);

  useEffect(() => {
    // Wait for the new flags to pull in from the different context
    const fetchFlags = async () => {
      await updateContext({ userId });
      dispatch(
        featureFlagsActions.setFeatureFlags({
          isDetailsFeatureEnabled: client.isEnabled(FeatureToggle.details),
        })
      );
      // eslint-disable-next-line no-console
      console.log('isDetailsFeatureEnabled', client.isEnabled(FeatureToggle.details));
    };
    if (userId && isMounted.current) {
      fetchFlags();
    }
  }, [userId]);
};

const FeatureFlagsBase: React.FC<FeatureFlagsProps> = ({ children = null }) => {
  useFeatureFlags();
  return <>{children}</>;
};

const FeatureFlags = withRouter(FeatureFlagsBase);

export { FeatureFlags, FeatureToggle, useFeatureFlags };
