import { Title, TitleSizes } from '@patternfly/react-core';
import { getQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReport';
import { ReportPathsType, ReportType } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { routes } from 'Routes';
import { EmptyValueState } from 'routes/components/state/empty-value';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { reportActions, reportSelectors } from 'store/reports';
import { useFormatPath, usePathname } from 'utils/paths';

import { styles } from './PageHeading.styles';

interface PageHeadingOwnProps {
  children?: React.ReactNode;
}

interface PageHeadingStateProps {
  report?: AccountSummaryReport;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
}

type PageHeadingProps = PageHeadingOwnProps;

const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
  const { report, reportFetchStatus } = useMapToProps();
  const formatPath = useFormatPath;
  const pathname = usePathname();
  const intl = useIntl();

  const values = report?.data?.length && report.data[0];

  const emptyValue = (
    <div style={styles.emptyValue}>
      <EmptyValueState />
    </div>
  );

  const accountName: string | React.ReactNode = values?.account_name ? values.account_name : emptyValue;
  const accountNumber: string | React.ReactNode = values?.account_number ? values.account_number : emptyValue;
  const contractStartDate = values?.contract_start_date
    ? new Date(values.contract_start_date + 'T00:00:00')
    : undefined;
  const contractEndDate = values?.contract_end_date ? new Date(values.contract_end_date + 'T00:00:00') : undefined;
  const consumptionDate = values?.consumption_date ? new Date(values.consumption_date + 'T00:00:00') : undefined;

  const getPageTitle = () => {
    switch (pathname) {
      case formatPath(routes.details.path):
        return messages.detailsTitle;
      case formatPath(routes.overview.path):
      default:
        return messages.overviewTitle;
    }
  };

  return (
    <header>
      <div style={styles.headingContent}>
        <Title headingLevel="h1" style={styles.title} size={TitleSizes['2xl']}>
          {intl.formatMessage(getPageTitle())}
        </Title>
        {reportFetchStatus !== FetchStatus.inProgress && (
          <div>
            <div style={styles.headingContentRight}>
              {intl.formatMessage(messages.accountName, { value: accountName })}
            </div>
            <div style={styles.headingContentRight}>
              {intl.formatMessage(messages.accountNumber, { value: accountNumber })}
            </div>
            <div style={styles.headingContentRight}>
              {intl.formatMessage(messages.contractDate, {
                dateRange:
                  contractStartDate && contractEndDate
                    ? intl.formatDateTimeRange(contractStartDate, contractEndDate, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : emptyValue,
              })}
            </div>
            <div style={styles.headingContentRight}>
              {intl.formatMessage(messages.consumptionDate, {
                date: consumptionDate
                  ? intl.formatDate(consumptionDate, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : emptyValue,
              })}
            </div>
          </div>
        )}
      </div>
      {children}
    </header>
  );
};

const useMapToProps = (): PageHeadingStateProps => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const reportQueryString = getQuery({
    // TBD...
  });
  const reportPathsType = ReportPathsType.accountSummary;
  const reportType = ReportType.details;
  const report = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, reportPathsType, reportType, reportQueryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, reportPathsType, reportType, reportQueryString)
  );

  useEffect(() => {
    if (reportFetchStatus !== FetchStatus.inProgress) {
      dispatch(reportActions.fetchReport(reportPathsType, reportType, reportQueryString));
    }
  }, [reportQueryString]);

  return {
    report,
    reportFetchStatus,
    reportQueryString,
  };
};

export default PageHeading;
