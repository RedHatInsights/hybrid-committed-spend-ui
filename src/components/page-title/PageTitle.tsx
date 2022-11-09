import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router';
import { paths } from 'Routes';
import { getPath } from 'utils/paths';

interface PageTitleOwnProps {
  children?: React.ReactNode;
}

type PageTitleProps = PageTitleOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const PageTitleBase: React.FC<PageTitleProps> = ({ children = null, intl, location }) => {
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

const PageTitle = withRouter(PageTitleBase);
export default injectIntl(PageTitle);
