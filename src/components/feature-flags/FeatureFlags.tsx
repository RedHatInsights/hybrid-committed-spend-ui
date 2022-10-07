import { Bullseye, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { useFlagsStatus, useUnleashClient, useUnleashContext } from '@unleash/proxy-client-react';
import React, { useLayoutEffect, useRef } from 'react';
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
  const updateContext = useUnleashContext();
  const { flagsReady } = useFlagsStatus();
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
      // eslint-disable-next-line no-console
      console.log('*** In fetchFlags (waiting...)', userId);
      await updateContext({ userId }).then(() => {
        // eslint-disable-next-line no-console
        console.log('*** In updateContext (DONE)', userId);
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

  // eslint-disable-next-line no-console
  console.log('*** flagsReady?', flagsReady);

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
