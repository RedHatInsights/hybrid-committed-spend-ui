import { EmptyState, EmptyStateBody, EmptyStateVariant, Spinner, Title } from '@patternfly/react-core';
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
    <EmptyState variant={EmptyStateVariant.large} className="pf-m-redhat-font">
      <Spinner size="lg" />
      <Title headingLevel="h5" size="lg">
        {title}
      </Title>
      <EmptyStateBody>{subTitle}</EmptyStateBody>
    </EmptyState>
  );
};

export default LoadingState;
