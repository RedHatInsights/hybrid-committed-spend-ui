import type { Report } from 'api/reports/report';
import React from 'react';
import type { ChartDatum } from 'routes/components/charts/common';
import { TrendChart } from 'routes/components/charts/trend';

import { chartStyles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendChartOwnProps {
  chartName?: string;
  currentData?: ChartDatum;
  thresholdData?: Report;
}

export type CommittedSpendTrendChartProps = CommittedSpendTrendChartOwnProps;

const CommittedSpendTrendChart: React.FC<CommittedSpendTrendChartProps> = ({
  chartName,
  currentData,
  thresholdData,
}) => {
  return (
    <TrendChart
      baseHeight={chartStyles.chartHeight}
      currentData={currentData}
      name={chartName}
      thresholdData={thresholdData}
    />
  );
};

export { CommittedSpendTrendChart };
