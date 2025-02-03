import { getQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReport';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import { EmptyValueState } from 'routes/components/state/empty-value';
import { ReportSummary } from 'routes/overview/components/report-summary';
import type { RootState } from 'store';
import { FetchStatus } from 'store/common';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';
import { getToday } from 'utils/dates';
import { formatCurrency } from 'utils/format';

import { styles } from './CommittedSpend.styles';

interface CommittedSpendOwnProps {
  widgetId: number;
}

interface CommittedSpendStateProps {
  report?: AccountSummaryReport;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
  widget: DashboardWidget;
}

export type CommittedSpendProps = CommittedSpendOwnProps;

const CommittedSpend: React.FC<CommittedSpendProps> = ({ widgetId }) => {
  const { report, reportFetchStatus, widget } = useMapToProps({ widgetId });
  const intl = useIntl();

  const values = report?.data?.length && report.data[0];

  const committedSpend: string | React.ReactNode =
    values?.committed_spend?.value >= 0 ? (
      formatCurrency(values.committed_spend.value, values.committed_spend.units)
    ) : (
      <EmptyValueState />
    );
  const remainingCommittedSpend: string | React.ReactNode =
    values?.remaining_committed_spend?.value >= 0 ? (
      formatCurrency(values.remaining_committed_spend.value, values.remaining_committed_spend.units)
    ) : (
      <EmptyValueState />
    );

  let dateRange: string | React.ReactNode = <EmptyValueState />;
  if (values?.contract_line_end_date) {
    const endDate = new Date(values.contract_line_end_date + 'T00:00:00');
    const startDate = getToday();

    // Show today's date plus one day
    startDate.setDate(startDate.getDate() + 1);

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <ReportSummary bodyStyle={styles.body} fetchStatus={reportFetchStatus} title={widget.title}>
      <div>{dateRange}</div>
      <div style={styles.valueContainer}>
        <div>
          <div style={styles.value}>{remainingCommittedSpend}</div>
          <div style={styles.committedSpend}>
            <div>{intl.formatMessage(messages.outOf, { value: committedSpend })}</div>
          </div>
        </div>
      </div>
    </ReportSummary>
  );
};

const useMapToProps = ({ widgetId }: CommittedSpendOwnProps): CommittedSpendStateProps => {
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const reportQueryString = getQuery({
    // TBD...
  });
  const report = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, reportQueryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, widget.reportPathsType, widget.reportType, reportQueryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, reportQueryString)
  );

  useEffect(() => {
    if (reportFetchStatus !== FetchStatus.inProgress) {
      dispatch(reportActions.fetchReport(widget.reportPathsType, widget.reportType, reportQueryString));
    }
  }, [reportQueryString]);

  return {
    report,
    reportFetchStatus,
    reportError,
    reportQueryString,
    widget,
  };
};

export default CommittedSpend;
