import './App.scss';

import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import React, { useEffect } from 'react';
import type { Reducer } from 'redux';

import pkg from '../package.json';
import { useFeatureFlags } from './components/feature-flags';
import { Routes } from './Routes';

const App = () => {
  const { updateDocumentTitle } = useChrome();

  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer as Reducer });

    // You can use directly the name of your app
    updateDocumentTitle(pkg.insights.appname);
  }, []);

  useFeatureFlags();

  return (
    <>
      <NotificationsPortal />
      <Routes />
    </>
  );
};

export default App;
