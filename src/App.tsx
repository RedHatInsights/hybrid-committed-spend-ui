import './App.scss';

import { Bullseye, Spinner } from '@patternfly/react-core';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Reducer } from 'redux';

import pkg from '../package.json';
import { initApi } from './api';
import { useFeatureFlags } from './components/feature-flags';
import { Routes } from './Routes';
import type { RootState } from './store';
import { featureFlagsSelectors } from './store/feature-flags';

const App = () => {
  const { isProd, updateDocumentTitle } = useChrome();

  const hasFeatureFlags = useSelector((state: RootState) => featureFlagsSelectors.selectHasFeatureFlags(state));
  const isBillingStageFeatureEnabled = useSelector((state: RootState) =>
    featureFlagsSelectors.selectIsBillingStageFeatureEnabled(state)
  );

  useFeatureFlags();

  // Initialize here https://issues.redhat.com/browse/RHCLOUD-25573
  initApi({
    isBillingStageFeatureEnabled,
    version: 'v1',
  });

  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer as Reducer });

    // You can use directly the name of your app
    updateDocumentTitle(pkg.insights.appname);
  }, []);

  // PatternFly v5 testing
  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     const nodes = document.querySelectorAll("*[class*='pf-c']");
  //     nodes.forEach(el => {
  //       el.className = el.className.replace(/pf-c/g, 'pf-v5-c');
  //     });
  //   }, 1000);
  // }, []);

  // Wait to ensure billing.stage.api.redhat.com APIs are called before defaulting to billing.qa.api.redhat.com domain
  if (!isProd() && !hasFeatureFlags) {
    return (
      <Bullseye>
        <Spinner size="lg" />
      </Bullseye>
    );
  }
  return (
    <div className="pf-v5-c-page" style={{ display: 'contents' }}>
      <NotificationsPortal />
      <Routes />
    </div>
  );
};

export default App;
