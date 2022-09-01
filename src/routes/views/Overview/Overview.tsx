import { Button, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { getQuery, parseQuery, Query } from 'api/queries';
import { Report, ReportPathsType, ReportType } from 'api/reports';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Loading, NotAvailable } from 'routes/state';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

const SampleComponent = lazy(() => import('components/SampleComponent/SampleComponent'));
import './Overview.scss';

interface OverviewStateProps {
  query: Query;
  queryString: string;
  report: Report;
  reportError: AxiosError;
  reportFetchStatus: FetchStatus;
}

interface OverviewDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

type OverviewOwnProps = RouteComponentProps<void> & WrappedComponentProps;
type OverviewProps = OverviewStateProps & OverviewOwnProps & OverviewDispatchProps;

const reportType = ReportType.cost;
const reportPathsType = ReportPathsType.sample;

const OverviewBase: React.FunctionComponent<OverviewProps> = ({
  fetchReport,
  reportFetchStatus,
  reportError,
  intl,
  queryString,
}) => {
  const dispatch = useDispatch();

  useMemo(() => {
    fetchReport(reportPathsType, reportType, queryString);
  }, [queryString]);

  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);

  const handleAlert = () => {
    dispatch(
      addNotification({
        description: 'notification description',
        title: 'Notification title',
        variant: 'success',
      })
    );
  };

  if (reportFetchStatus === FetchStatus.inProgress) {
    return <Loading title={intl.formatMessage(messages.hcs)} />;
  } else if (reportError) {
    return <NotAvailable title={intl.formatMessage(messages.hcs)} />;
  }
  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title={intl.formatMessage(messages.hcs)} />
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="3xl">
              {' '}
              Alerts{' '}
            </Title>
            <Button variant="primary" onClick={handleAlert}>
              {' '}
              Dispatch alert{' '}
            </Button>
          </StackItem>
          <StackItem>
            <Suspense fallback={<Spinner />}>
              <SampleComponent />
            </Suspense>
          </StackItem>
          <StackItem>
            <Stack hasGutter>
              <StackItem>
                <Title headingLevel="h2" size="3xl">
                  {' '}
                  Links{' '}
                </Title>
              </StackItem>
              <StackItem>
                <Link to="/oops"> How to handle 500s in app. </Link>
              </StackItem>
              <StackItem>
                <Link to="/no-permissions"> How to handle 403s in app. </Link>
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<OverviewOwnProps, OverviewStateProps>((state, props) => {
  const queryFromRoute = parseQuery<Query>(location.search);
  const query = {
    filter: {
      ...queryFromRoute.filter,
    },
  };
  const queryString = getQuery(query);
  const report = reportSelectors.selectReport(state, reportPathsType, reportType, queryString);
  const reportError = reportSelectors.selectReportError(state, reportPathsType, reportType, queryString);
  const reportFetchStatus = reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, queryString);

  return {
    query,
    queryString,
    report,
    reportError,
    reportFetchStatus,
  };
});

const mapDispatchToProps: OverviewDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const Overview = withRouter(OverviewBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Overview));
