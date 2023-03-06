import { PageSection } from '@patternfly/react-core';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import React from 'react';

interface NotAvailablePropsOwnProps {
  title?: string;
}

type NotAvailableProps = NotAvailablePropsOwnProps;

const NotAvailable = ({ title }: NotAvailableProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={title} />
        </PageHeader>
      )}
      <PageSection>
        <Unavailable />
      </PageSection>
    </>
  );
};

export default NotAvailable;
