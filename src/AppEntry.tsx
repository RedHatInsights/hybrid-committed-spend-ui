// Todo: Uncomment for use with non-shared PatternFly packages
// import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

import { getLocale, ignoreDefaultMessageError } from 'components/i18n';
import React from 'react';
import { IntlProvider } from 'react-intl';
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

  return (
    <IntlProvider
      defaultLocale="en"
      locale={locale}
      messages={messages[locale] || messages.en}
      onError={ignoreDefaultMessageError}
    >
      <Provider store={hcsStore as any}>
        <App />
      </Provider>
    </IntlProvider>
  );
};

export default AppEntry;
