import { getInteractiveLegendItemStyles } from '@patternfly/react-charts/victory';
import { intl } from 'components/i18n';
import messages from 'locales/messages';
import type { FormatOptions, Formatter } from 'utils/format';
import type { DomainTuple, VictoryStyleInterface } from 'victory-core';

import { getMaxMinValues, getTooltipContent, isFloat, isInt } from './chart-datum';

export interface ChartData {
  childName?: string;
  units?: string;
}

export interface ChartLegendItem {
  childName?: string;
  name?: string;
  symbol?: any;
  tooltip?: string;
}

export interface ChartSeries {
  childName?: string;
  data?: [ChartData];
  isBar?: boolean; // Used with daily charts
  isForecast?: boolean; // Used with daily charts
  isLine?: boolean; // Used with daily charts
  legendItem?: ChartLegendItem;
  style?: VictoryStyleInterface;
}

// Returns groups of chart names associated with each data series
export const getChartNames = (series: ChartSeries[]) => {
  const result = [];

  if (series) {
    series.map(serie => {
      // Each group of chart names are hidden / shown together
      result.push(serie.childName);
    });
  }
  return result as any;
};

export const getDomain = (series: ChartSeries[], hiddenSeries: Set<number>) => {
  const domain: { x?: DomainTuple; y?: DomainTuple } = {};
  let maxValue = -1;
  let minValue = -1;

  if (series) {
    series.forEach((s: any, index) => {
      if (!isSeriesHidden(hiddenSeries, index) && s.data && s.data.length !== 0) {
        const { max, min } = getMaxMinValues(s.data);
        maxValue = Math.max(maxValue, max);
        if (minValue === -1) {
          minValue = min;
        } else {
          minValue = Math.min(minValue, min);
        }
      }
    });
  }

  const threshold = maxValue * 0.1;
  const max = maxValue > 0 ? Math.ceil(maxValue + threshold) : 0;
  const _min = minValue > 0 ? Math.max(0, Math.floor(minValue - threshold)) : 0;
  const min = _min > 0 ? _min : 0;

  if (max > 0) {
    domain.y = [min, max];
  } else if (max <= 0) {
    domain.y = [0, 100];
  }
  return domain;
};

// Returns legend data styled per hiddenSeries
export const getLegendData = (series: ChartSeries[], hiddenSeries: Set<number>, tooltip: boolean = false) => {
  if (!series) {
    return undefined;
  }
  const result = series.map((s, index) => {
    const data = {
      childName: s.childName,
      ...s.legendItem, // name property
      ...(tooltip && { name: s.legendItem.tooltip }), // Override name property for tooltip
      ...getInteractiveLegendItemStyles(hiddenSeries.has(index)), // hidden styles
    };
    return data;
  });
  return result;
};

export const getTickFormat = (t: string, month: 'long' | 'short' = 'short', year: 'numeric' = undefined) => {
  if (isFloat(t) || isInt(t) || t?.trim().length === 0) {
    return t;
  }
  return intl.formatDate(`${t}T00:00:00`, {
    month,
    ...(year && ({ year } as any)),
  });
};

export const getTickValues = (series: ChartSeries[]) => {
  const result = [];

  if (series) {
    series.forEach((s: any) => {
      if (Array.isArray(s.data)) {
        s.data?.forEach((datum: any) => {
          if (!result.find(val => val === datum.x)) {
            result.push(datum.x);
          }
        });
      }
    });
  }
  return result.sort((a, b) => {
    if (new Date(a) < new Date(b)) {
      return -1;
    }
    if (new Date(a) > new Date(b)) {
      return 1;
    }
    return 0;
  });
};

// Note: Forecast is expected to use both datum.y and datum.y0
export const getTooltipLabel = (datum: any, formatter: Formatter, formatOptions: FormatOptions) => {
  const tooltipFormatter = getTooltipContent(formatter);
  const dy =
    datum.y !== undefined && datum.y !== null ? tooltipFormatter(datum.y, datum.units, formatOptions) : undefined;

  return dy !== undefined ? dy : intl.formatMessage(messages.chartNoData);
};

export const getResizeObserver = (containerRef: HTMLDivElement, handleOnResize: () => void) => {
  const containerElement = containerRef;
  const { ResizeObserver } = window as any;
  let _navToggle;
  let _resizeObserver;

  if (containerElement && ResizeObserver) {
    const resizeObserver = new ResizeObserver(entries => {
      // We wrap it in requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        handleOnResize();
      });
    });
    resizeObserver.observe(containerElement);
    _resizeObserver = () => resizeObserver.unobserve(containerElement);
  } else {
    handleOnResize();
    window.addEventListener('resize', handleOnResize);
    _resizeObserver = () => window.removeEventListener('resize', handleOnResize);
    _navToggle = insights.chrome.on('NAVIGATION_TOGGLE', setTimeout(handleOnResize, 500));
  }

  return () => {
    if (_resizeObserver) {
      _resizeObserver();
    }
    if (_navToggle) {
      _navToggle();
    }
  };
};

export const initHiddenSeries = (series: ChartSeries[], hiddenSeries: Set<number>, index: number) => {
  const result = new Set(hiddenSeries);
  if (!result.delete(index)) {
    result.add(index);
  }
  return result;
};

// Returns true if at least one data series is available
export const isDataAvailable = (series: ChartSeries[], hiddenSeries: Set<number>) => {
  const unavailable = []; // API data may not be available (e.g., on 1st of month)

  if (series) {
    series.forEach((s: any, index) => {
      if (isSeriesHidden(hiddenSeries, index) || (s.data && s.data.length === 0)) {
        unavailable.push(index);
      }
    });
  }
  return unavailable.length !== (series ? series.length : 0);
};

// Returns true if data series is hidden
export const isDataHidden = (series: ChartSeries[], hiddenSeries: Set<number>, data: any) => {
  if (data && data.length) {
    for (let keys = hiddenSeries.keys(), key; !(key = keys.next()).done; ) {
      let dataChildName;
      let serieChildName;

      for (const item of data) {
        if (item.childName) {
          dataChildName = item.childName;
          break;
        }
      }
      for (const item of series[key.value].data) {
        if (item.childName) {
          serieChildName = item.childName;
          break;
        }
      }
      if (serieChildName && dataChildName && serieChildName === dataChildName) {
        return true;
      }
    }
  }
  return false;
};

// Returns true if data series is hidden
export const isSeriesHidden = (hiddenSeries: Set<number>, index: number) => {
  return hiddenSeries.has(index);
};
