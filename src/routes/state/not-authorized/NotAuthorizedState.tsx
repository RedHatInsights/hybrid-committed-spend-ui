import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { routes } from 'Routes';
import { formatPath } from 'utils/paths';

interface NotAuthorizedStateOwnProps {
  pathname?: string;
}

type NotAuthorizedStateProps = NotAuthorizedStateOwnProps;

const NotAuthorizedState: React.FC<NotAuthorizedStateProps> = ({ pathname }) => {
  const intl = useIntl();

  let msg;

  switch (pathname) {
    case formatPath(routes.details.path):
    case formatPath(routes.overview.path):
    default:
      msg = messages.hcs;
      break;
  }
  return <NotAuthorized serviceName={intl.formatMessage(msg)} />;
};

export { NotAuthorizedState };
