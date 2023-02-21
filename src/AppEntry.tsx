import IntlProvider from '@redhat-cloud-services/frontend-components-translations/Provider';
import { initApi } from 'api/api';
import { getLocale } from 'components/i18n';
import React from 'react';
import { Provider } from 'react-redux';

// Todo: Uncomment for use with non-shared PatternFly packages
// require.resolve('@patternfly/patternfly/patternfly.css');
require.resolve('@patternfly/patternfly/patternfly-addons.css');

// eslint-disable-next-line no-restricted-imports
import messages from '../locales/data.json';
import App from './App';
import { configureStore } from './store';

initApi({
  version: 'v1',
});

const store = configureStore({
  // session: {
  //   token: getToken(),
  // },
});

const AppEntry = () => {
  const locale = getLocale();

  /* eslint-disable no-console */
  return (
    <IntlProvider defaultLocale="en" locale={locale} messages={messages[locale]} onError={console.log}>
      <Provider store={store as any}>
        <App />
      </Provider>
    </IntlProvider>
  );
};

export default AppEntry;
