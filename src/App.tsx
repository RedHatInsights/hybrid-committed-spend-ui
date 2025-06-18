import './App.scss';

import { Bullseye, Spinner } from '@patternfly/react-core';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';
import { createStore } from '@redhat-cloud-services/frontend-components-notifications/state';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import pkg from '../package.json';
import { initApi } from './api';
import { useFeatureToggle } from './components/feature-toggle';
import { Routes } from './Routes';
import type { RootState } from './store';
import { featureToggleSelectors } from './store/feature-toggle';

const App = () => {
  const { isProd, updateDocumentTitle } = useChrome();
  const store = createStore();

  const hasFeatureToggle = useSelector((state: RootState) => featureToggleSelectors.selectHasFeatureToggle(state));
  const isBillingStageToggleEnabled = useSelector((state: RootState) =>
    featureToggleSelectors.selectIsBillingStageToggleEnabled(state)
  );

  // Initialize Unleash feature toggles
  useFeatureToggle();

  // Initialize Axios base URL
  initApi({ isBillingStageToggleEnabled });

  useEffect(() => {
    // You can use directly the name of your app
    updateDocumentTitle(pkg.insights.appname);
  }, []);

  // Wait to ensure billing.stage.api.redhat.com APIs are called before defaulting to billing.qa.api.redhat.com domain
  if (!isProd() && !hasFeatureToggle) {
    return (
      <Bullseye>
        <Spinner size="lg" />
      </Bullseye>
    );
  }
  return (
    <div>
      <NotificationsProvider store={store}>
        <Routes />
      </NotificationsProvider>
    </div>
  );
};

export default App;
