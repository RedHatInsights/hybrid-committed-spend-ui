import { Bullseye, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import messages from 'locales/messages';
import React, { lazy, Suspense } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { PageHeading } from 'routes/components/page-heading';
import type { RootState } from 'store';
import { reportSelectors } from 'store/reports';

const Dashboard = lazy(() => import('routes/overview/components/dashboard/Dashboard'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface OverviewOwnProps {
  // TBD...
}

interface OverviewStateProps {
  hasReportErrors: boolean;
}

type OverviewProps = OverviewOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const Overview: React.FC<OverviewProps> = ({ intl }) => {
  const { hasReportErrors } = mapToProps({});

  // Todo: Remove when APIs are available
  const isTest = true;

  if (hasReportErrors && !isTest) {
    const title = intl.formatMessage(messages.overviewTitle);
    return <NotAvailable title={title} />;
  }

  return (
    <React.Fragment>
      <PageHeading />
      <Main>
        <Suspense
          fallback={
            <Bullseye>
              <Spinner size="lg" />
            </Bullseye>
          }
        >
          <Dashboard />
        </Suspense>
      </Main>
    </React.Fragment>
  );
};

// eslint-disable-next-line no-empty-pattern
const mapToProps = ({}: OverviewOwnProps): OverviewStateProps => {
  const hasReportErrors = useSelector((state: RootState) => reportSelectors.selectHasErrors(state));

  return {
    hasReportErrors,
  };
};

export default injectIntl(withRouter(Overview));
