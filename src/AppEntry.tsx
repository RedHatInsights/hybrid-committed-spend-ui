// Todo: Uncomment for use with non-shared PatternFly packages
// import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { getLocale } from 'components/i18n';
import React from 'react';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import messages from '../locales/data.json';
import App from './App';
import { configureStore } from './store';

const hcsStore = configureStore({
  // session: {
  //   token: getToken(),
  // },
} as any);

const AppEntry = () => {
  const locale = getLocale();

  /* eslint-disable no-console */
  return (
    <IntlProvider defaultLocale="en" locale={locale} messages={messages[locale]} onError={console.log}>
      <Provider store={hcsStore as any}>
        <App />
      </Provider>
    </IntlProvider>
  );
};

export default AppEntry;
