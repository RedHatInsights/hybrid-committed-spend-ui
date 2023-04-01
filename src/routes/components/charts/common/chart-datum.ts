import type { MessageDescriptor } from '@formatjs/intl/src/types';
import type { Report } from 'api/reports/report';
import { intl } from 'components/i18n';
import { format } from 'date-fns';
import messages from 'locales/messages';
import type { ComputedReportItem } from 'utils/computedReport/getComputedReportItems';
import { getComputedReportItems } from 'utils/computedReport/getComputedReportItems';
import { getToday, getYear } from 'utils/dates';
import type { FormatOptions } from 'utils/format';
import { formatCurrency } from 'utils/format';
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
  datumType?: DatumType;
  report: Report;
  startDate?: Date;
  endDate?: Date;
  padWithPrevious?: boolean; // Used with committed spend threshold
  shiftDateByYear?: number; // Shift the year, so we can overlap current and previous months
  reportItem?: string;
  reportItemValue?: string; // useful for infrastructure.usage values
}

export interface ReportData<T extends ComputedReportItem> {
  computedItem: T;
  idKey?: string;
  isForceNoData?: boolean;
  shiftDateByYear?; // Shift the year, so we can overlap current and previous months
  reportItem?: string;
  reportItemValue?: string; // useful for infrastructure.usage values
  value: number;
}

export interface PadData {
  datums: ChartDatum[];
  endDate?: Date;
  padWithPrevious?: boolean;
  startDate?: Date;
}

// The computed report cost or usage item
// eslint-disable-next-line no-shadow
export const enum ComputedReportItemType {
  actualSpend = 'actualSpend',
  committedSpend = 'committedSpend',
}

// eslint-disable-next-line no-shadow
export const enum DatumType {
  cumulative,
  rolling,
}

// This transforms computed report items for line and area charts
export function transformReport({
  datumType,
  report,
  startDate,
  endDate,
  padWithPrevious,
  shiftDateByYear = 0, // Shift the year, so we can overlap current and previous months
  reportItem = 'actualSpend',
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
  if (datumType === DatumType.cumulative) {
    datums = computedItems.reduce<ChartDatum[]>((acc, d) => {
      const prevValue = acc.length ? acc[acc.length - 1].y : 0;
      const val = d[reportItem] ? d[reportItem].value : d[reportItem].value;
      return [...acc, createReportDatum({ value: prevValue + val, computedItem: d, shiftDateByYear, reportItem })];
    }, []);
  } else {
    datums = computedItems.map(computedItem => {
      const value = computedItem[reportItem] ? computedItem[reportItem].value : undefined;
      return createReportDatum({ value, computedItem, shiftDateByYear, reportItem });
    });
  }
  return padChartDatums({ datums, startDate, endDate, padWithPrevious });
}

export function createReportDatum<T extends ComputedReportItem>({
  computedItem,
  idKey = 'date',
  shiftDateByYear = 0, // Shift the year, so we can overlap current and previous months
  reportItem = 'actualSpend',
  value,
}: ReportData<T>): ChartDatum {
  const getDate = () => {
    return new Date(`${computedItem.date}T00:00:00`);
  };
  const getXVal = () => {
    if (idKey === 'date' || shiftDateByYear > 0) {
      const date = getDate();
      if (shiftDateByYear > 0) {
        date.setFullYear(date.getFullYear() + shiftDateByYear);
      }
      return format(date, 'yyyy-MM');
    }
    return computedItem.label;
  };
  const xVal = getXVal();
  const yVal = isFloat(value) ? parseFloat(value.toFixed(2)) : isInt(value) ? value : null;
  return {
    x: xVal,
    y: value === null ? null : yVal, // For displaying "no data" labels in chart tooltips\
    key: idKey === 'date' ? format(getDate(), 'yyyy-MM') : computedItem.id,
    name: computedItem.label ? computedItem.label : computedItem.id, // legend item label
    units: computedItem[reportItem] ? computedItem[reportItem].units : undefined,
  };
}

// This pads chart datums with null datum objects, representing missing data at the beginning and end of the
// data series. The remaining data is left as is to allow for extrapolation. This allows us to display a "no data"
// message in the tooltip, which helps distinguish between zero values and when there is no data available.
export function padChartDatums({
  datums,
  startDate = getYear(1),
  endDate = getToday(),
  padWithPrevious,
}: PadData): ChartDatum[] {
  const result = [];
  if (!datums || datums.length === 0) {
    return result;
  }

  const padDate = new Date(startDate.getTime());
  padDate.setDate(1); // Workaround to increment month properly

  let prevChartDatum;
  for (; padDate < endDate; padDate.setMonth(padDate.getMonth() + 1)) {
    const date = format(padDate, 'yyyy-MM');
    const chartDatum = datums.find(val => val.key === date);
    if (chartDatum) {
      result.push(chartDatum);
    } else {
      result.push(
        createReportDatum({
          computedItem: { date, id: date },
          value: padWithPrevious && prevChartDatum ? prevChartDatum.y : null,
        })
      );
    }
    prevChartDatum = chartDatum;
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

  const start = new Date(`${datums[firstMonth].key}T00:00:00`);
  const end = new Date(`${datums[lastMonth].key}T00:00:00`);
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
