import React from 'react';
import { BreakdownChart } from 'routes/components/charts/breakdown';

import { chartStyles, styles } from './ActualSpendBreakdownChart.styles';

interface ActualSpendBreakdownChartOwnProps {
  chartName?: string;
  data?: any[];
}

export type ActualSpendBreakdownChartProps = ActualSpendBreakdownChartOwnProps;

const ActualSpendBreakdownChart: React.FC<ActualSpendBreakdownChartProps> = ({ chartName, data }) => {
  const getChart = () => {
    return (
      <BreakdownChart
        adjustContainerHeight
        containerHeight={chartStyles.chartContainerHeight}
        height={chartStyles.chartHeight}
        name={chartName}
        top1stData={data.length > 0 ? data[0] : []}
        top2ndData={data.length > 1 ? data[1] : []}
        top3rdData={data.length > 2 ? data[2] : []}
        top4thData={data.length > 3 ? data[3] : []}
        top5thData={data.length > 4 ? data[4] : []}
        top6thData={data.length > 5 ? data[5] : []}
      />
    );
  };

  return <div style={styles.chartContainer}>{getChart()}</div>;
};

export { ActualSpendBreakdownChart };
