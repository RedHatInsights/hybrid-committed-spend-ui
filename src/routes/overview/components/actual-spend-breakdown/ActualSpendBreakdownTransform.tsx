import type { Report } from 'api/reports/report';
import React from 'react';
import { transformReport } from 'routes/components/charts/common/chart-datum-map';

import { ActualSpendBreakdownChart } from './ActualSpendBreakdownChart';

interface ActualSpendBreakdownTransformOwnProps {
  chartName?: string;
  endDate?: Date;
  groupBy?: string;
  report?: Report;
  startDate?: Date;
}

export type ActualSpendBreakdownTransformProps = ActualSpendBreakdownTransformOwnProps;

const ActualSpendBreakdownTransform: React.FC<ActualSpendBreakdownTransformProps> = ({
  chartName,
  endDate,
  groupBy,
  report,
  startDate,
}) => {
  const getData = () => {
    const data = transformReport({ endDate, idKey: groupBy, report, startDate });
    return { data };
  };

  const getChart = () => {
    const { data } = getData();
    return <ActualSpendBreakdownChart chartName={chartName} data={data} />;
  };

  return getChart();
};

export { ActualSpendBreakdownTransform };
