import { MessageDescriptor } from '@formatjs/intl/src/types';
import { Report } from 'api/reports/report';
import { intl } from 'components/i18n';
import { endOfMonth, format, getDate, startOfMonth } from 'date-fns';
import messages from 'locales/messages';
import { formatCurrency, FormatOptions } from 'utils/format';
import { ComputedReportItem, getComputedReportItems } from 'utils/getComputedReportItems';
import { SortDirection } from 'utils/sort';

export interface ChartDatum {
  childName?: string;
  date?: string;
  key: string | number;
  name?: string | number;
  show?: boolean;
  tooltip?: string;
  units: string;
  x: string | number;
  y: number;
  y0?: number;
}

// The computed report cost or usage item
// eslint-disable-next-line no-shadow
export const enum ComputedReportItemType {
  cost = 'cost', // cost.total.value
  infrastructure = 'infrastructure', // infrastructure.total.value
  supplementary = 'supplementary', // supplementary.total.value
  usage = 'usage', // usage.value
}

// The computed report value
// eslint-disable-next-line no-shadow
export const enum ComputedReportItemValueType {
  none = 'none', // A value type is not used in this scenario (e.g., usage.value)
  markup = 'markup', // infrastructure.markup.value
  raw = 'raw', // infrastructure.raw.value
  total = 'total', // // infrastructure.total.value
  usage = 'usage', // infrastructure.usage.value
}

// eslint-disable-next-line no-shadow
export const enum ChartType {
  rolling,
  daily,
  monthly,
}

export function transformReport(
  report: Report,
  type: ChartType = ChartType.monthly,
  idKey: any = 'date',
  reportItem: string = 'cost',
  reportItemValue: string = 'total' // useful for infrastructure.usage values
): ChartDatum[] {
  if (!report) {
    return [];
  }
  const items = {
    idKey,
    report,
    sortKey: 'id',
    sortDirection: SortDirection.desc,
  } as any;
  const computedItems = getComputedReportItems(items);
  let chartDatums;
  if (type === ChartType.daily || type === ChartType.monthly) {
    chartDatums = computedItems.map(i => {
      const val = i[reportItem][reportItemValue] ? i[reportItem][reportItemValue].value : i[reportItem].value;
      return createReportDatum(val, i, idKey, reportItem, reportItemValue);
    });
  } else {
    chartDatums = computedItems.reduce<ChartDatum[]>((acc, d) => {
      const prevValue = acc.length ? acc[acc.length - 1].y : 0;
      const val = d[reportItem][reportItemValue] ? d[reportItem][reportItemValue].value : d[reportItem].value;
      return [...acc, createReportDatum(prevValue + val, d, idKey, reportItem, reportItemValue)];
    }, []);
  }
  return chartDatums;

  // TODO: Need to pad monthly, not daily
  // return idKey === 'date' ? padChartDatums(chartDatums, type) : chartDatums;
}

export function createReportDatum<T extends ComputedReportItem>(
  value: number,
  computedItem: T,
  idKey = 'date',
  reportItem: string = 'cost',
  reportItemValue: string = 'total' // useful for infrastructure.usage values
): ChartDatum {
  const xVal =
    idKey === 'date'
      ? intl.formatDate(computedItem.id, {
          month: 'long',
        })
      : computedItem.label;
  const yVal = isFloat(value) ? parseFloat(value.toFixed(2)) : isInt(value) ? value : 0;
  return {
    x: xVal,
    y: value === null ? null : yVal, // For displaying "no data" labels in chart tooltips
    key: computedItem.id,
    name: computedItem.label ? computedItem.label : computedItem.id, // legend item label
    units: computedItem[reportItem]
      ? computedItem[reportItem][reportItemValue]
        ? computedItem[reportItem][reportItemValue].units // cost, infrastructure, supplementary
        : computedItem[reportItem].units // capacity, limit, request, usage
      : undefined,
  };
}

// Fill in missing data with previous value to represent cumulative daily cost
export function fillChartDatums(datums: ChartDatum[], type: ChartType = ChartType.daily): ChartDatum[] {
  const result = [];
  if (!datums || datums.length === 0) {
    return result;
  }
  const firstDate = new Date(datums[0].key + 'T00:00:00');
  const lastDate = new Date(datums[datums.length - 1].key + 'T00:00:00');

  const padDate = startOfMonth(firstDate);
  let prevChartDatum;
  for (let i = padDate.getDate(); i <= endOfMonth(lastDate).getDate(); i++) {
    padDate.setDate(i);
    const id = format(padDate, 'yyyy-MM-dd');
    const chartDatum = datums.find(val => val.key === id);
    if (chartDatum) {
      result.push(chartDatum);
    } else if (prevChartDatum) {
      result.push({
        ...prevChartDatum,
        key: id,
        x: getDate(new Date(id + 'T00:00:00')),
      });
    }
    if (chartDatum) {
      // Note: We want to identify missing data, but charts won't extrapolate (connect data points) if we return null here
      // for missing daily values. For example, if there is only data for the first and last day of the month, charts would
      // typically draw a line between two points by default. However, showing "no data" is more obvious there was a problem.
      if (type === ChartType.daily) {
        prevChartDatum = {
          key: id,
          x: getDate(new Date(id + 'T00:00:00')),
          y: null,
        };
      } else {
        prevChartDatum = chartDatum;
      }
    }
  }
  return result;
}

