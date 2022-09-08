import { MessageDescriptor } from '@formatjs/intl/src/types';
import Main from '@redhat-cloud-services/frontend-components/Main';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface NotAvailablePropsOwnProps {
  title?: MessageDescriptor;
}

type NotAvailableProps = NotAvailablePropsOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const NotAvailableBase = ({ intl, title }: NotAvailableProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={intl.formatMessage(title)} />
        </PageHeader>
      )}
      <Main>
        <Unavailable />
      </Main>
    </>
  );
};

const NotAvailable = withRouter(NotAvailableBase);
export default injectIntl(NotAvailable);
