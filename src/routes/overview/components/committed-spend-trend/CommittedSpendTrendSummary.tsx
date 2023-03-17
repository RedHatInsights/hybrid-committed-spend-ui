import { getQuery } from 'api/queries/query';
import type { Report } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import type { ReactNode } from 'react';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useAccountSummaryMapToProps,
  useDetailsMapDateRangeToProps,
} from 'routes/overview/components/committed-spend-trend/utils';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { DateRangeType } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import type { FetchStatus } from 'store/common';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors } from 'store/dashboard';
import { formatCurrency } from 'utils/format';

import { PerspectiveType } from './CommittedSpendTrend';
import { CommittedSpendTrendTransform } from './CommittedSpendTrendTransform';

interface CommittedSpendTrendSummaryOwnProps {
  perspective?: PerspectiveType;
  perspectiveComponent?: ReactNode;
  widgetId: number;
}

interface CommittedSpendTrendSummaryStateProps {
  consumptionDate?: Date;
  currentEndDate?: Date;
  currentReport?: Report;
  currentReportFetchStatus?: FetchStatus;
  currentReportError?: AxiosError;
  currentStartDate?: Date;
  previousEndDate?: Date;
  previousReport?: Report;
  previousReportFetchStatus?: FetchStatus;
  previousReportError?: AxiosError;
  previousStartDate?: Date;
  summaryFetchStatus?: FetchStatus;
  widget?: DashboardWidget;
}

export type CommittedSpendTrendSummaryProps = CommittedSpendTrendSummaryOwnProps & WrappedComponentProps;

const CommittedSpendTrendSummaryBase: React.FC<CommittedSpendTrendSummaryProps> = ({
  intl,
  perspective,
  perspectiveComponent,
  widgetId,
}) => {
  const {
    consumptionDate,
    currentEndDate,
    currentReport,
    currentReportFetchStatus,
    currentStartDate,
    previousEndDate,
    previousReport,
    previousReportFetchStatus,
    previousStartDate,
    summaryFetchStatus,
    widget,
  } = useMapToProps({
    perspective,
    widgetId,
  });

  const hasData = currentReport && currentReport.meta;
  const values = hasData && currentReport.meta;

  // Don't show excess spend unless greater than zero
  const excessSpend = values && values.excess_actual_spend ? Number(values.excess_actual_spend.value) : undefined;
  const excessActualSpend: string = excessSpend
    ? formatCurrency(excessSpend, values.excess_actual_spend.units || 'USD')
    : undefined;

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.viewDetails)}</Link>;
    }
    return null;
  };

  return (
    <ReportSummary
      detailsLink={getDetailsLink()}
      excessActualSpend={excessActualSpend}
      fetchStatus={[currentReportFetchStatus, previousReportFetchStatus, summaryFetchStatus]}
      title={widget.title}
    >
      {perspectiveComponent}
      <CommittedSpendTrendTransform
        chartName={widget.chartName}
        consumptionDate={consumptionDate}
        currentEndDate={currentEndDate}
        currentReport={currentReport}
        currentStartDate={currentStartDate}
        perspective={perspective}
        previousEndDate={previousEndDate}
        previousReport={perspective === PerspectiveType.previous_over_actual ? previousReport : undefined}
        previousStartDate={previousStartDate}
        thresholdReport={currentReport}
      />
    </ReportSummary>
  );
};

const useMapToProps = ({
  perspective,
  widgetId,
}: CommittedSpendTrendSummaryOwnProps): CommittedSpendTrendSummaryStateProps => {
  const { summary, summaryFetchStatus } = useAccountSummaryMapToProps();
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const consumptionDate =
    values && values.consumption_date ? new Date(values.consumption_date + 'T00:00:00') : undefined;
  const contractLineEndDate =
    values && values.contract_line_end_date ? new Date(values.contract_line_end_date + 'T00:00:00') : undefined;
  const contractLineStartDate =
    values && values.contract_line_start_date ? new Date(values.contract_line_start_date + 'T00:00:00') : undefined;
  const previousContractLineEndDate =
    values && values.previous_contract_line_end_date
      ? new Date(values.previous_contract_line_end_date + 'T00:00:00')
      : undefined;
  const previousContractLineStartDate =
    values && values.previous_contract_line_start_date
      ? new Date(values.previous_contract_line_start_date + 'T00:00:00')
      : undefined;
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));

  const {
    endDate: currentEndDate,
    report: currentReport,
    reportError: currentReportError,
    reportFetchStatus: currentReportFetchStatus,
    startDate: currentStartDate,
  } = useDetailsMapDateRangeToProps({
    contractLineEndDate,
    contractLineStartDate,
    dateRange: DateRangeType.contractedYear,
    reportPathsType: widget.reportPathsType,
    reportType: widget.reportType,
  });

  const {
    endDate: previousEndDate,
    report: previousReport,
    reportError: previousReportError,
    reportFetchStatus: previousReportFetchStatus,
    startDate: previousStartDate,
  } = useDetailsMapDateRangeToProps({
    dateRange: perspective === PerspectiveType.previous_over_actual ? DateRangeType.contractedLastYear : undefined,
    previousContractLineEndDate,
    previousContractLineStartDate,
    reportPathsType: widget.reportPathsType,
    reportType: widget.reportType,
  });

  return {
    consumptionDate,
    currentEndDate,
    currentStartDate,
    currentReport,
    currentReportFetchStatus,
    currentReportError,
    previousEndDate,
    previousReport,
    previousReportFetchStatus,
    previousReportError,
    previousStartDate,
    summaryFetchStatus,
    widget,
  };
};

export const CommittedSpendTrendSummary = injectIntl(CommittedSpendTrendSummaryBase);
