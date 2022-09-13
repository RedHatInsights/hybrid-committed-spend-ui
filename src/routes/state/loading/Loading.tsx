import { MessageDescriptor } from '@formatjs/intl/src/types';
import Main from '@redhat-cloud-services/frontend-components/Main';
import PageHeader, { PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LoadingState } from 'routes/components/state/loading';

interface LoadingOwnProps {
  title?: MessageDescriptor;
}

type LoadingProps = LoadingOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const LoadingBase = ({ intl, title }: LoadingProps) => {
  return (
    <>
      {title && (
        <PageHeader>
          <PageHeaderTitle title={intl.formatMessage(title)} />
        </PageHeader>
      )}
      <Main>
        <LoadingState />
      </Main>
    </>
  );
};

const Loading = withRouter(LoadingBase);
export default injectIntl(Loading);
