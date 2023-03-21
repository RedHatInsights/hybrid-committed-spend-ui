import { PauseCircleIcon } from '@patternfly/react-icons/dist/esm/icons/pause-circle-icon';
import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { routes } from 'Routes';
import { formatPath } from 'utils/paths';

interface NotViewableStateOwnProps {
  pathname?: string;
}

type NotViewableStateProps = NotViewableStateOwnProps;

const NotViewableState: React.FC<NotViewableStateProps> = ({ pathname }) => {
  const intl = useIntl();

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
};

export { NotViewableState };
