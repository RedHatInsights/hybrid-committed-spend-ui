import { Card, CardBody, PageSection, Spinner } from '@patternfly/react-core';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';

interface LoadingOwnProps {
  title?: string;
}

type LoadingProps = LoadingOwnProps;

const Loading = ({ title }: LoadingProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={title} />
        </PageHeader>
      )}
      <PageSection hasBodyWrapper={false}>
        <Card>
          <CardBody>
            <Spinner size="lg" />
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export default Loading;
