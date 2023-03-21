import type { Report } from 'api/reports/report';
import React from 'react';
import { transformReport } from 'routes/components/charts/common/chart-datum';

import { PerspectiveType } from './CommittedSpendTrend';
import { CommittedSpendTrendChart } from './CommittedSpendTrendChart';
import { styles } from './CommittedSpendTrendChart.styles';
import { CommittedSpendTrendOverChart } from './CommittedSpendTrendOverChart';

interface CommittedSpendTrendTransformOwnProps {
  chartName?: string;
  currentEndDate?: Date;
  currentReport?: Report;
  currentStartDate?: Date;
  perspective: PerspectiveType;
  previousEndDate?: Date;
  previousReport?: Report;
  previousStartDate?: Date;
  thresholdReport?: Report;
}

export type CommittedSpendTrendTransformProps = CommittedSpendTrendTransformOwnProps;

const CommittedSpendTrendTransform: React.FC<CommittedSpendTrendTransformProps> = ({
  chartName,
  currentEndDate,
  currentReport,
  currentStartDate,
  perspective,
  previousEndDate,
  previousReport,
  previousStartDate,
  thresholdReport,
}) => {
  const getData = () => {
    const current = currentReport
      ? transformReport({
          endDate: currentEndDate,
          report: currentReport,
          reportItem: 'actualSpend',
          startDate: currentStartDate,
        })
      : undefined;
    const previous = previousReport
      ? transformReport({
          endDate: previousEndDate,
          report: previousReport,
          reportItem: 'actualSpend',
          shiftDateByYear: 1,
          startDate: previousStartDate,
        })
      : undefined;
    const threshold = thresholdReport
      ? transformReport({
          endDate: currentEndDate,
          padWithPrevious: true,
          report: thresholdReport,
          reportItem: 'committedSpend',
          startDate: currentStartDate,
        })
      : undefined;

    return { current, previous, threshold } as any;
  };

  const getChart = () => {
    const { current, previous, threshold } = getData();

    // Charts are wrapped to ensure interactive legends work properly when changing the data series order
    if (perspective === PerspectiveType.previous_over_actual) {
      return (
        <CommittedSpendTrendOverChart
          currentData={current}
          chartName={`${chartName}-${perspective}`}
          previousData={previous}
          thresholdData={threshold}
        />
      );
    }
    return (
      <CommittedSpendTrendChart
        currentData={current}
        chartName={`${chartName}-${perspective}`}
        thresholdData={threshold}
      />
    );
  };

  return <div style={styles.chartContainer}>{getChart()}</div>;
};

export { CommittedSpendTrendTransform };
