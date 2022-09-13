import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { paths } from 'Routes';

interface NotAuthorizedStateOwnProps {
  pathname?: string;
}

type NotAuthorizedStateProps = NotAuthorizedStateOwnProps & RouteComponentProps<void> & WrappedComponentProps;

class NotAuthorizedStateBase extends React.Component<NotAuthorizedStateProps> {
  public render() {
    const { intl, pathname } = this.props;

    let msg;

    switch (pathname) {
      case paths.details:
      case paths.overview:
      default:
        msg = messages.hcs;
        break;
    }
    return <NotAuthorized serviceName={intl.formatMessage(msg)} />;
  }
}

const NotAuthorizedState = injectIntl(withRouter(NotAuthorizedStateBase));

export { NotAuthorizedState };
