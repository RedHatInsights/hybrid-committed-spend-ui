import { getQuery } from 'api/queries/query';
import type { Report } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import type { ReactNode } from 'react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReportSummary } from 'routes/overview/components/report-summary';
import { useReportMapDateRangeToProps } from 'routes/overview/components/utils/report';
import { getAccountSummaryDates, useAccountSummaryMapToProps } from 'routes/utils/accountSummary';
import { DateRangeType } from 'routes/utils/dateRange';
import type { RootState } from 'store';
import type { FetchStatus } from 'store/common';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors } from 'store/dashboard';
import { getToday } from 'utils/dates';
import { formatCurrency } from 'utils/format';
import { useFormatPath } from 'utils/paths';

import { PerspectiveType } from './CommittedSpendTrend';
import { CommittedSpendTrendTransform } from './CommittedSpendTrendTransform';

interface CommittedSpendTrendSummaryOwnProps {
  perspective?: PerspectiveType;
  perspectiveComponent?: ReactNode;
  widgetId: number;
}

interface CommittedSpendTrendSummaryStateProps {
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

export type CommittedSpendTrendSummaryProps = CommittedSpendTrendSummaryOwnProps;

const CommittedSpendTrendSummary: React.FC<CommittedSpendTrendSummaryProps> = ({
  perspective,
  perspectiveComponent,
  widgetId,
}) => {
  const {
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
  const formatPath = useFormatPath;
  const intl = useIntl();

  const values = currentReport?.meta && currentReport.meta;

  // Don't show excess spend unless greater than zero
  const excessActualSpend = values?.excess_actual_spend ? Number(values.excess_actual_spend.value) : undefined;
  const excessSpend: string = excessActualSpend
    ? formatCurrency(excessActualSpend, values?.excess_actual_spend?.units || 'USD')
    : undefined;

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${formatPath(widget.viewAllPath)}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.viewDetails)}</Link>;
    }
    return null;
  };

  return (
    <ReportSummary
      detailsLink={getDetailsLink()}
      excessSpend={excessSpend}
      fetchStatus={[currentReportFetchStatus, previousReportFetchStatus, summaryFetchStatus]}
      title={widget.title}
    >
      {perspectiveComponent}
      <CommittedSpendTrendTransform
        chartName={widget.chartName}
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
  const {
    consumptionDate,
    contractLineEndDate,
    contractLineStartDate,
    previousContractLineEndDate,
    previousContractLineStartDate,
  } = getAccountSummaryDates(summary);

  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));
  const today = getToday();

  const {
    endDate: currentEndDate,
    report: currentReport,
    reportError: currentReportError,
    reportFetchStatus: currentReportFetchStatus,
    startDate: currentStartDate,
  } = useReportMapDateRangeToProps({
    consumptionDate: today > consumptionDate ? today : consumptionDate, // Use today's date if consumption date is stale
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
  } = useReportMapDateRangeToProps({
    dateRange: perspective === PerspectiveType.previous_over_actual ? DateRangeType.contractedLastYear : undefined,
    previousContractLineEndDate,
    previousContractLineStartDate,
    reportPathsType: widget.reportPathsType,
    reportType: widget.reportType,
  });

  return {
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

export { CommittedSpendTrendSummary };
