import { Bullseye, PageSection, Spinner } from '@patternfly/react-core';
import { useIsOverridePermissionsToggleEnabled } from 'components/feature-toggle';
import messages from 'locales/messages';
import React, { lazy, Suspense } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PageHeading } from 'routes/components/page-heading';
import type { RootState } from 'store';
import { reportSelectors } from 'store/reports';

const Dashboard = lazy(() => import('routes/overview/components/dashboard'));
const NotAvailable = lazy(() => import('routes/state/not-available/NotAvailable'));

interface OverviewOwnProps {
  // TBD...
}

interface OverviewStateProps {
  hasReportErrors: boolean;
}

type OverviewProps = OverviewOwnProps;

const Overview: React.FC<OverviewProps> = () => {
  const { hasReportErrors } = useMapToProps({});
  const isOverridePermissionsToggleEnabled = useIsOverridePermissionsToggleEnabled();
  const intl = useIntl();

  if (hasReportErrors && !isOverridePermissionsToggleEnabled) {
    const title = intl.formatMessage(messages.overviewTitle);
    return <NotAvailable title={title} />;
  }

  return (
    <React.Fragment>
      <PageSection>
        <PageHeading />
      </PageSection>
      <PageSection>
        <Suspense
          fallback={
            <Bullseye>
              <Spinner size="lg" />
            </Bullseye>
          }
        >
          <Dashboard />
        </Suspense>
      </PageSection>
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

export default Overview;
