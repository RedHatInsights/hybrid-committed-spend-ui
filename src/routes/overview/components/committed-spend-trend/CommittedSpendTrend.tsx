import { getQuery } from 'api/queries/query';
import type { Report } from 'api/reports';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Perspective } from 'routes/components/perspective';
import { ReportSummary } from 'routes/overview/components/report-summary';
import type { RootState } from 'store';
import type { FetchStatus } from 'store/common';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';

import { CommittedSpendTrendTransform } from './CommittedSpendTrendTransform';
import { currentData } from './data/currentData';
import { previousData } from './data/previousData';
import { thresholdData } from './data/thresholdData';

interface CommittedSpendTrendOwnProps {
  widgetId: number;
}

interface CommittedSpendTrendStateProps {
  currentReport?: Report;
  currentReportFetchStatus?: FetchStatus;
  currentReportError?: AxiosError;
  previousReport?: Report;
  previousReportFetchStatus?: FetchStatus;
  previousReportError?: AxiosError;
  widget: DashboardWidget;
}

export type CommittedSpendTrendProps = CommittedSpendTrendOwnProps & RouteComponentProps<void> & WrappedComponentProps;

// eslint-disable-next-line no-shadow
export enum PerspectiveType {
  actual = 'actual',
  previous_over_actual = 'previous_over_actual',
}

const perspectiveOptions = [
  { label: messages.committedSpendTrendPerspectiveValues, value: PerspectiveType.actual },
  { label: messages.committedSpendTrendPerspectiveValues, value: PerspectiveType.previous_over_actual },
];

const CommittedSpendTrend: React.FC<CommittedSpendTrendProps> = ({ intl, widgetId }) => {
  const [perspective, setPerspective] = useState(PerspectiveType.previous_over_actual);
  const { currentReport, currentReportFetchStatus, previousReport, previousReportFetchStatus, widget } = mapToProps({
    widgetId,
  });

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.viewDetails)}</Link>;
    }
    return null;
  };

  const handleOnPerspectiveSelected = value => {
    setPerspective(value);
  };

  return (
    <ReportSummary
      detailsLink={getDetailsLink()}
      excessActualSpend={98321.34}
      fetchStatus={[currentReportFetchStatus, previousReportFetchStatus]}
      title={widget.title}
    >
      <Perspective currentItem={perspective} onSelected={handleOnPerspectiveSelected} options={perspectiveOptions} />
      <CommittedSpendTrendTransform
        chartName={widget.chartName}
        currentReport={currentReport}
        perspective={perspective}
        previousReport={perspective === PerspectiveType.previous_over_actual ? previousReport : undefined}
        thresholdReport={thresholdData as any}
      />
    </ReportSummary>
  );
};

const mapToProps = ({ widgetId }: CommittedSpendTrendOwnProps): CommittedSpendTrendStateProps => {
  const currentQueryString = ''; // Todo: add query string for API when available
  const previousQueryString = ''; // Todo: add query string for API when available
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));

  const currentReport = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, currentQueryString)
    return currentData as any;
  });
  const currentReportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, widget.reportPathsType, widget.reportType, currentQueryString)
  );
  const currentReportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, currentQueryString)
  );

  const previousReport = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, previousQueryString)
    return previousData as any;
  });
  const previousReportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, widget.reportPathsType, widget.reportType, previousQueryString)
  );
  const previousReportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, previousQueryString)
  );

  useMemo(() => {
    // Todo: Enable via dispatch
    reportActions.fetchReport(widget.reportPathsType, widget.reportType, currentQueryString);
  }, [currentQueryString]);
  useMemo(() => {
    // Todo: Enable via dispatch
    reportActions.fetchReport(widget.reportPathsType, widget.reportType, previousQueryString);
  }, [previousQueryString]);

  return {
    currentReport,
    currentReportFetchStatus,
    currentReportError,
    previousReport,
    previousReportFetchStatus,
    previousReportError,
    widget,
  };
};

export default injectIntl(withRouter(CommittedSpendTrend));
