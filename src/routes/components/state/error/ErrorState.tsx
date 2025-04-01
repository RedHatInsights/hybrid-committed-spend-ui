import { EmptyState, EmptyStateBody, EmptyStateVariant } from '@patternfly/react-core';
import { ErrorCircleOIcon } from '@patternfly/react-icons/dist/esm/icons/error-circle-o-icon';
import { LockIcon } from '@patternfly/react-icons/dist/esm/icons/lock-icon';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';

interface ErrorStateProps {
  error: AxiosError;
  icon?: any;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, icon = ErrorCircleOIcon }) => {
  const intl = useIntl();
  let title = intl.formatMessage(messages.errorStateUnexpectedTitle);
  let subTitle = intl.formatMessage(messages.errorStateUnexpectedDesc);

  if (error?.response && (error.response.status === 401 || error.response.status === 403)) {
    icon = LockIcon;
    title = intl.formatMessage(messages.errorStateNotAuthorizedTitle);
    subTitle = intl.formatMessage(messages.errorStateNotAuthorizedDesc);
  }

  return (
    <EmptyState
      headingLevel="h5"
      icon={icon}
      titleText={title}
      variant={EmptyStateVariant.lg}
      className="pf-m-redhat-font"
    >
      <EmptyStateBody>{subTitle}</EmptyStateBody>
    </EmptyState>
  );
};

export default ErrorState;
