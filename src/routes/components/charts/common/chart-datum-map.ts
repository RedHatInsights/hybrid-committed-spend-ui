import type { Report } from 'api/reports/report';
import { format } from 'date-fns';
import { getUnsortedComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { getToday, getYear } from 'utils/dates';

import type { ChartDatum, PadData } from './chart-datum';
import { createReportDatum, DatumType } from './chart-datum';

export interface TransformData {
  datumType?: DatumType;
  endDate?: Date;
  idKey?: string; // This should be associated with a groupBy
  report?: Report;

  reportItem?: string;
  startDate?: Date;
}

// This transforms computed report items for bar charts, using date maps
export function transformReport({
  datumType,
  endDate,
  idKey,
  report,
  reportItem = 'actualSpend',
  startDate,
}: TransformData): ChartDatum[] {
  const result = [];
  if (!report) {
    return result;
  }

  const computedItems = getUnsortedComputedReportItems({
    idKey,
    isDateMap: true,
    report,
  } as any);

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
    result.push(datums);
  });
  return padChartDatums({ datums: result, endDate, startDate });
}

// This pads chart datums with null datum objects, representing missing data at the beginning and end of the
// data series. The remaining data is left as is to allow for extrapolation. This allows us to display a "no data"
// message in the tooltip, which helps distinguish between zero values and when there is no data available.
export function padChartDatums({ datums, startDate = getYear(1), endDate = getToday() }: PadData): ChartDatum[] {
  const result = [];
  if (!datums || datums.length === 0) {
    return result;
  }
  datums.map((items: any) => {
    const newItems = [];

    for (let padDate = new Date(startDate.getTime()); padDate < endDate; padDate.setMonth(padDate.getMonth() + 1)) {
      const date = format(padDate, 'yyyy-MM');
      const chartDatum = items.find(val => val.key === date);
      if (chartDatum) {
        newItems.push(chartDatum);
      } else {
        newItems.push(
          createReportDatum({
            computedItem: { date, id: items[0].name },
            value: null,
          })
        );
      }
    }
    result.push(newItems);
  });
  return result;
}
