import { PageSection } from '@patternfly/react-core';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';

import { NotViewableState } from './NotViewableState';

interface NotViewableOwnProps {
  pathname?: string;
  title?: string;
}

type NotViewableProps = NotViewableOwnProps;

const NotViewable = ({ pathname, title }: NotViewableProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={title} />
        </PageHeader>
      )}
      <PageSection>
        <NotViewableState pathname={pathname} />
      </PageSection>
    </>
  );
};

export default NotViewable;
