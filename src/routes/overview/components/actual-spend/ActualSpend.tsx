import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
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
import { formatCurrency, formatPercentage } from 'utils/format';

import { styles } from './ActualSpend.styles';

interface ActualSpendOwnProps {
  widgetId: number;
}

interface ActualSpendStateProps {
  report?: AccountSummaryReport;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

export type ActualSpendProps = ActualSpendOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const ActualSpend: React.FC<ActualSpendProps> = ({ intl, widgetId }) => {
  const { report, reportFetchStatus, widget } = mapToProps({ widgetId });

  const hasData = report && report.data && report.data.length;
  const values = hasData && report.data[0];

  // Todo: replace with actual spend
  const actualSpend: string | React.ReactNode =
    values && values.committed_spend && values.committed_spend.value ? (
      formatCurrency(Number(values.committed_spend.value), values.committed_spend.units || 'USD')
    ) : (
      <EmptyValueState />
    );
  const excessActualSpend: string | React.ReactNode =
    values && values.excess_committed_spend && values.excess_committed_spend.value ? (
      formatCurrency(Number(values.excess_committed_spend.value), values.excess_committed_spend.units || 'USD')
    ) : (
      <EmptyValueState />
    );
  const percent: string | React.ReactNode =
    values && values.delta && values.delta.percent ? (
      formatPercentage(Number(values.delta.percent))
    ) : (
      <EmptyValueState />
    );

  let dateRange: string | React.ReactNode = <EmptyValueState />;
  if (values && values.contract_start_date) {
    const startDate = new Date(values.contract_start_date + 'T23:59:59z');
    const endDate = getToday();
    endDate.setMonth(endDate.getMonth() - 1);

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <ReportSummary
      bodyStyle={styles.body}
      fetchStatus={reportFetchStatus}
      excessActualSpend={excessActualSpend}
      title={widget.title}
    >
      <div>{dateRange}</div>
      <div style={styles.valueContainer}>
        <div style={styles.value}>{actualSpend}</div>
        <div>
          <div style={styles.percentContainer}>
            <ArrowUpIcon style={styles.arrowIcon} />
            <span style={styles.percent}>{intl.formatMessage(messages.percent, { value: percent })}</span>
          </div>
          {intl.formatMessage(messages.overLastMonth)}
        </div>
      </div>
    </ReportSummary>
  );
};

const mapToProps = ({ widgetId }: ActualSpendOwnProps): ActualSpendStateProps => {
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

export default injectIntl(withRouter(ActualSpend));
