import UnauthorizedAccess from '@patternfly/react-component-groups/dist/esm/UnauthorizedAccess';
import { PauseCircleIcon } from '@patternfly/react-icons/dist/esm/icons/pause-circle-icon';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { routes } from 'Routes';
import { useFormatPath } from 'utils/paths';

import { styles } from './NotVisible.styles';

interface NotVisibleStateOwnProps {
  pathname?: string;
}

type NotVisibleStateProps = NotVisibleStateOwnProps;

const NotVisibleState: React.FC<NotVisibleStateProps> = ({ pathname }) => {
  const formatPath = useFormatPath;
  const intl = useIntl();

  let title;
  let desc;

  switch (pathname) {
    case formatPath(routes.details.path):
    case formatPath(routes.overview.path):
    default:
      desc = messages.notVisibleDesc;
      title = messages.notVisible;
      break;
  }
  return (
    <UnauthorizedAccess
      bodyText={intl.formatMessage(desc)}
      icon={PauseCircleIcon}
      primaryAction={
        <div style={styles.docs}>
          <a href={intl.formatMessage(messages.docs)} rel="noreferrer" target="_blank">
            {intl.formatMessage(messages.hcsDocumentation)}
          </a>
        </div>
      }
      showReturnButton={false}
      titleText={intl.formatMessage(title)}
    />
  );
};

export { NotVisibleState };
