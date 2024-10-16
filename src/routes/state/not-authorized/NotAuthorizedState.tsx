import UnauthorizedAccess from '@patternfly/react-component-groups/dist/esm/UnauthorizedAccess';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { routes } from 'Routes';
import { useFormatPath } from 'utils/paths';

interface NotAuthorizedStateOwnProps {
  pathname?: string;
}

type NotAuthorizedStateProps = NotAuthorizedStateOwnProps;

const NotAuthorizedState: React.FC<NotAuthorizedStateProps> = ({ pathname }) => {
  const formatPath = useFormatPath;
  const intl = useIntl();

  let msg;

  switch (pathname) {
    case formatPath(routes.details.path):
    case formatPath(routes.overview.path):
    default:
      msg = messages.hcs;
      break;
  }
  return <UnauthorizedAccess serviceName={intl.formatMessage(msg)} />;
};

export { NotAuthorizedState };
