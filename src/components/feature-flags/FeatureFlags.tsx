import { useFlag } from '@unleash/proxy-client-react';
import React, { useEffect } from 'react';
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

const FeatureFlagsBase: React.FC<FeatureFlagsProps> = ({ children = null }) => {
  const dispatch = useDispatch();

  const isDetailsFeatureEnabled = useFlag(FeatureToggle.details);

  useEffect(() => {
    dispatch(
      featureFlagsActions.setFeatureFlags({
        isDetailsFeatureEnabled,
      })
    );
  }, []);

  return <>{children}</>;
};

const FeatureFlags = withRouter(FeatureFlagsBase);

export { FeatureFlags, FeatureToggle };
