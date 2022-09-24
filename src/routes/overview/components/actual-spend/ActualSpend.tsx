import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
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
import { formatCurrency, formatPercentage } from 'utils/format';

import { styles } from './ActualSpend.styles';

interface ActualSpendOwnProps {
  widgetId: number;
}

interface ActualSpendStateProps {
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

export type ActualSpendProps = ActualSpendOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const ActualSpend: React.FC<ActualSpendProps> = ({ intl, widgetId }) => {
  const { report, reportFetchStatus, widget } = mapToProps(widgetId);

  let actualSpend: string | React.ReactNode = <EmptyValueState />;
  let dateRange: string | React.ReactNode = <EmptyValueState />;
  let percent: string | React.ReactNode = <EmptyValueState />;

  const isTest = true;
  const hasTotal = report && report.meta && report.meta.total;

  if (isTest || hasTotal) {
    actualSpend = formatCurrency(817945.1, 'USD');
    percent = formatPercentage(10);

    const startDate = new Date('2021-12-01T23:59:59z');
    const endDate = new Date('2022-08-01T23:59:59z');

    dateRange = intl.formatDateTimeRange(startDate, endDate, {
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <ReportSummary
      bodyStyle={styles.body}
      fetchStatus={reportFetchStatus}
      excessActualSpend={98321.34}
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

const mapToProps = (widgetId): ActualSpendStateProps => {
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
    reportActions.fetchReport(widget.reportPathsType, widget.reportType, queryString);
  }, [queryString]);

  return {
    report,
    reportFetchStatus,
    reportError,
    widget,
  };
};

export default injectIntl(withRouter(ActualSpend));
