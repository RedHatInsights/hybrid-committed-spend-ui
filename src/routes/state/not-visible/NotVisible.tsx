import { PageSection } from '@patternfly/react-core';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';

import { NotVisibleState } from './NotVisibleState';

interface NotVisibleOwnProps {
  pathname?: string;
  title?: string;
}

type NotVisibleProps = NotVisibleOwnProps;

const NotVisible = ({ pathname, title }: NotVisibleProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={title} />
        </PageHeader>
      )}
      <PageSection hasBodyWrapper={false}>
        <NotVisibleState pathname={pathname} />
      </PageSection>
    </>
  );
};

export default NotVisible;
