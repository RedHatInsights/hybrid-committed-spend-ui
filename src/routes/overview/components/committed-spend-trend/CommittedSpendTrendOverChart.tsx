import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ChartDatum } from 'routes/components/charts/common';
import { TrendChart } from 'routes/components/charts/trend';

import { chartStyles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendOverChartOwnProps {
  chartName?: string;
  currentData?: ChartDatum;
  previousData?: ChartDatum;
  thresholdData?: ChartDatum;
}

export type CommittedSpendTrendOverChartProps = CommittedSpendTrendOverChartOwnProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendTrendOverChartBase: React.FC<CommittedSpendTrendOverChartProps> = ({
  chartName,
  currentData,
  previousData,
  thresholdData,
}) => {
  return (
    <TrendChart
      adjustContainerHeight
      containerHeight={chartStyles.chartContainerHeight}
      currentData={currentData}
      height={chartStyles.chartHeight}
      name={chartName}
      previousData={previousData}
      thresholdData={thresholdData}
    />
  );
};

export const CommittedSpendTrendOverChart = injectIntl(withRouter(CommittedSpendTrendOverChartBase));
