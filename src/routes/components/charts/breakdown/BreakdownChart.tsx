import 'routes/components/charts/common/chart.scss';

import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartGroup,
  ChartLegend,
  ChartLegendTooltip,
  ChartThemeColor,
  createContainer,
  getInteractiveLegendEvents,
} from '@patternfly/react-charts';
import messages from 'locales/messages';
import React, { useEffect, useMemo, useState } from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { getMaxValue, isFloat, isInt } from 'routes/components/charts/common/chart-datum';
import type { ChartSeries } from 'routes/components/charts/common/chart-utils';
import {
  getChartNames,
  getLegendData,
  getResizeObserver,
  getTickValues,
  getTooltipLabel,
  initHiddenSeries,
  isDataAvailable,
  isDataHidden,
  isSeriesHidden,
} from 'routes/components/charts/common/chart-utils';
import ChartTheme from 'routes/components/charts/theme';
import type { FormatOptions, Formatter } from 'utils/format';
import { formatCurrencyAbbreviation } from 'utils/format';

import { styles } from './BreakdownChart.styles';

interface BreakdownChartOwnProps {
  adjustContainerHeight?: boolean;
  containerHeight?: number;
  formatOptions?: FormatOptions;
  formatter?: Formatter;
  height?: number;
  legendItemsPerRow?: number;
  name?: string;
  padding?: any;
  top1stData: any;
  top2ndData: any;
  top3rdData: any;
  top4thData: any;
  top5thData: any;
  top6thData: any;
}

type BreakdownChartProps = BreakdownChartOwnProps & WrappedComponentProps;

