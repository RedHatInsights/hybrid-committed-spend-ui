import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { getQuery } from 'api/queries';
import { ReportPathsType, ReportType } from 'api/reports';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { EmptyValueState } from 'routes/components/state/empty-value';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';

import { styles } from './DetailsHeader.styles';

interface DetailsHeaderOwnProps {
  children?: React.ReactNode;
}

type DetailsHeaderProps = DetailsHeaderOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const DetailsHeaderBase: React.FC<DetailsHeaderProps> = ({ children, intl }) => {
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
      {children}
    </PageHeader>
  );
};

const mapToProps = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    // TBD...
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

const DetailsHeader = injectIntl(withRouter(DetailsHeaderBase));

export { DetailsHeader };
