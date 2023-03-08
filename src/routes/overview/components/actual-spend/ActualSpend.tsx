import { ArrowDownIcon } from '@patternfly/react-icons';
import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
import { getQuery } from 'api/queries';
import type { AccountSummaryReport } from 'api/reports/accountSummaryReport';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useEffect } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
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
import { formatCurrency, formatPercentage } from 'utils/format';

import { styles } from './ActualSpend.styles';

interface ActualSpendOwnProps {
  widgetId: number;
}

interface ActualSpendStateProps {
  report?: AccountSummaryReport;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
  widget: DashboardWidget;
}

export type ActualSpendProps = ActualSpendOwnProps & WrappedComponentProps;

const ActualSpend: React.FC<ActualSpendProps> = ({ intl, widgetId }) => {
  const { report, reportFetchStatus, widget } = useMapToProps({ widgetId });

  const hasData = report && report.data && report.data.length;
  const values = hasData && report.data[0];

  const actualCommittedSpend: string | React.ReactNode =
    values && values.actual_committed_spend && values.actual_committed_spend.value ? (
      formatCurrency(Number(values.actual_committed_spend.value), values.actual_committed_spend.units || 'USD')
    ) : (
      <EmptyValueState />
    );

  // Don't show excess spend unless greater than zero
  const excessSpend = values && values.excess_committed_spend ? Number(values.excess_committed_spend.value) : undefined;
  const excessActualSpend: string = excessSpend
    ? formatCurrency(excessSpend, values.excess_committed_spend.units || 'USD')
    : undefined;

  const percent = values && values.delta && values.delta.percent ? Number(values.delta.percent) : undefined;
  const percentage: string | React.ReactNode = percent !== undefined ? formatPercentage(percent) : <EmptyValueState />;

  let dateRange: string | React.ReactNode = <EmptyValueState />;
  if (values && values.contract_line_start_date) {
    const startDate = new Date(values.contract_line_start_date + 'T00:00:00');
    const endDate = getToday();
    endDate.setMonth(endDate.getMonth() - 1);

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  }

  const getArrowIcon = () => {
    if (percent !== undefined) {
      if (percent > 0) {
        return <ArrowUpIcon style={styles.arrowIcon} />;
      } else if (percent < 0) {
        return <ArrowDownIcon style={styles.arrowIcon} />;
      }
    }
    return null;
  };

  return (
    <ReportSummary
      bodyStyle={styles.body}
      fetchStatus={reportFetchStatus}
      excessActualSpend={excessActualSpend}
      title={widget.title}
    >
      <div>{dateRange}</div>
      <div style={styles.valueContainer}>
        <div style={styles.value}>{actualCommittedSpend}</div>
        <div>
          <div style={styles.percentContainer}>
            {getArrowIcon()}
            <span style={styles.percentage}>{intl.formatMessage(messages.percent, { value: percentage })}</span>
          </div>
          {intl.formatMessage(messages.overLastMonth)}
        </div>
      </div>
    </ReportSummary>
  );
};

const useMapToProps = ({ widgetId }: ActualSpendOwnProps): ActualSpendStateProps => {
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const query = {
    // TBD...
  };

  const reportQueryString = getQuery(query);
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

export default injectIntl(ActualSpend);
