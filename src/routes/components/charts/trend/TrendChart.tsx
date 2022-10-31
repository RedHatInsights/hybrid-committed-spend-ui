import 'routes/components/charts/common/chart.scss';

import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartLegend,
  ChartLegendTooltip,
  createContainer,
  getInteractiveLegendEvents,
} from '@patternfly/react-charts';
import { Title } from '@patternfly/react-core';
import messages from 'locales/messages';
import React, { useEffect, useMemo, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { getCostRangeString, isFloat, isInt } from 'routes/components/charts/common/chart-datum';
import type { ChartSeries } from 'routes/components/charts/common/chart-utils';
import {
  getChartNames,
  getDomain,
  getLegendData,
  getResizeObserver,
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
  adjustContainerHeight?: boolean;
  containerHeight?: number;
  currentData?: any;
  height?: number;
  name?: string;
  padding?: any;
  previousData?: any;
  thresholdData?: any;
  title?: string;
  formatter?: Formatter;
  formatOptions?: FormatOptions;
}

type TrendChartProps = TrendChartOwnProps & WrappedComponentProps;

const TrendChartBase: React.FC<TrendChartProps> = ({
  adjustContainerHeight,
  containerHeight,
  currentData,
  formatter,
  formatOptions,
  height,
  intl,
  name,
  padding = {
    bottom: 75,
    left: 55,
    right: 40,
    top: 8,
  },
  previousData,
  thresholdData,
  title,
}) => {
  const [containerRef] = useState(React.createRef<HTMLDivElement>());
  const [cursorVoronoiContainer, setCursorVoronoiContainer] = useState<any>();
  const [hiddenSeries, setHiddenSeries] = useState(new Set<number>());
  const [series, setSeries] = useState<ChartSeries[]>();
  const [units, setUnits] = useState('USD');
  const [width, setWidth] = useState(0);

  // Clone original container. See https://issues.redhat.com/browse/COST-762
  const cloneContainer = () => {
    return cursorVoronoiContainer
      ? React.cloneElement(cursorVoronoiContainer, {
          disable: !isDataAvailable(series, hiddenSeries),
          labelComponent: (
            <ChartLegendTooltip
              legendData={getLegendData(series, hiddenSeries, true)}
              title={datum =>
                intl.formatMessage(messages.chartTooltipTitle, {
                  value: intl.formatDate(`${datum.key}T00:00:00`, {
                    month: 'long',
                    ...(!previousData && { year: 'numeric' }),
                  }),
                })
              }
            />
          ),
        })
      : undefined;
  };

  const getAdjustedContainerHeight = () => {
    let adjustedContainerHeight = containerHeight;
    if (adjustContainerHeight) {
      if (width > 950 && width < 1150) {
        adjustedContainerHeight += 25;
      } else if (width <= 950) {
        adjustedContainerHeight += 50;
      }
    }
    return adjustedContainerHeight;
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
        voronoiPadding={{
          bottom: 75,
          left: 55,
          right: 40,
          top: 8,
        }}
      />
    );
  };

  // Returns onMouseOver, onMouseOut, and onClick events for the interactive legend
  const getEvents = () => {
    const result = getInteractiveLegendEvents({
      chartNames: getChartNames(series),
      isHidden: index => isSeriesHidden(hiddenSeries, index),
      legendName: `${name}-legend`,
      onLegendClick: props => handleLegendClick(props.index),
    });
    return result;
  };

  const getLegend = () => {
    return (
      <ChartLegend
        data={getLegendData(series, hiddenSeries)}
        gutter={20}
        height={25}
        itemsPerRow={width < 550 ? 1 : undefined}
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

  // Hide each data series individually
  const handleLegendClick = (index: number) => {
    const newHiddenSeries = initHiddenSeries(series, hiddenSeries, index);
    setHiddenSeries(newHiddenSeries);
  };

  const handleResize = () => {
    const { clientWidth = 0 } = containerRef.current || {};

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
    const unobserve = getResizeObserver(containerRef.current, handleResize);
    return () => {
      if (unobserve) {
        unobserve();
      }
    };
  }, [containerRef]);

  return (
    <>
      {title && (
        <Title headingLevel="h3" size="md">
          {title}
        </Title>
      )}
      <div className="chartOverride" ref={containerRef} style={{ height: getAdjustedContainerHeight() }}>
        <div style={{ height, width }}>
          <Chart
            containerComponent={cloneContainer()}
            domain={getDomain(series, hiddenSeries)}
            events={getEvents()}
            height={height}
            legendAllowWrap
            legendComponent={getLegend()}
            legendData={getLegendData(series, hiddenSeries)}
            legendPosition="bottom-left"
            name={name}
            padding={padding}
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
              tickFormat={t => {
                if (isFloat(t) || isInt(t)) {
                  return t;
                }
                return intl.formatDate(`${t}T00:00:00`, {
                  month: previousData ? 'long' : 'short',
                  ...(!previousData && { year: 'numeric' }),
                });
              }}
              tickValues={getTickValues(series)}
            />
            <ChartAxis dependentAxis style={styles.yAxis} tickFormat={getTickValue} />
          </Chart>
        </div>
      </div>
    </>
  );
};

const TrendChart = injectIntl(TrendChartBase);

export { TrendChart };
