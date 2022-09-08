import { Report } from 'api/reports/report';
import { AxiosError } from 'axios';
import React, { useMemo } from 'react';
import { WrappedComponentProps } from 'react-intl';
import { ActualSpend } from 'routes/views/Overview/components/ActualSpend';
import { ActualSpendBreakdown } from 'routes/views/Overview/components/ActualSpendBreakdown';
import { CommittedSpend } from 'routes/views/Overview/components/CommittedSpend';
import { CommittedSpendTrend } from 'routes/views/Overview/components/CommittedSpendTrend';
import { ReportSummary } from 'routes/views/Overview/components/ReportSummary';
import { FetchStatus } from 'store/common';
import { BillingCardType } from 'store/dashboard/billingDashboard';
import { DashboardWidget } from 'store/dashboard/common';

interface DashboardWidgetOwnProps {
  widgetId: number;
}

interface DashboardWidgetStateProps extends DashboardWidget<any> {
  currentQuery: string;
  currentReport: Report;
  currentReportError: AxiosError;
  currentReportFetchStatus: number;
  previousQuery: string;
  previousReport: Report;
  previousReportError: AxiosError;
  previousReportFetchStatus: number;
}

interface DashboardWidgetDispatchProps {
  fetchForecasts: (widgetId) => void;
  fetchReports?: (widgetId) => void;
  updateTab: (id, availableTabs) => void;
}

type DashboardWidgetProps = DashboardWidgetOwnProps &
  DashboardWidgetStateProps &
  DashboardWidgetDispatchProps &
  WrappedComponentProps;

const DashboardWidgetBase: React.FunctionComponent<DashboardWidgetProps> = ({
  currentQuery,
  currentReport,
  currentReportFetchStatus,
  fetchReports,
  previousQuery,
  previousReportFetchStatus,
  widgetId,
  title,
  type,
}) => {
  if (fetchReports) {
    useMemo(() => {
      fetchReports(widgetId);
    }, [currentQuery, previousQuery]);
  }

  const getActualSpendLayout = () => {
    const status =
      previousReportFetchStatus === FetchStatus.inProgress ? previousReportFetchStatus : currentReportFetchStatus;

    return (
      <ReportSummary status={status} title={title}>
        <ActualSpend report={currentReport} />
      </ReportSummary>
    );
  };

  const getActualSpendBreakdownLayout = () => {
    const status =
      previousReportFetchStatus === FetchStatus.inProgress ? previousReportFetchStatus : currentReportFetchStatus;

    return (
      <ReportSummary status={status} title={title}>
        <ActualSpendBreakdown report={currentReport} />
      </ReportSummary>
    );
  };

  const getCommittedSpendLayout = () => {
    const status =
      previousReportFetchStatus === FetchStatus.inProgress ? previousReportFetchStatus : currentReportFetchStatus;

    return (
      <ReportSummary status={status} title={title}>
        <CommittedSpend report={currentReport} />
      </ReportSummary>
    );
  };

  const getCommittedSpendTrendLayout = () => {
    const status =
      previousReportFetchStatus === FetchStatus.inProgress ? previousReportFetchStatus : currentReportFetchStatus;

    return (
      <ReportSummary status={status} title={title}>
        <CommittedSpendTrend report={currentReport} />
      </ReportSummary>
    );
  };

  switch (type) {
    case BillingCardType.actualSpend:
      return getActualSpendLayout();
    case BillingCardType.actualSpendBreakdown:
      return getActualSpendBreakdownLayout();
    case BillingCardType.committedSpend:
      return getCommittedSpendLayout();
    case BillingCardType.committedSpendTrend:
      return getCommittedSpendTrendLayout();
    default:
      return <></>;
  }
};

export { DashboardWidgetOwnProps, DashboardWidgetProps, DashboardWidgetStateProps };
export default DashboardWidgetBase;
