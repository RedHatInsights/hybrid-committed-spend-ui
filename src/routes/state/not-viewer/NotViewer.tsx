import { PageSection } from '@patternfly/react-core';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';

import { NotViewerState } from './NotViewerState';

interface NotViewerOwnProps {
  pathname?: string;
  title?: string;
}

type NotViewerProps = NotViewerOwnProps;

const NotViewer = ({ pathname, title }: NotViewerProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={title} />
        </PageHeader>
      )}
      <PageSection hasBodyWrapper={false}>
        <NotViewerState pathname={pathname} />
      </PageSection>
    </>
  );
};

export default NotViewer;