const BreakdownChartBase: React.FC<BreakdownChartProps> = ({
  adjustContainerHeight,
  containerHeight,
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
  top1stData,
  top2ndData,
  top3rdData,
  top4thData,
  top5thData,
  top6thData,
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
                  value: intl.formatDate(`${datum.x}T00:00:00`, {
                    month: 'long',
                    year: 'numeric',
                  }),
                })
              }
            />
          ),
        } as any)
      : undefined;
  };

  const getAdjustedContainerHeight = () => {
    let adjustedContainerHeight = containerHeight;
    if (adjustContainerHeight) {
      if (width < 550) {
        adjustedContainerHeight += 25;
      }
    }
    return adjustedContainerHeight;
  };

  // If bar width exceeds max and domainPadding is true, extra width is returned to help center bars horizontally
  const getBarWidth = (domainPadding = false) => {
    const maxWidth = 10;
    let maxValue = -1;

    if (series) {
      series.forEach((s: any, index) => {
        if (!isSeriesHidden(hiddenSeries, index) && s.data && s.data.length !== 0) {
          if (s.data.length > maxValue) {
            maxValue = s.data.length;
          }
        }
      });
      maxValue = maxValue * series.length;
    }

    // Divide available width into equal sections
    const sections = maxValue * 2 + 1;
    const sectionWidth = maxValue > 0 ? width / sections : 0;

    if (domainPadding) {
      // Add any extra bar width for domain padding
      const extraWidth = sectionWidth > maxWidth ? (sectionWidth - maxWidth) * maxValue : 0;
      return (sectionWidth + extraWidth / 2) * 2;
    }
    return sectionWidth > maxWidth ? maxWidth : sectionWidth;
  };

  const getChart = (serie: ChartSeries, index: number, barWidth: number) => {
    const data = !hiddenSeries.has(index) ? serie.data : [{ y: null }];

    return (
      <ChartBar barWidth={barWidth} data={data} key={serie.childName} name={serie.childName} style={serie.style} />
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

  // Returns domain only if max y values are zero
  const getDomain = () => {
    let maxValue = -1;
    let domain;

    if (series) {
      series.forEach((s: any, index) => {
        if (!isSeriesHidden(hiddenSeries, index) && s.data && s.data.length !== 0) {
          const max = getMaxValue(s.data);
          maxValue = Math.max(maxValue, max);
        }
      });
    }

    if (maxValue <= 0) {
      domain = { y: [0, 100] };
    }
    return domain;
  };

  // Returns onMouseOver, onMouseOut, and onClick events for the interactive legend
  const getEvents = () => {
    const result = getInteractiveLegendEvents({
      chartNames: getChartNames(series),
      isDataHidden: data => isDataHidden(series, hiddenSeries, data),
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
        name={`${name}-legend`}
        responsive={false}
        y={240}
      />
    );
  };

  const getTruncatedString = (str: string) => {
    const maxChars = 20;
    return str.length > maxChars ? str.substring(0, maxChars - 1) + '...' : str;
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

  // Adds a child name to help identify hidden data series
  const initDatumChildName = (data: any, childName: string) => {
    data.map(datum => (datum.childName = childName));
    return data;
  };

  const initDatum = () => {
    const newSeries: ChartSeries[] = [];
    if (top1stData && top1stData.length) {
      const shortName = getTruncatedString(top1stData[0].name);
      newSeries.push({
        childName: 'top1stData',
        data: initDatumChildName(top1stData, 'top1stData'),
        legendItem: {
          name: shortName,
          symbol: {
            // fill: styles.colorScale[0],
          },
          tooltip: shortName,
        },
        style: {
          data: {
            // fill: styles.colorScale[0],
          },
        },
      });
    }
    if (top2ndData && top2ndData.length) {
      const shortName = getTruncatedString(top2ndData[0].name);
      newSeries.push({
        childName: 'top2ndData',
        data: initDatumChildName(top2ndData, 'top2ndData'),
        legendItem: {
          name: shortName,
          symbol: {
            // fill: styles.colorScale[1],
          },
          tooltip: shortName,
        },
        style: {
          data: {
            // fill: styles.colorScale[1],
          },
        },
      });
    }
    if (top3rdData && top3rdData.length) {
      const shortName = getTruncatedString(top3rdData[0].name);
      newSeries.push({
        childName: 'top3rdData',
        data: initDatumChildName(top3rdData, 'top3rdData'),
        legendItem: {
          name: shortName,
          symbol: {
            // fill: styles.colorScale[2],
          },
          tooltip: shortName,
        },
        style: {
          data: {
            // fill: styles.colorScale[2],
          },
        },
      });
    }
    if (top4thData && top4thData.length) {
      const shortName = getTruncatedString(top4thData[0].name);
      newSeries.push({
        childName: 'top4thData',
        data: initDatumChildName(top4thData, 'top4thData'),
        legendItem: {
          name: shortName,
          symbol: {
            // fill: styles.colorScale[3],
          },
          tooltip: shortName,
        },
        style: {
          data: {
            // fill: styles.colorScale[3],
          },
        },
      });
    }
    if (top5thData && top5thData.length) {
      const shortName = getTruncatedString(top5thData[0].name);
      newSeries.push({
        childName: 'top5thData',
        data: initDatumChildName(top5thData, 'top5thData'),
        legendItem: {
          name: shortName,
          symbol: {
            // fill: styles.colorScale[4],
          },
          tooltip: shortName,
        },
        style: {
          data: {
            // fill: styles.colorScale[4],
          },
        },
      });
    }
    if (top6thData && top6thData.length) {
      const shortName = getTruncatedString(top6thData[0].name);
      newSeries.push({
        childName: 'top6thData',
        data: initDatumChildName(top6thData, 'top6thData'),
        legendItem: {
          name: shortName,
          symbol: {
            // fill: styles.colorScale[5],
          },
          tooltip: shortName,
        },
        style: {
          data: {
            // fill: styles.colorScale[5],
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
  }, [top1stData, top2ndData, top3rdData, top4thData, top5thData]);

  useEffect(() => {
    const unobserve = getResizeObserver(containerRef.current, handleResize);
    return () => {
      if (unobserve) {
        unobserve();
      }
    };
  }, [containerRef]);

  const barWidth = getBarWidth();

  // Note: For tooltip values to match properly, chart groups must be rendered in the order given as legend data
  return (
    <div className="chartOverride" ref={containerRef} style={{ height: getAdjustedContainerHeight() }}>
      <div style={{ height, width }}>
        <Chart
          containerComponent={cloneContainer()}
          domain={getDomain()}
          domainPadding={30}
          events={getEvents()}
          height={height}
          legendAllowWrap
          legendComponent={getLegend()}
          legendData={getLegendData(series, hiddenSeries)}
          legendPosition="bottom-left"
          name={name}
          padding={padding}
          theme={ChartTheme}
          themeColor={ChartThemeColor.multiOrdered}
          width={width}
        >
          {series && series.length > 0 && (
            <ChartGroup offset={Math.min(11, width * 0.013)}>
              {series.map((s, index) => getChart(s, index, barWidth))}
            </ChartGroup>
          )}
          <ChartAxis
            fixLabelOverlap
            style={styles.xAxis}
            tickFormat={t => {
              if (isFloat(t) || isInt(t)) {
                return t;
              }
              return intl.formatDate(`${t}T00:00:00`, {
                month: 'short',
                year: 'numeric',
              });
            }}
            tickValues={getTickValues(series)}
          />
          <ChartAxis dependentAxis style={styles.yAxis} tickFormat={getTickValue} />
        </Chart>
      </div>
    </div>
  );
};

const BreakdownChart = injectIntl(BreakdownChartBase);

export { BreakdownChart };
