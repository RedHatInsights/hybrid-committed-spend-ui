import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { paths, routes } from 'Routes';

interface PageTitleOwnProps extends RouteComponentProps<void> {
  children?: React.ReactNode;
}

interface PageTitleState {
  // TBD...
}

type PageTitleProps = PageTitleOwnProps & WrappedComponentProps;

class PageTitleBase extends React.Component<PageTitleProps> {
  protected defaultState: PageTitleState = {
    // TBD...
  };
  public state: PageTitleState = { ...this.defaultState };

  private getPath() {
    const { location }: any = this.props;

    const currRoute = routes.find(({ path }) => path === location.pathname);

    return currRoute ? currRoute.path : undefined;
  }

  private getPageTitle() {
    const path = this.getPath();

    switch (path) {
      case paths.explorer:
        return messages.pageTitleExplorer;
      case paths.overview:
        return messages.pageTitleOverview;
      default:
        return messages.pageTitleDefault;
    }
  }

  public render() {
    const { children = null, intl } = this.props;

    // Set page title
    document.title = intl.formatMessage(this.getPageTitle());

    return children;
  }
}

const PageTitle = injectIntl(withRouter(PageTitleBase));

export { PageTitle };
