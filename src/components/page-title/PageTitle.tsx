import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { formatPath, routes } from 'Routes';

interface PageTitleOwnProps {
  children?: React.ReactNode;
}

type PageTitleProps = PageTitleOwnProps & WrappedComponentProps;

const PageTitleBase: React.FC<PageTitleProps> = ({ children = null, intl }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case formatPath(routes.details.path):
        return messages.pageTitleDetails;
      case formatPath(routes.overview.path):
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
