import type { Report } from 'api/reports/report';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { transformReport } from 'routes/components/charts/common/chart-datum';

import { PerspectiveType } from './CommittedSpendTrend';
import { CommittedSpendTrendChart } from './CommittedSpendTrendChart';
import { styles } from './CommittedSpendTrendChart.styles';
import { CommittedSpendTrendOverChart } from './CommittedSpendTrendOverChart';

interface CommittedSpendTrendTransformOwnProps {
  chartName?: string;
  currentReport?: Report;
  endDate?: Date;
  perspective: PerspectiveType;
  previousReport?: Report;
  thresholdReport?: Report;
  startDate?: Date;
}

export type CommittedSpendTrendTransformProps = CommittedSpendTrendTransformOwnProps & WrappedComponentProps;

const CommittedSpendTrendTransformBase: React.FC<CommittedSpendTrendTransformProps> = ({
  chartName,
  currentReport,
  endDate,
  perspective,
  previousReport,
  startDate,
  thresholdReport,
}) => {
  const getData = () => {
    const current = currentReport
      ? transformReport({ endDate, report: currentReport, reportItem: 'actualSpend', startDate })
      : undefined;
    const previous = previousReport
      ? transformReport({
          endDate,
          report: previousReport,
          reportItem: 'actualSpend',
          shiftDateByYear: 1,
          startDate,
        })
      : undefined;
    const threshold = thresholdReport
      ? transformReport({
          endDate,
          padWithPrevious: true,
          report: thresholdReport,
          reportItem: 'committedSpend',
          startDate,
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

export const CommittedSpendTrendTransform = injectIntl(CommittedSpendTrendTransformBase);