// This pads chart datums with null datum objects, representing missing data at the beginning and end of the
// data series. The remaining data is left as is to allow for extrapolation. This allows us to display a "no data"
// message in the tooltip, which helps distinguish between zero values and when there is no data available.
export function padChartDatums(datums: ChartDatum[], type: ChartType = ChartType.daily): ChartDatum[] {
  const result = [];
  if (!datums || datums.length === 0) {
    return result;
  }
  const firstDate = new Date(datums[0].key + 'T00:00:00');
  const lastDate = new Date(datums[datums.length - 1].key + 'T00:00:00');

  // Pad start for missing data
  let padDate = startOfMonth(firstDate);
  for (let i = padDate.getDate(); i < firstDate.getDate(); i++) {
    padDate.setDate(i);
    const id = format(padDate, 'yyyy-MM-dd');
    result.push(createReportDatum(null, { id }, 'date', null));
  }

  // Fill middle with existing data
  result.push(...datums);

  // Pad end for missing data
  padDate = new Date(lastDate);
  for (let i = padDate.getDate() + 1; i <= endOfMonth(lastDate).getDate(); i++) {
    padDate.setDate(i);
    const id = format(padDate, 'yyyy-MM-dd');
    result.push(createReportDatum(null, { id }, 'date', null));
  }
  return fillChartDatums(result, type);
}

export function getDateRange(datums: ChartDatum[]): [Date, Date] {
  if (!(datums && datums.length)) {
    const today = new Date();
    return [today, today];
  }

  // Find the first populated (non-null) month
  let firstMonth = 0;
  for (let i = firstMonth; i < datums.length; i++) {
    if (datums[i].y && datums[i].y !== null) {
      firstMonth = i;
      break;
    }
  }

  // Find the last populated (non-null) month
  let lastMonth = datums.length - 1;
  for (let i = lastMonth; i >= 0; i--) {
    if (datums[i].y && datums[i].y !== null) {
      lastMonth = i;
      break;
    }
  }

  const start = new Date(datums[firstMonth].key + 'T00:00:00');
  const end = new Date(datums[lastMonth].key + 'T00:00:00');
  return [start, end];
}

export function getMaxValue(datums: ChartDatum[]) {
  let max = 0;
  if (datums && datums.length) {
    datums.forEach(datum => {
      if (datum.y > max) {
        max = datum.y;
      }
    });
  }
  return max;
}

export function getMaxMinValues(datums: ChartDatum[]) {
  let max = -1;
  let min = -1;
  if (datums && datums.length) {
    datums.forEach(datum => {
      const maxY = datum.y0 !== undefined ? Math.max(datum.y, datum.y0) : datum.y;
      const minY = datum.y0 !== undefined ? Math.min(datum.y, datum.y0) : datum.y;
      if (maxY > max) {
        max = maxY;
      }
      if ((min === -1 || minY < min) && minY !== null) {
        min = minY;
      }
    });
  }
  return { max, min };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getTooltipContent(formatter) {
  return function labelFormatter(value: number, unit: string = null, options: FormatOptions = {}) {
    return formatCurrency(value, unit, options);
  };
}

export function getCostRangeString(
  datums: ChartDatum[],
  key: MessageDescriptor,
  noDataKey: MessageDescriptor = messages.chartNoData
) {
  if (!(datums && datums.length)) {
    return intl.formatMessage(noDataKey);
  }
  const [start, end] = getDateRange(datums);
  const dateRange = intl.formatDateTimeRange(start, end, {
    month: 'long',
    year: 'numeric',
  });
  return intl.formatMessage(key, {
    dateRange,
  });
}

// Returns true if non negative integer
export function isInt(n) {
  const result = Number(n) === n && n % 1 === 0;
  return result && n >= 0;
}

// Returns true if non negative float
export function isFloat(n) {
  const result = Number(n) === n && n % 1 !== 0;
  return result && n >= 0;
}
