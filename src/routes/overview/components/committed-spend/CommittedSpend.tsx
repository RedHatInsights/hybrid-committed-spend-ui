import { getQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReports';
import type { AxiosError } from 'axios';
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
  widget: DashboardWidget;
}

export type CommittedSpendProps = CommittedSpendOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const CommittedSpend: React.FC<CommittedSpendProps> = ({ intl, widgetId }) => {
  const { report, reportFetchStatus, widget } = useMapToProps({ widgetId });

  const hasData = report && report.data && report.data.length;
  const values = hasData && report.data[report.data.length - 1];

  const committedSpend: string | React.ReactNode =
    values && values.committed_spend && values.committed_spend.value ? (
      formatCurrency(Number(values.committed_spend.value), values.committed_spend.units)
    ) : (
      <EmptyValueState />
    );
  const remainingCommittedSpend: string | React.ReactNode =
    values && values.remaining_committed_spend && values.remaining_committed_spend.value ? (
      formatCurrency(Number(values.remaining_committed_spend.value), values.remaining_committed_spend.units)
    ) : (
      <EmptyValueState />
    );

  let dateRange: string | React.ReactNode = <EmptyValueState />;
  if (values && values.contract_end_date) {
    const startDate = getToday();
    const endDate = new Date(values.contract_end_date + 'T00:00:00');

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

  const query = {
    // TBD...
  };
  const queryString = getQuery(query);

  const report = useSelector((state: RootState) =>
    reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, queryString)
  );
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, widget.reportPathsType, widget.reportType, queryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, queryString)
  );

  useEffect(() => {
    if (reportFetchStatus !== FetchStatus.inProgress) {
      dispatch(reportActions.fetchReport(widget.reportPathsType, widget.reportType, queryString));
    }
  }, [queryString]);

  return {
    report,
    reportFetchStatus,
    reportError,
    widget,
  };
};

export default injectIntl(withRouter(CommittedSpend));
