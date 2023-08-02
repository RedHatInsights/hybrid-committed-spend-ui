import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { routes } from 'Routes';
import { useFormatPath, usePathname } from 'utils/paths';

interface PageTitleOwnProps {
  children?: React.ReactNode;
}

type PageTitleProps = PageTitleOwnProps;

const PageTitle: React.FC<PageTitleProps> = ({ children = null }) => {
  const formatPath = useFormatPath;
  const pathname = usePathname();
  const intl = useIntl();

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

export default PageTitle;
