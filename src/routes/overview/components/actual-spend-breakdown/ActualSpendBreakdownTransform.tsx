import type { Report } from 'api/reports/report';
import { format } from 'date-fns';
import React from 'react';
import type { ChartDatum } from 'routes/components/charts/common/chart-datum';
import { createReportDatum, DatumType } from 'routes/components/charts/common/chart-datum';
import type { ComputedReportItem } from 'utils/computedReport/getComputedReportItems';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';

import { ActualSpendBreakdownChart } from './ActualSpendBreakdownChart';

interface ActualSpendBreakdownTransformOwnProps {
  chartName?: string;
  datumType?: DatumType;
  endDate?: Date;
  groupBy?: string;
  report?: Report;
  startDate?: Date;
}

export type ActualSpendBreakdownTransformProps = ActualSpendBreakdownTransformOwnProps;

const ActualSpendBreakdownTransform: React.FC<ActualSpendBreakdownTransformProps> = ({
  chartName,
  datumType,
  endDate,
  groupBy,
  report,
  startDate,
}) => {
  const getChartDatums = (computedItems: ComputedReportItem[]) => {
    const reportItem = 'actualSpend';
    const chartDatums = [];

    computedItems.map(computedItem => {
      let datums = [];

      if (computedItem instanceof Map) {
        const items = Array.from(computedItem.values());

        // Show cumulative
        if (datumType === DatumType.cumulative) {
          datums = items.reduce<ChartDatum[]>((acc, d: any) => {
            const prevValue = acc.length ? acc[acc.length - 1].y : 0;
            const val = d[reportItem] ? d[reportItem].value : null;
            return [...acc, createReportDatum({ value: prevValue + val, computedItem: d, reportItem })];
          }, []);
        } else {
          items.map((i: any) => {
            const value = i[reportItem] ? i[reportItem].value : null;
            datums.push(createReportDatum({ value, computedItem: i, reportItem }));
          });
        }
      }
      chartDatums.push(datums);
    });
    return padChartDatums(chartDatums);
  };

  const getComputedItems = () => {
    return getUnsortedComputedReportItems({
      idKey: groupBy,
      isDateMap: true,
      report,
    } as any);
  };

  // This pads chart datums with null datum objects, representing missing data at the beginning and end of the
  // data series. The remaining data is left as is to allow for extrapolation. This allows us to display a "no data"
  // message in the tooltip, which helps distinguish between zero values and when there is no data available.
  const padChartDatums = (items: any[]): ChartDatum[] => {
    const result = [];

    items.map(datums => {
      const newItems = [];

      for (let padDate = new Date(startDate.getTime()); padDate < endDate; padDate.setMonth(padDate.getMonth() + 1)) {
        const date = format(padDate, 'yyyy-MM');
        const chartDatum = datums.find(val => val.key === date);
        if (chartDatum) {
          newItems.push(chartDatum);
        } else {
          newItems.push(
            createReportDatum({
              computedItem: { date, id: datums[0].name },
              value: null,
            })
          );
        }
      }
      result.push(newItems);
    });
    return result;
  };

  const computedItems = getComputedItems();
  const datums = getChartDatums(computedItems);

  return <ActualSpendBreakdownChart chartName={chartName} datums={datums} />;
};

export { ActualSpendBreakdownTransform };
