import { Bullseye, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import type { AxiosError } from 'axios';
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
  reportErrors: Map<string, AxiosError>;
}

type OverviewProps = OverviewOwnProps & WrappedComponentProps;

const Overview: React.FC<OverviewProps> = ({ intl }) => {
  const { reportErrors } = useMapToProps({});

  if (reportSelectors.hasReportErrors(reportErrors)) {
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
  const reportErrors = useSelector((state: RootState) => reportSelectors.selectReportErrors(state));

  return {
    reportErrors,
  };
};

export default injectIntl(Overview);
