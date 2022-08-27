// eslint-disable-next-line no-restricted-imports
import { createIntl, createIntlCache } from 'react-intl';

import messages from '../../../locales/data.json';

const locale = navigator.language.split(/[-_]/)[0] || 'en';
export const getLocale = () => {
  return locale;
};

const cache = createIntlCache();

export const intl = createIntl(
  {
    defaultLocale: 'en',
    locale,
    // eslint-disable-next-line no-console
    onError: console.log,
    messages: messages[locale],
  },
  cache
);
