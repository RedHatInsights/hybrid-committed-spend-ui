import { Bullseye, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import messages from 'locales/messages';
import React, { lazy, Suspense } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
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

type OverviewProps = OverviewOwnProps & WrappedComponentProps;

const Overview: React.FC<OverviewProps> = ({ intl }) => {
  const { hasReportErrors } = useMapToProps({});

  if (hasReportErrors) {
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
const useMapToProps = ({}: OverviewOwnProps): OverviewStateProps => {
  const hasReportErrors = useSelector((state: RootState) => reportSelectors.selectHasReportErrors(state));

  return {
    hasReportErrors,
  };
};

export default injectIntl(Overview);
