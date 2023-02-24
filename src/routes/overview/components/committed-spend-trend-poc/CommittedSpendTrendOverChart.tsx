import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import type { ChartDatum } from 'routes/components/charts/common';
import { TrendChart } from 'routes/components/charts/trend';

import { chartStyles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendOverChartOwnProps {
  chartName?: string;
  currentData?: ChartDatum;
  previousData?: ChartDatum;
  thresholdData?: ChartDatum;
}

export type CommittedSpendTrendOverChartProps = CommittedSpendTrendOverChartOwnProps & WrappedComponentProps;

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

export const CommittedSpendTrendOverChart = injectIntl(CommittedSpendTrendOverChartBase);
