import 'routes/components/charts/common/chart.scss';

import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartLegend,
  ChartLegendTooltip,
  createContainer,
  getInteractiveLegendEvents,
} from '@patternfly/react-charts/victory';
import { Title } from '@patternfly/react-core';
import messages from 'locales/messages';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { getCostRangeString } from 'routes/components/charts/common/chart-datum';
import type { ChartSeries } from 'routes/components/charts/common/chart-utils';
import {
  getChartNames,
  getDomain,
  getLegendData,
  getResizeObserver,
  getTickFormat,
  getTickValues,
  getTooltipLabel,
  initHiddenSeries,
  isDataAvailable,
  isSeriesHidden,
} from 'routes/components/charts/common/chart-utils';
import ChartTheme from 'routes/components/charts/theme';
import type { FormatOptions, Formatter } from 'utils/format';
import { formatCurrencyAbbreviation } from 'utils/format';

import { styles } from './TrendChart.styles';

interface TrendChartOwnProps {
  baseHeight?: number;
  containerHeight?: number;
  currentData?: any;
  name?: string;
  padding?: any;
  previousData?: any;
  thresholdData?: any;
  title?: string;
  formatter?: Formatter;
  formatOptions?: FormatOptions;
}

type TrendChartProps = TrendChartOwnProps;

