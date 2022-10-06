import { Bullseye, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { useFlagsStatus, useUnleashClient, useUnleashContext } from '@unleash/proxy-client-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { featureFlagsActions } from 'store/feature-flags';

interface FeatureFlagsOwnProps {
  children?: React.ReactNode;
}

type FeatureFlagsProps = FeatureFlagsOwnProps & RouteComponentProps<void>;

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
const FeatureFlagsBase: React.FC<FeatureFlagsProps> = ({ children = null }) => {
  const dispatch = useDispatch();
  const { flagsReady } = useFlagsStatus();
  const updateContext = useUnleashContext();
  const client = useUnleashClient();

  const isMounted = useRef(false);
  useMemo(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
  }, [userId]);

  if (flagsReady) {
    return <>{children}</>;
  }
  return (
    <Main>
      <Bullseye>
        <Spinner />
      </Bullseye>
    </Main>
  );
};

const FeatureFlags = withRouter(FeatureFlagsBase);

export default FeatureFlags;
