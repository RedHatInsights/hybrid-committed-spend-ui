import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { ReportPathsType, ReportType } from 'api/reports';
import messages from 'locales/messages';
import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EmptyValueState } from 'routes/components/state';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

import { styles } from './DetailsHeader.styles';

interface DetailsHeaderOwnProps {
  // TBD...
}

type DetailsHeaderProps = DetailsHeaderOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ intl }) => {
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
        <PageHeaderTitle title={intl.formatMessage(messages.detailsTitle)} />
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

const mapToProps = () => {
  const queryString = ''; // Todo: add query string for API when available
  const reportPathsType = ReportPathsType.billing;
  const reportType = ReportType.cost;
  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, reportPathsType, reportType, queryString)
    return {
      meta: {
        total: {
          value: 0,
          units: 'USD',
        },
      },
    };
  });
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, queryString)
  );

  useMemo(() => {
    reportActions.fetchReport(reportPathsType, reportType, queryString);
  }, [queryString]);

  return {
    report,
    reportFetchStatus,
  };
};

export default injectIntl(withRouter(DetailsHeader));
