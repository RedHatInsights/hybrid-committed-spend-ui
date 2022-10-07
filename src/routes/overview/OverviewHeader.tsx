import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { getQuery } from 'api/queries';
import { Report, ReportPathsType, ReportType } from 'api/reports';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EmptyValueState } from 'routes/components/state';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

import { styles } from './OverviewHeader.styles';

interface OverviewHeaderOwnProps {
  // TBD...
}

interface OverviewHeaderStateProps {
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
}

type OverviewHeaderProps = OverviewHeaderOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const OverviewHeader: React.FC<OverviewHeaderProps> = ({ intl }) => {
  const { report, reportFetchStatus } = mapToProps();

  let accountName: string | React.ReactNode = <EmptyValueState />;
  let accountNumber: string | React.ReactNode = <EmptyValueState />;

  const isTest = true;
  const hasTotal = report && report.meta && report.meta.total;

  if (isTest || hasTotal) {
    accountName = 'Acme Corporation';
    accountNumber = '12345';
  }

  const contractStartDate = new Date('2021-12-01T23:59:59z');
  const contractEndDate = new Date('2022-11-01T23:59:59z');
  const consumptionDate = new Date('2002-08-01T23:59:59z');

  return (
    <PageHeader>
      <div style={styles.headerContent}>
        <PageHeaderTitle title={intl.formatMessage(messages.overviewTitle)} />
        {reportFetchStatus !== FetchStatus.inProgress && (
          <div>
            <div style={styles.headerContentRight}>
              {intl.formatMessage(messages.accountName, { value: accountName })}
            </div>
            <div style={styles.headerContentRight}>
              {intl.formatMessage(messages.accountNumber, { value: accountNumber })}
            </div>
            <div style={styles.headerContentRight}>
              {intl.formatMessage(messages.contractDate, {
                dateRange: intl.formatDateTimeRange(contractStartDate, contractEndDate, {
                  month: 'long',
                  year: 'numeric',
                }),
              })}
            </div>
            <div style={styles.headerContentRight}>
              {intl.formatMessage(messages.consumptionDate, {
                date: intl.formatDate(consumptionDate, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }),
              })}
            </div>
          </div>
        )}
      </div>
    </PageHeader>
  );
};

const mapToProps = (): OverviewHeaderStateProps => {
  const dispatch = useDispatch();

  const query = {
    limit: 2,
  };
  const queryString = getQuery(query);

  const reportPathsType = ReportPathsType.billing;
  const reportType = ReportType.summary;
  const report = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, reportPathsType, reportType, queryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, queryString)
  );

  useEffect(() => {
    if (reportFetchStatus !== FetchStatus.inProgress) {
      dispatch(reportActions.fetchReport(reportPathsType, reportType, queryString));
    }
  }, [queryString]);

  return {
    report,
    reportFetchStatus,
  };
};

export default injectIntl(withRouter(OverviewHeader));
