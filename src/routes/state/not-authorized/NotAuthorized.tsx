import { MessageDescriptor } from '@formatjs/intl/src/types';
import Main from '@redhat-cloud-services/frontend-components/Main';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { NotAuthorizedState } from './NotAuthorizedState';

interface NotAuthorizedOwnProps {
  pathname?: string;
  title?: MessageDescriptor;
}

type NotAuthorizedProps = NotAuthorizedOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const NotAuthorizedBase = ({ intl, pathname, title }: NotAuthorizedProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={intl.formatMessage(title)} />
        </PageHeader>
      )}
      <Main>
        <NotAuthorizedState pathname={pathname} />
      </Main>
    </>
  );
};

const NotAuthorized = withRouter(NotAuthorizedBase);
export default injectIntl(NotAuthorized);
