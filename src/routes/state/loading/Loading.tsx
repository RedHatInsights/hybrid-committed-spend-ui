import { Bullseye, Spinner } from '@patternfly/react-core';
import Main from '@redhat-cloud-services/frontend-components/Main';
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
      <Main>
        <Bullseye>
          <Spinner size="lg" />
        </Bullseye>
      </Main>
    </>
  );
};

export default Loading;
