import { MessageDescriptor } from '@formatjs/intl/src/types';
import { Report } from 'api/reports/report';
import { intl } from 'components/i18n';
import { format } from 'date-fns';
import messages from 'locales/messages';
import { getToday, getYear } from 'utils/dateRange';
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

export interface TransformData {
  report: Report;
  startDate?: Date;
  endDate?: Date;
  offset?: number; // Shift the year, so we can overlap current and previous months
  type?: ChartType;
  reportItem?: string;
  reportItemValue?: string; // useful for infrastructure.usage values
}

export interface ReportData<T extends ComputedReportItem> {
  computedItem: T;
  idKey?: string;
  isForceNoData?: boolean;
  offset?;
  reportItem?: string;
  reportItemValue?: string; // useful for infrastructure.usage values
  value: number;
}

export interface PadtData {
  datums: ChartDatum[];
  endDate?: Date;
  startDate?: Date;
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
  cumulative,
}

export function transformReport({
  report,
  startDate,
  endDate,
  offset = 0, // Shift the year, so we can overlap current and previous months
  type,
  reportItem = 'cost',
  reportItemValue = 'total', // useful for infrastructure.usage values
}: TransformData): ChartDatum[] {
  if (!report) {
    return [];
  }
  const items = {
    report,
    sortKey: 'date',
    sortDirection: SortDirection.desc,
  } as any;
  const computedItems = getComputedReportItems(items);
  let datums;
  if (type === ChartType.cumulative) {
    datums = computedItems.reduce<ChartDatum[]>((acc, d) => {
      const prevValue = acc.length ? acc[acc.length - 1].y : 0;
      const val = d[reportItem][reportItemValue] ? d[reportItem][reportItemValue].value : d[reportItem].value;
      return [
        ...acc,
        createReportDatum({ value: prevValue + val, computedItem: d, offset, reportItem, reportItemValue }),
      ];
    }, []);
  } else {
    datums = computedItems.map(computedItem => {
      const value = computedItem[reportItem][reportItemValue]
        ? computedItem[reportItem][reportItemValue].value
        : undefined;
      return createReportDatum({ value, computedItem, offset, reportItem, reportItemValue });
    });
  }
  return padChartDatums({ datums, startDate, endDate });
}

export function createReportDatum<T extends ComputedReportItem>({
  computedItem,
  idKey = 'date',
  isForceNoData,
  offset = 0, // Shift the year, so we can overlap current and previous months
  reportItem = 'cost',
  reportItemValue = 'total', // useful for infrastructure.usage values
  value,
}: ReportData<T>): ChartDatum {
  const getXVal = () => {
    if (idKey === 'date' || offset > 0) {
      const date = new Date(computedItem.date + 'T00:00:00');
      if (offset > 0) {
        date.setFullYear(date.getFullYear() + offset);
      }
      return format(date, 'yyyy-MM');
    }
    return computedItem.date;
  };
  const xVal = getXVal();
  const yVal = isFloat(value) ? parseFloat(value.toFixed(2)) : isInt(value) ? value : 0;
  return {
    x: idKey === 'date' ? xVal : computedItem.date,
    y: value === null ? null : yVal, // For displaying "no data" labels in chart tooltips
    ...(value === null && isForceNoData && { _y: 0 }), // Todo: Force "no data" tooltips for bar charts.
    key: xVal,
    name: computedItem.label ? computedItem.label : computedItem.id, // legend item label
    units: computedItem[reportItem]
      ? computedItem[reportItem][reportItemValue]
        ? computedItem[reportItem][reportItemValue].units // cost, infrastructure, supplementary
        : computedItem[reportItem].units // capacity, limit, request, usage
      : undefined,
  };
}

// This pads chart datums with null datum objects, representing missing data at the beginning and end of the
// data series. The remaining data is left as is to allow for extrapolation. This allows us to display a "no data"
// message in the tooltip, which helps distinguish between zero values and when there is no data available.
export function padChartDatums({ datums, startDate = getYear(1), endDate = getToday() }: PadtData): ChartDatum[] {
  const result = [];
  if (!datums || datums.length === 0) {
    return result;
  }
  for (const padDate = new Date(startDate.getTime()); padDate <= endDate; padDate.setMonth(padDate.getMonth() + 1)) {
    const date = format(padDate, 'yyyy-MM');
    const chartDatum = datums.find(val => val.key === date);
    if (chartDatum) {
      result.push(chartDatum);
    } else {
      result.push(
        createReportDatum({
          value: null,
          computedItem: { date },
          reportItemValue: null,
        })
      );
    }
  }
  return result;
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
