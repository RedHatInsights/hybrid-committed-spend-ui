import { Main } from '@redhat-cloud-services/frontend-components/Main';
import React, { lazy, Suspense } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Dashboard = lazy(() => import('routes/overview/components/dashboard/Dashboard'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

import { Spinner } from '@patternfly/react-core';
import { connect } from 'react-redux';
import { createMapStateToProps } from 'store/common';
import { reportSelectors } from 'store/reports';

import { OverviewHeader } from './index';

interface OverviewOwnProps {
  // TBD...
}

interface OverviewStateProps {
  hasReportErrors: boolean;
}

interface OverviewDispatchProps {
  // TBD...
}

type OverviewProps = OverviewOwnProps &
  OverviewStateProps &
  OverviewDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const OverviewBase: React.FC<OverviewProps> = ({ hasReportErrors }) => {
  // Todo: Remove when APIs are available
  const isTest = true;
  return (
    <React.Fragment>
      <OverviewHeader />
      <Main>
        <Suspense fallback={<Spinner />}>{!isTest && hasReportErrors ? <NotAvailable /> : <Dashboard />}</Suspense>
      </Main>
    </React.Fragment>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<OverviewOwnProps, OverviewStateProps>((state, props) => {
  return {
    hasReportErrors: reportSelectors.selectHasErrors(state),
  };
});

const Overview = withRouter(OverviewBase);
export default injectIntl(connect(mapStateToProps, {})(Overview));
