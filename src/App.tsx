import './App.scss';

import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import { FeatureFlags } from 'components/feature-flags';
import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Reducer } from 'redux';

import pckg from '../package.json';
import { Routes } from './Routes';

type Unregister = () => void;

const App = () => {
  const history = useHistory();
  const chrome = useChrome();

  useEffect(() => {
    let unregister: Unregister;
    if (chrome) {
      const registry = getRegistry();
      registry.register({ notifications: notificationsReducer as Reducer });
      const { identifyApp, on } = chrome.init();

      // You can use directly the name of your app
      identifyApp(pckg.insights.appname);
      unregister = on('APP_NAVIGATION', event => history.push(`/${event.navId}`));
    }
    return () => {
      unregister();
    };
  }, [chrome]);

  return (
    <Fragment>
      <FeatureFlags />
      <NotificationsPortal />
      <Routes />
    </Fragment>
  );
};

export default App;
