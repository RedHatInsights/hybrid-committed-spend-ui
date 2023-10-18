import { EmptyState, EmptyStateBody, EmptyStateHeader, EmptyStateVariant } from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';

interface LoadingStateProps {
  // TBD...
}

// defaultIntl required for testing
const LoadingState: React.FC<LoadingStateProps> = () => {
  const intl = useIntl();
  const title = intl.formatMessage(messages.loadingStateTitle);
  const subTitle = intl.formatMessage(messages.loadingStateDesc);

  return (
    <EmptyState variant={EmptyStateVariant.lg} className="pf-m-redhat-font">
      <Spinner size="lg" />
      <EmptyStateHeader titleText={<>{title}</>} headingLevel="h5" />
      <EmptyStateBody>{subTitle}</EmptyStateBody>
    </EmptyState>
  );
};

export default LoadingState;
