import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { paths } from 'Routes';

interface NotAuthorizedStateOwnProps {
  pathname?: string;
}

type NotAuthorizedStateProps = NotAuthorizedStateOwnProps & WrappedComponentProps;

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

const NotAuthorizedState = injectIntl(NotAuthorizedStateBase);

export { NotAuthorizedState };
