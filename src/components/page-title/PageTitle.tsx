import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { routes } from 'Routes';
import { formatPath, usePathname } from 'utils/paths';

interface PageTitleOwnProps {
  children?: React.ReactNode;
}

type PageTitleProps = PageTitleOwnProps & WrappedComponentProps;

const PageTitleBase: React.FC<PageTitleProps> = ({ children = null, intl }) => {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
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
