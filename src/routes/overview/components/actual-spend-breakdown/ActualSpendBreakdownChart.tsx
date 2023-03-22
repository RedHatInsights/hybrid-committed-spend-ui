import React from 'react';
import { BreakdownChart } from 'routes/components/charts/breakdown';

import { chartStyles, styles } from './ActualSpendBreakdownChart.styles';

interface ActualSpendBreakdownChartOwnProps {
  chartName?: string;
  datums?: any[];
}

export type ActualSpendBreakdownChartProps = ActualSpendBreakdownChartOwnProps;

const ActualSpendBreakdownChart: React.FC<ActualSpendBreakdownChartProps> = ({ chartName, datums }) => {
  const getChart = () => {
    return (
      <BreakdownChart
        adjustContainerHeight
        containerHeight={chartStyles.chartContainerHeight}
        height={chartStyles.chartHeight}
        name={chartName}
        top1stData={datums.length > 0 ? datums[0] : []}
        top2ndData={datums.length > 1 ? datums[1] : []}
        top3rdData={datums.length > 2 ? datums[2] : []}
        top4thData={datums.length > 3 ? datums[3] : []}
        top5thData={datums.length > 4 ? datums[4] : []}
        top6thData={datums.length > 5 ? datums[5] : []}
      />
    );
  };

  return <div style={styles.chartContainer}>{getChart()}</div>;
};

export { ActualSpendBreakdownChart };
