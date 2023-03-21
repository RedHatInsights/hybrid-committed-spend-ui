import React from 'react';
import type { ChartDatum } from 'routes/components/charts/common';
import { TrendChart } from 'routes/components/charts/trend';

import { chartStyles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendOverChartOwnProps {
  chartName?: string;
  currentData?: ChartDatum;
  previousData?: ChartDatum;
  thresholdData?: ChartDatum;
}

export type CommittedSpendTrendOverChartProps = CommittedSpendTrendOverChartOwnProps;

const CommittedSpendTrendOverChart: React.FC<CommittedSpendTrendOverChartProps> = ({
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

export { CommittedSpendTrendOverChart };
