import { Report } from 'api/reports/report';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { transformReport } from 'routes/components/charts/common/chart-datum-utils';
import { TrendChart } from 'routes/components/charts/trend-chart';
import { TrendOverChart } from 'routes/components/charts/trend-over-chart';

import { chartStyles, styles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendChartOwnProps {
  chartName?: string;
  currentReport?: Report;
  previousReport?: Report;
  thresholdReport?: Report;
}

export type CommittedSpendTrendChartProps = CommittedSpendTrendChartOwnProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendTrendChartBase: React.FC<CommittedSpendTrendChartProps> = ({
  chartName,
  currentReport,
  previousReport,
  thresholdReport,
}) => {
  const getChart = () => {
    const startDate = new Date('2021-12-01T23:59:59z');
    const endDate = new Date('2022-12-01T23:59:59z');

    const current = currentReport ? transformReport({ report: currentReport, startDate, endDate }) : undefined;
    const threshold = thresholdReport ? transformReport({ report: thresholdReport, startDate, endDate }) : undefined;

    if (previousReport) {
      const previousStartDate = new Date(startDate.getTime());
      const previousEndDate = new Date(endDate.getTime());
      previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
      previousEndDate.setFullYear(previousEndDate.getFullYear() - 1);

      const previous = transformReport({
        report: previousReport,
        startDate: previousStartDate,
        endDate: previousEndDate,
        shiftDateByYear: 1,
      });

      return (
        <TrendOverChart
          adjustContainerHeight
          containerHeight={chartStyles.chartContainerHeight}
          currentData={current}
          height={chartStyles.chartHeight}
          name={chartName}
          previousData={previous}
          thresholdData={threshold}
        />
      );
    }
    return (
      <TrendChart
        adjustContainerHeight
        containerHeight={chartStyles.chartContainerHeight}
        currentData={current}
        height={chartStyles.chartHeight}
        name={chartName}
        thresholdData={threshold}
      />
    );
  };

  return <div style={styles.chartContainer}>{getChart()}</div>;
};

export const CommittedSpendTrendChart = injectIntl(withRouter(CommittedSpendTrendChartBase));
