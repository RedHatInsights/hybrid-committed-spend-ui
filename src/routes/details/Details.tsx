import { Main } from '@redhat-cloud-services/frontend-components/Main';
import React, { lazy, Suspense } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// const Dashboard = lazy(() => import('routes/details/components/dashboard/Dashboard'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

import { Spinner } from '@patternfly/react-core';
import { connect } from 'react-redux';
import { createMapStateToProps } from 'store/common';
import { reportSelectors } from 'store/reports';

import { DetailsHeader } from './index';

interface DetailsOwnProps {
  // TBD...
}

interface DetailsStateProps {
  hasReportErrors: boolean;
}

interface DetailsDispatchProps {
  // TBD...
}

type DetailsProps = DetailsOwnProps &
  DetailsStateProps &
  DetailsDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const DetailsBase: React.FC<DetailsProps> = ({ hasReportErrors }) => {
  // Todo: Remove when APIs are available
  const isTest = true;
  return (
    <React.Fragment>
      {!isTest && hasReportErrors ? (
        <NotAvailable />
      ) : (
        <>
          <DetailsHeader />
          <Main>
            <Suspense fallback={<Spinner />}>Hello</Suspense>
          </Main>
        </>
      )}
    </React.Fragment>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<DetailsOwnProps, DetailsStateProps>((state, props) => {
  return {
    hasReportErrors: reportSelectors.selectHasErrors(state),
  };
});

const Details = withRouter(DetailsBase);
export default injectIntl(connect(mapStateToProps, {})(Details));
