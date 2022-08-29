import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import logger from 'redux-logger';

// eslint-disable-next-line no-restricted-imports
import messages from '../locales/data.json';
import App from './App';
import { getLocale } from './components/i18n';
import { init } from './store';

const AppEntry = () => {
  const locale = getLocale();

  /* eslint-disable no-console */
  return (
    <IntlProvider defaultLocale="en" locale={locale} messages={messages[locale]} onError={console.log}>
      <Provider store={init(...(process.env.NODE_ENV !== 'production' ? [logger] : [])).getStore()}>
        <Router basename={getBaseName(window.location.pathname)}>
          <App />
        </Router>
      </Provider>
    </IntlProvider>
  );
};

export default AppEntry;
