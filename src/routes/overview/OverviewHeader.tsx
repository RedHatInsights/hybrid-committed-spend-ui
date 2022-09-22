import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { getQuery, parseQuery, Query } from 'api/queries';
import { Report, ReportPathsType, ReportType } from 'api/reports';
import { AxiosError } from 'axios';
import { format, parseISO } from 'date-fns';
import messages from 'locales/messages';
import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EmptyValueState } from 'routes/components/state';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

import { styles } from './overview.styles';

interface OverviewHeaderOwnProps {
  // TBD...
}

interface OverviewHeaderStateProps {
  query: Query;
  queryString: string;
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
}

interface OverviewHeaderDispatchProps {
  fetchReport: typeof reportActions.fetchReport;
}

type OverviewHeaderProps = OverviewHeaderOwnProps &
  OverviewHeaderStateProps &
  OverviewHeaderDispatchProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const reportPathsType = ReportPathsType.billing;
const reportType = ReportType.cost;

const OverviewHeaderBase: React.FC<OverviewHeaderProps> = ({ fetchReport, intl, queryString, report }) => {
  useMemo(() => {
    fetchReport(reportPathsType, reportType, queryString);
  }, [queryString]);

  let accountName: string | React.ReactNode = <EmptyValueState />;
  let accountNumber: string | React.ReactNode = <EmptyValueState />;
  let contractEndDate: string | React.ReactNode = <EmptyValueState />;
  let contractStartDate: string | React.ReactNode = <EmptyValueState />;
  let consumptionDate: string | React.ReactNode = <EmptyValueState />;

  const isTest = true;
  const hasTotal = report && report.meta && report.meta.total;

  if (isTest || hasTotal) {
    accountName = 'Acme Corporation';
    accountNumber = '12345';
    contractEndDate = format(parseISO('2022-12-31'), 'MMMM dd, yyyy');
    contractStartDate = format(parseISO('2022-01-01'), 'MMMM dd, yyyy');
    consumptionDate = format(parseISO('2002-09-01'), 'MMMM dd, yyyy');
  }

  return (
    <PageHeader>
      <div style={styles.headerContent}>
        <PageHeaderTitle title={intl.formatMessage(messages.overviewTitle)} />
        <div>
          <div style={styles.headerContentRight}>
            {intl.formatMessage(messages.accountName, { value: accountName })}
          </div>
          <div style={styles.headerContentRight}>
            {intl.formatMessage(messages.accountNumber, { value: accountNumber })}
          </div>
          <div style={styles.headerContentRight}>
            {intl.formatMessage(messages.contractDates, { startDate: contractStartDate, endDate: contractEndDate })}
          </div>
          <div style={styles.headerContentRight}>
            {intl.formatMessage(messages.consumptionDate, { date: consumptionDate })}
          </div>
        </div>
      </div>
    </PageHeader>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<OverviewHeaderOwnProps, OverviewHeaderStateProps>((state, props) => {
  // TBD...
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

const mapDispatchToProps: OverviewHeaderDispatchProps = {
  fetchReport: reportActions.fetchReport,
};

const OverviewHeader = withRouter(OverviewHeaderBase);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(OverviewHeader));
