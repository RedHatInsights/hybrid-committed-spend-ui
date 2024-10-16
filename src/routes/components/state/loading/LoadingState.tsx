import { EmptyState, EmptyStateBody, EmptyStateVariant } from '@patternfly/react-core';
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
    <EmptyState headingLevel="h5" titleText={title} variant={EmptyStateVariant.lg} className="pf-m-redhat-font">
      <Spinner size="lg" />
      <EmptyStateBody>{subTitle}</EmptyStateBody>
    </EmptyState>
  );
};

export default LoadingState;
