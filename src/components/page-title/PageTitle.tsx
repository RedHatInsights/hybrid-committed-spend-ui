import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { paths } from 'Routes';
import { getPath } from 'utils/paths';

interface PageTitleOwnProps {
  children?: React.ReactNode;
}

type PageTitleProps = PageTitleOwnProps & WrappedComponentProps;

const PageTitleBase: React.FC<PageTitleProps> = ({ children = null, intl }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (getPath(location)) {
      case paths.details:
        return messages.pageTitleDetails;
      case paths.overview:
        return messages.pageTitleOverview;
      default:
        return messages.pageTitleDefault;
    }
  };

  // Set page title
  document.title = intl.formatMessage(getPageTitle());

  return <>{children}</>;
};

const PageTitle = injectIntl(PageTitleBase);
export default PageTitle;
