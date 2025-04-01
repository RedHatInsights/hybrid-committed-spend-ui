import UnauthorizedAccess from '@patternfly/react-component-groups/dist/esm/UnauthorizedAccess';
import { PauseCircleIcon } from '@patternfly/react-icons/dist/esm/icons/pause-circle-icon';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import { routes } from 'Routes';
import { useFormatPath } from 'utils/paths';

import { styles } from './NotDeal.styles';

interface NotDealStateOwnProps {
  pathname?: string;
}

type NotDealStateProps = NotDealStateOwnProps;

const NotDealState: React.FC<NotDealStateProps> = ({ pathname }) => {
  const formatPath = useFormatPath;
  const intl = useIntl();

  let title;
  let desc;

  switch (pathname) {
    case formatPath(routes.details.path):
    case formatPath(routes.overview.path):
    default:
      desc = messages.notDealDesc;
      title = messages.notDeal;
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

export { NotDealState };
