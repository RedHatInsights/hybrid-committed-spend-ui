import { Card, CardBody, PageSection } from '@patternfly/react-core';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';

import { NotDealState } from './NotDealState';

interface NotDealOwnProps {
  pathname?: string;
  title?: string;
}

type NotDealProps = NotDealOwnProps;

const NotDeal = ({ pathname, title }: NotDealProps) => {
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
            <NotDealState pathname={pathname} />
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export default NotDeal;
