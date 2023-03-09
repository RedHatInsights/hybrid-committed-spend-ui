import { getQuery } from 'api/queries/query';
import type { Report } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Perspective } from 'routes/components/perspective';
import type { PerspectiveOption } from 'routes/components/perspective/Perspective';
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
import { isContractedLastYearValid } from 'utils/dates';
import { formatCurrency } from 'utils/format';

import { CommittedSpendTrendTransform } from './CommittedSpendTrendTransform';

interface CommittedSpendTrendOwnProps {
  perspective?: PerspectiveType;
  widgetId: number;
}

interface CommittedSpendTrendStateProps {
  contractLineStartDate?: Date;
  contractStartDate?: Date;
  currentReport?: Report;
  currentReportFetchStatus?: FetchStatus;
  currentReportError?: AxiosError;
  endDate?: Date;
  previousReport?: Report;
  previousReportFetchStatus?: FetchStatus;
  previousReportError?: AxiosError;
  startDate?: Date;
  summaryFetchStatus?: FetchStatus;
  widget: DashboardWidget;
}

export type CommittedSpendTrendProps = CommittedSpendTrendOwnProps & WrappedComponentProps;

// eslint-disable-next-line no-shadow
export enum PerspectiveType {
  actual = 'actual',
  previous_over_actual = 'previous_over_actual',
}

const perspectiveOptions: PerspectiveOption[] = [
  { label: messages.committedSpendTrendPerspectiveValues, value: PerspectiveType.actual },
  { label: messages.committedSpendTrendPerspectiveValues, value: PerspectiveType.previous_over_actual },
];

const CommittedSpendTrend: React.FC<CommittedSpendTrendProps> = ({ intl, widgetId }) => {
  const [perspective, setPerspective] = useState(PerspectiveType.actual);
  const {
    contractLineStartDate,
    contractStartDate,
    currentReport,
    currentReportFetchStatus,
    endDate,
    previousReport,
    previousReportFetchStatus,
    startDate,
    summaryFetchStatus,
    widget,
  } = useMapToProps({
    perspective,
    widgetId,
  });

  const hasData = currentReport && currentReport.meta;
  const values = hasData && currentReport.meta;

  // Don't show excess spend unless greater than zero
  // const excessSpend = values && values.excessAmountSpend ? Number(values.excessAmountSpend.value) : undefined;
  // const excessActualSpend: string =
  //   excessSpend ? formatCurrency(excessSpend, values.excessAmountSpend.units || 'USD') : undefined;

  // Todo: Units should come from API ^^^ above ^^^
  const excessSpend = values && values.excessAmountSpend ? Number(values.excessAmountSpend) : undefined;
  const excessActualSpend: string = excessSpend ? formatCurrency(excessSpend, 'USD') : undefined;

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.viewDetails)}</Link>;
    }
    return null;
  };

  const getPerspectiveOptions = () => {
    const newOptions = cloneDeep(perspectiveOptions);

    newOptions.map(option => {
      switch (option.value) {
        case PerspectiveType.previous_over_actual:
          option.isDisabled = isContractedLastYearValid(contractLineStartDate, contractStartDate);
          break;
        default:
          break;
      }
    });
    return newOptions;
  };

  const handleOnPerspectiveSelected = value => {
    setPerspective(value);
  };

  return (
    <ReportSummary
      detailsLink={getDetailsLink()}
      excessActualSpend={excessActualSpend}
      fetchStatus={[currentReportFetchStatus, previousReportFetchStatus, summaryFetchStatus]}
      title={widget.title}
    >
      <Perspective
        currentItem={perspective}
        onSelected={handleOnPerspectiveSelected}
        options={getPerspectiveOptions()}
      />
      <CommittedSpendTrendTransform
        chartName={widget.chartName}
        currentReport={currentReport}
        endDate={endDate}
        perspective={perspective}
        previousReport={perspective === PerspectiveType.previous_over_actual ? previousReport : undefined}
        startDate={startDate}
        thresholdReport={currentReport}
      />
    </ReportSummary>
  );
};

const useMapToProps = ({ perspective, widgetId }: CommittedSpendTrendOwnProps): CommittedSpendTrendStateProps => {
  const { summary, summaryFetchStatus } = useAccountSummaryMapToProps();
  const values = summary && summary.data && summary.data.length && summary.data[0];
  const consumptionDate =
    values && values.consumption_date ? new Date(values.consumption_date + 'T00:00:00') : undefined;
  const contractLineStartDate =
    values && values.contract_line_start_date ? new Date(values.contract_line_start_date + 'T00:00:00') : undefined;
  const contractStartDate =
    values && values.contract_start_date ? new Date(values.contract_start_date + 'T00:00:00') : undefined;
  const previousContractLineEndDate =
    values && values.previous_contract_line_end_date
      ? new Date(values.previous_contract_line_end_date + 'T00:00:00')
      : undefined;
  const previousContractLineStartDate =
    values && values.previous_contract_line_start_date
      ? new Date('values.previous_contract_line_start_date' + 'T00:00:00')
      : undefined;
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));

  const {
    endDate: currentEndDate,
    report: currentReport,
    reportError: currentReportError,
    reportFetchStatus: currentReportFetchStatus,
    startDate: currentStartDate,
  } = useDetailsMapDateRangeToProps({
    consumptionDate,
    contractLineStartDate,
    contractStartDate,
    dateRange: DateRangeType.contractedYtd,
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
    consumptionDate,
    contractLineStartDate,
    contractStartDate,
    dateRange: perspective === PerspectiveType.previous_over_actual ? DateRangeType.contractedLastYear : undefined,
    previousContractLineEndDate,
    previousContractLineStartDate,
    reportPathsType: widget.reportPathsType,
    reportType: widget.reportType,
  });

  return {
    contractLineStartDate,
    contractStartDate,
    currentReport,
    currentReportFetchStatus,
    currentReportError,
    endDate: currentEndDate > previousEndDate ? currentEndDate : previousEndDate,
    previousReport,
    previousReportFetchStatus,
    previousReportError,
    startDate: previousStartDate < currentStartDate ? previousStartDate : currentStartDate,
    summaryFetchStatus,
    widget,
  };
};

export default injectIntl(CommittedSpendTrend);