const TrendChart: React.FC<TrendChartProps> = ({
  baseHeight,
  currentData,
  formatter,
  formatOptions,
  name,
  padding,
  previousData,
  thresholdData,
  title,
}) => {
  const [containerRef] = useState(React.createRef<HTMLDivElement>());
  const [cursorVoronoiContainer, setCursorVoronoiContainer] = useState<any>();
  const [extraHeight, setExtraHeight] = useState(0);
  const [hiddenSeries, setHiddenSeries] = useState(new Set<number>());
  const [series, setSeries] = useState<ChartSeries[]>();
  const [units, setUnits] = useState('USD');
  const [width, setWidth] = useState(0);
  const intl = useIntl();

  // Clone original container. See https://issues.redhat.com/browse/COST-762
  const cloneContainer = () => {
    return cursorVoronoiContainer
      ? React.cloneElement(cursorVoronoiContainer, {
          disable: !isDataAvailable(series, hiddenSeries),
          labelComponent: (
            <ChartLegendTooltip
              legendData={getLegendData(series, hiddenSeries, true)}
              title={(datum: any) =>
                intl.formatMessage(messages.chartTooltipTitle, {
                  value: intl.formatDate(`${datum.key}T00:00:00`, {
                    month: 'long',
                    ...(!previousData && ({ year: 'numeric' } as any)),
                  }),
                })
              }
            />
          ),
        } as any)
      : undefined;
  };

  const getChart = (serie: ChartSeries, index: number) => {
    return (
      <ChartArea
        data={!hiddenSeries.has(index) ? serie.data : [{ y: null }]}
        interpolation="monotoneX"
        key={serie.childName}
        name={serie.childName}
        style={serie.style}
      />
    );
  };

  // Returns CursorVoronoiContainer component
  const getCursorVoronoiContainer = () => {
    // Note: Container order is important
    const CursorVoronoiContainer: any = createContainer('voronoi', 'cursor');

    return (
      <CursorVoronoiContainer
        cursorDimension="x"
        labels={({ datum }) => getTooltipLabel(datum, formatter, formatOptions)}
        mouseFollowTooltips
        voronoiDimension="x"
        voronoiPadding={getPadding()}
      />
    );
  };

  // Returns onMouseOver, onMouseOut, and onClick events for the interactive legend
  const getEvents = () => {
    const result = getInteractiveLegendEvents({
      chartNames: getChartNames(series),
      isHidden: index => isSeriesHidden(hiddenSeries, index),
      legendName: `${name}-legend`,
      onLegendClick: props => handleOnLegendClick(props.index),
    });
    return result;
  };

  const getHeight = () => {
    return baseHeight + extraHeight;
  };

  const getLegend = () => {
    return (
      <ChartLegend
        data={getLegendData(series, hiddenSeries)}
        gutter={20}
        height={25}
        name={`${name}-legend`}
        responsive={false}
        y={240}
      />
    );
  };

  const getTickValue = (t: number) => {
    return formatCurrencyAbbreviation(t, units);
  };

  const getUnits = () => {
    if (series) {
      for (const s of series) {
        for (const datum of s.data) {
          if (datum.units) {
            return datum.units;
          }
        }
      }
    }
    return 'USD';
  };

  const getPadding = () => {
    return padding
      ? padding
      : {
          bottom: 75 + extraHeight, // Maintain chart aspect ratio
          left: 55,
          right: 40,
          top: 8,
        };
  };

  const handleLegendAllowWrap = value => {
    if (value !== extraHeight) {
      setExtraHeight(value);
    }
  };

  // Hide each data series individually
  const handleOnLegendClick = (index: number) => {
    const newHiddenSeries = initHiddenSeries(series, hiddenSeries, index);
    setHiddenSeries(newHiddenSeries);
  };

  const handleOnResize = () => {
    const { clientWidth = 0 } = containerRef?.current || {};

    if (clientWidth !== width) {
      setWidth(clientWidth);
    }
  };

  const initDatum = () => {
    // Show all legends, regardless of data size

    const newSeries: ChartSeries[] = [];
    if (currentData && currentData.length) {
      newSeries.push({
        childName: 'current',
        data: currentData,
        legendItem: {
          name: getCostRangeString(
            currentData,
            messages.chartCurrentSpendLegendLabel,
            messages.chartCurrentSpendNoDataLegendLabel
          ),
          symbol: {
            fill: styles.currentColorScale[0],
            type: 'minus',
          },
          tooltip: getCostRangeString(currentData, messages.chartCurrentSpendTooltip),
        },
        style: {
          data: {
            ...styles.current,
            stroke: styles.currentColorScale[0],
          },
        },
      });
    }
    if (previousData && previousData.length) {
      newSeries.push({
        childName: 'previous',
        data: previousData,
        legendItem: {
          name: getCostRangeString(
            previousData,
            messages.chartPreviousSpendLegendLabel,
            messages.chartPreviousSpendNoDataLegendLabel
          ),
          symbol: {
            fill: styles.previousColorScale[0],
            type: 'minus',
          },
          tooltip: getCostRangeString(previousData, messages.chartPreviousSpendTooltip),
        },
        style: {
          data: {
            ...styles.previous,
            stroke: styles.previousColorScale[0],
          },
        },
      });
    }
    if (thresholdData && thresholdData.length) {
      newSeries.push({
        childName: 'threshold',
        data: thresholdData,
        legendItem: {
          name: getCostRangeString(
            thresholdData,
            messages.chartThresholdSpendLegendLabel,
            messages.chartThresholdSpendNoDataLegendLabel
          ),
          symbol: {
            fill: styles.thresholdColorScale[0],
            type: 'minus',
          },
          tooltip: getCostRangeString(thresholdData, messages.chartThresholdSpendTooltip),
        },
        style: {
          data: {
            ...styles.threshold,
            stroke: styles.thresholdColorScale[0],
          },
        },
      });
    }
    setSeries(newSeries);
    setCursorVoronoiContainer(getCursorVoronoiContainer());
    setHiddenSeries(new Set());
    setUnits(getUnits());
  };

  useMemo(() => {
    initDatum();
  }, [currentData, thresholdData]);

  useEffect(() => {
    const unobserve = getResizeObserver(containerRef?.current, handleOnResize);
    return () => {
      if (unobserve) {
        unobserve();
      }
    };
  }, [containerRef]);

  const chartHeight = getHeight();

  return (
    <>
      {title && (
        <Title headingLevel="h3" size="md">
          {title}
        </Title>
      )}
      <div className="chartOverride" ref={containerRef}>
        <div style={{ height: chartHeight }}>
          <Chart
            containerComponent={cloneContainer()}
            domain={getDomain(series, hiddenSeries)}
            events={getEvents()}
            height={chartHeight}
            legendAllowWrap={handleLegendAllowWrap}
            legendComponent={getLegend()}
            legendData={getLegendData(series, hiddenSeries)}
            legendPosition="bottom-left"
            name={name}
            padding={getPadding()}
            theme={ChartTheme}
            width={width}
          >
            {series &&
              series.map((s, index) => {
                return getChart(s, index);
              })}
            <ChartAxis
              fixLabelOverlap
              style={styles.xAxis}
              tickFormat={t => getTickFormat(t, previousData ? 'long' : 'short')}
              tickValues={getTickValues(series)}
            />
            <ChartAxis dependentAxis style={styles.yAxis} tickFormat={getTickValue} />
          </Chart>
        </div>
      </div>
    </>
  );
};

export { TrendChart };
