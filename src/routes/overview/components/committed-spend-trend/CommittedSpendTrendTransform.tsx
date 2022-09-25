import { Report } from 'api/reports/report';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { transformReport } from 'routes/components/charts/common/chart-datum';

import { PerspectiveType } from './CommittedSpendTrend';
import { CommittedSpendTrendChart } from './CommittedSpendTrendChart';
import { styles } from './CommittedSpendTrendChart.styles';
import { CommittedSpendTrendOverChart } from './CommittedSpendTrendOverChart';

interface CommittedSpendTrendTransformOwnProps {
  chartName?: string;
  currentReport?: Report;
  perspective: PerspectiveType;
  previousReport?: Report;
  thresholdReport?: Report;
}

export type CommittedSpendTrendTransformProps = CommittedSpendTrendTransformOwnProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendTrendTransformBase: React.FC<CommittedSpendTrendTransformProps> = ({
  chartName,
  currentReport,
  perspective,
  previousReport,
  thresholdReport,
}) => {
  const getData = () => {
    const startDate = new Date('2021-12-01T23:59:59z');
    const endDate = new Date('2022-12-01T23:59:59z');

    const current = currentReport ? transformReport({ report: currentReport, startDate, endDate }) : undefined;
    const threshold = thresholdReport ? transformReport({ report: thresholdReport, startDate, endDate }) : undefined;

    let previous;
    if (previousReport) {
      const previousStartDate = new Date(startDate.getTime());
      const previousEndDate = new Date(endDate.getTime());
      previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
      previousEndDate.setFullYear(previousEndDate.getFullYear() - 1);

      previous = transformReport({
        report: previousReport,
        startDate: previousStartDate,
        endDate: previousEndDate,
        shiftDateByYear: 1,
      });
    }
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

export const CommittedSpendTrendTransform = injectIntl(withRouter(CommittedSpendTrendTransformBase));
