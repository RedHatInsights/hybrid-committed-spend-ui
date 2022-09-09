import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import messages from 'locales/messages';
import React, { lazy, Suspense } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Dashboard = lazy(() => import('routes/views/Overview/components/Dashboard/Dashboard'));

import { Spinner } from '@patternfly/react-core';

type OverviewProps = RouteComponentProps<void> & WrappedComponentProps;

const OverviewBase: React.FunctionComponent<OverviewProps> = ({ intl }) => {
  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title={intl.formatMessage(messages.hcs)} />
      </PageHeader>
      <Main>
        <Suspense fallback={<Spinner />}>
          <Dashboard />
        </Suspense>
      </Main>
    </React.Fragment>
  );
};

const Overview = withRouter(OverviewBase);
export default injectIntl(Overview);
