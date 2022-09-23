import { Report } from 'api/reports/report';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { transformReport } from 'routes/components/charts/common/chart-datum-utils';
import { TrendChart } from 'routes/components/charts/trend-chart';

import { PerspectiveType } from './CommittedSpendTrend';
import { chartStyles, styles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendChartOwnProps {
  chartName?: string;
  currentReport?: Report;
  perspective?: PerspectiveType;
  previousReport?: Report;
  thresholdReport?: Report;
}

export type CommittedSpendTrendChartProps = CommittedSpendTrendChartOwnProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendTrendChartBase: React.FC<CommittedSpendTrendChartProps> = ({
  chartName,
  currentReport,
  perspective,
  previousReport,
  thresholdReport,
}) => {
  const getChart = () => {
    let previous;
    if (perspective === PerspectiveType.previous_over_actual) {
      previous = transformReport({
        report: previousReport,
        startDate: new Date('2020-12-01T23:59:59z'),
        endDate: new Date('2021-12-01T23:59:59z'),
        shiftDateByYear: 1,
      });
    }

    const startDate = new Date('2021-12-01T23:59:59z');
    const endDate = new Date('2022-12-01T23:59:59z');
    const current = transformReport({ report: currentReport, startDate, endDate });
    const threshold = transformReport({ report: thresholdReport, startDate, endDate });

    return (
      <TrendChart
        adjustContainerHeight
        containerHeight={chartStyles.chartContainerHeight}
        currentData={current}
        height={chartStyles.chartHeight}
        name={chartName}
        previousData={previous}
        thresholdData={threshold}
        isYearVisible={!previous}
      />
    );
  };

  return <div style={styles.chartContainer}>{getChart()}</div>;
};

export const CommittedSpendTrendChart = injectIntl(withRouter(CommittedSpendTrendChartBase));
