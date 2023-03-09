import { getQuery } from 'api/queries/query';
import type { Report } from 'api/reports/report';
import type { AxiosError } from 'axios';
import messages from 'locales/messages';
import React, { useMemo, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatumType } from 'routes/components/charts/common/chart-datum';
import { Perspective } from 'routes/components/perspective';
import { ReportSummary } from 'routes/overview/components/report-summary';
import type { RootState } from 'store';
import type { FetchStatus } from 'store/common';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors } from 'store/dashboard';
import { reportActions, reportSelectors } from 'store/reports';
import { formatCurrency } from 'utils/format';

import { ActualSpendBreakdownChart } from './ActualSpendBreakdownChart';
import { affiliateData } from './data/affiliateData';
import { productData } from './data/productData';
import { sourceData } from './data/sourceData';

interface ActualSpendBreakdownOwnProps {
  perspective?: PerspectiveType;
  widgetId: number;
}

interface ActualSpendBreakdownStateProps {
  report?: Report;
  reportError?: AxiosError;
  reportFetchStatus?: FetchStatus;
  reportQueryString?: string;
  widget: DashboardWidget;
}

export type ActualSpendBreakdownProps = ActualSpendBreakdownOwnProps & WrappedComponentProps;

// eslint-disable-next-line no-shadow
export enum ComparisonType {
  cumulative = 'cumulative',
  monthly = 'monthly',
}

// eslint-disable-next-line no-shadow
export enum PerspectiveType {
  affiliates = 'affiliates',
  products = 'products',
  sources = 'sources',
}

const dataTypeOptions = [
  { label: messages.actualSpendBreakdownDataValues, value: ComparisonType.monthly },
  { label: messages.actualSpendBreakdownDataValues, value: ComparisonType.cumulative },
];

const perspectiveOptions = [
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.sources },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.affiliates },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.products },
];

const ActualSpendBreakdownBase: React.FC<ActualSpendBreakdownProps> = ({ intl, widgetId }) => {
  const [comparison, setComparison] = useState(ComparisonType.monthly);
  const [perspective, setPerspective] = useState(PerspectiveType.sources);

  const { report, reportFetchStatus, widget } = useMapToProps({ perspective, widgetId });

  const getDetailsLink = () => {
    if (widget.viewAllPath) {
      const href = `${widget.viewAllPath}?${getQuery({
        // TBD...
      })}`;
      return <Link to={href}>{intl.formatMessage(messages.exploreMore)}</Link>;
    }
    return null;
  };

  const handleOnComparisonSelected = value => {
    setComparison(value);
  };

  const handleOnPerspectiveSelected = value => {
    setPerspective(value);
  };

  // Todo: add summaryFetchStatus below
  return (
    <ReportSummary
      detailsLink={getDetailsLink()}
      excessActualSpend={formatCurrency(98321.34, 'USD')}
      fetchStatus={reportFetchStatus}
      showBreakdown
      title={widget.title}
    >
      <Perspective currentItem={perspective} onSelected={handleOnPerspectiveSelected} options={perspectiveOptions} />
      <Perspective currentItem={comparison} onSelected={handleOnComparisonSelected} options={dataTypeOptions} />
      <ActualSpendBreakdownChart
        chartName={widget.chartName}
        datumType={comparison === ComparisonType.cumulative ? DatumType.cumulative : DatumType.rolling}
        perspective={perspective}
        report={report}
      />
    </ReportSummary>
  );
};

const useMapToProps = ({ perspective, widgetId }: ActualSpendBreakdownOwnProps): ActualSpendBreakdownStateProps => {
  const reportQueryString = ''; // Todo: add query string for API when available
  const widget = useSelector((state: RootState) => dashboardSelectors.selectWidget(state, widgetId));

  const report = useSelector((/* state: RootState */) => {
    // reportSelectors.selectReport(state, widget.reportPathsType, widget.reportType, reportQueryString)
    switch (perspective) {
      case PerspectiveType.affiliates: // affiliates
        return affiliateData;
      case PerspectiveType.products: // product
        return productData as any;
      case PerspectiveType.sources: // sources
      default:
        return sourceData;
    }
  });
  const reportFetchStatus = useSelector((state: RootState) =>
    reportSelectors.selectReportFetchStatus(state, widget.reportPathsType, widget.reportType, reportQueryString)
  );
  const reportError = useSelector((state: RootState) =>
    reportSelectors.selectReportError(state, widget.reportPathsType, widget.reportType, reportQueryString)
  );

  useMemo(() => {
    // Todo: Enable via dispatch
    reportActions.fetchReport(widget.reportPathsType, widget.reportType, reportQueryString);
  }, [reportQueryString]);

  return {
    report,
    reportFetchStatus,
    reportError,
    reportQueryString,
    widget,
  };
};

export default injectIntl(ActualSpendBreakdownBase);
