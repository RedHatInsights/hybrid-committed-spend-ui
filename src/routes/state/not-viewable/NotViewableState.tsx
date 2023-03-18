import { PauseCircleIcon } from '@patternfly/react-icons/dist/esm/icons/pause-circle-icon';
import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import messages from 'locales/messages';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { routes } from 'Routes';
import { formatPath } from 'utils/paths';

interface NotViewableStateOwnProps {
  pathname?: string;
}

type NotViewableStateProps = NotViewableStateOwnProps & WrappedComponentProps;

class NotViewableStateBase extends React.Component<NotViewableStateProps> {
  public render() {
    const { intl, pathname } = this.props;

    let title;
    let desc;

    switch (pathname) {
      case formatPath(routes.details.path):
      case formatPath(routes.overview.path):
      default:
        desc = messages.notViewableDesc;
        title = messages.notViewable;
        break;
    }
    return (
      <NotAuthorized description={intl.formatMessage(desc)} icon={PauseCircleIcon} title={intl.formatMessage(title)} />
    );
  }
}

const NotViewableState = injectIntl(NotViewableStateBase);

export { NotViewableState };
