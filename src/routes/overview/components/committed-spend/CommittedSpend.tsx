import { Report } from 'api/reports';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EmptyValueState } from 'routes/components/state';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { RootState } from 'store';
import { FetchStatus } from 'store/common';
import { dashboardSelectors, DashboardWidget } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';
import { formatCurrency } from 'utils/format';

import { styles } from './CommittedSpend.styles';

interface CommittedSpendOwnProps {
  widgetId: number;
}

interface CommittedSpendStateProps {
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

export type CommittedSpendProps = CommittedSpendOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const CommittedSpend: React.FC<CommittedSpendProps> = ({ intl, widgetId }) => {
  const { report, reportFetchStatus, widget } = mapToProps({ widgetId });

  let balance: string | React.ReactNode = <EmptyValueState />;
  let committedSpend: string | React.ReactNode = <EmptyValueState />;
  let dateRange: string | React.ReactNode = <EmptyValueState />;

  const isTest = true;
  const hasTotal = report && report.meta && report.meta.total;

  if (isTest || hasTotal) {
    balance = formatCurrency(182054.9, 'USD');
    committedSpend = formatCurrency(1000000.0, 'USD');

    const startDate = new Date('2022-09-01T23:59:59z');
    const endDate = new Date('2022-11-01T23:59:59z');

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <ReportSummary bodyStyle={styles.body} fetchStatus={reportFetchStatus} title={widget.title}>
      <div>{dateRange}</div>
      <div style={styles.valueContainer}>
        <div>
          <div style={styles.value}>{balance}</div>
          <div style={styles.committedSpend}>
            <div>{intl.formatMessage(messages.outOf, { value: committedSpend })}</div>
          </div>
        </div>
      </div>
    </ReportSummary>
  );
};

const mapToProps = ({ widgetId }: CommittedSpendOwnProps): CommittedSpendStateProps => {
  const queryString = ''; // Todo: add query string for API when available
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));

  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString)
    return {
      meta: {
        total: {
          value: 0,
          units: 'USD',
        },
      },
    } as any;
  });
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, widget.reportPathsType, widget.reportType, queryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, queryString)
  );

  useMemo(() => {
    // Todo: Enable via dispatch
    reportActions.fetchReport(widget.reportPathsType, widget.reportType, queryString);
  }, [queryString]);

  return {
    report,
    reportFetchStatus,
    reportError,
    widget,
  };
};

export default injectIntl(withRouter(CommittedSpend));
