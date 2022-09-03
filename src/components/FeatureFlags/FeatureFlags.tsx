import { useFlag } from '@unleash/proxy-client-react';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { featureFlagsActions } from 'store/featureFlags';

interface FeatureFlagsProps extends RouteComponentProps {
  children?: React.ReactNode;
}

// eslint-disable-next-line no-shadow
const enum FeatureToggle {
  explorer = 'hybrid-committed-spend.ui.explorer',
}

const FeatureFlagsBase: FunctionComponent<FeatureFlagsProps> = ({ children = null }): any => {
  const dispatch = useDispatch();

  const isExplorerFeatureEnabled = useFlag(FeatureToggle.explorer);

  useEffect(() => {
    dispatch(
      featureFlagsActions.setFeatureFlags({
        isExplorerFeatureEnabled,
      })
    );
  }, []);

  return children;
};

const FeatureFlags = withRouter(FeatureFlagsBase);

export { FeatureFlags, FeatureToggle };
