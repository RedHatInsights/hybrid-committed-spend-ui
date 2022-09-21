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
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { default as ChartTheme } from 'routes/components/charts/chart-theme';
import { getCostRangeString } from 'routes/components/charts/common/chart-datum-utils';
import {
  ChartSeries,
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
import { FormatOptions, Formatter } from 'utils/format';
import { noop } from 'utils/noop';

import { styles } from './TrendChart.styles';

interface TrendChartOwnProps {
  adjustContainerHeight?: boolean;
  containerHeight?: number;
  currentData?: any;
  height?: number;
  legendItemsPerRow?: number;
  padding?: any;
  previousData?: any;
  thresholdData?: any;
  title?: string;
  formatter?: Formatter;
  formatOptions?: FormatOptions;
}

interface State {
  cursorVoronoiContainer?: any;
  hiddenSeries: Set<number>;
  series?: ChartSeries[];
  width: number;
}

type TrendChartProps = TrendChartOwnProps & WrappedComponentProps;

class TrendChartBase extends React.Component<TrendChartProps, State> {
  private containerRef = React.createRef<HTMLDivElement>();
  private observer: any = noop;

  public state: State = {
    hiddenSeries: new Set(),
    width: 0,
  };

  public componentDidMount() {
    this.initDatum();
    this.observer = getResizeObserver(this.containerRef.current, this.handleResize);
  }

  public componentDidUpdate(prevProps: TrendChartProps) {
    if (
      prevProps.currentData !== this.props.currentData ||
      prevProps.previousData !== this.props.previousData ||
      prevProps.thresholdData !== this.props.thresholdData
    ) {
      this.initDatum();
    }
  }

  public componentWillUnmount() {
    if (this.observer) {
      this.observer();
    }
  }

  private initDatum = () => {
    const { currentData, previousData, thresholdData } = this.props;

    // Show all legends, regardless of length

    const series: ChartSeries[] = [];
    if (currentData) {
      series.push({
        childName: 'currentSpend',
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
            ...styles.currentSpend,
            stroke: styles.currentColorScale[0],
          },
        },
      });
    }
    if (previousData) {
      series.push({
        childName: 'previousSpend',
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
            ...styles.previousSpend,
            stroke: styles.previousColorScale[0],
          },
        },
      });
    }
    if (thresholdData) {
      series.push({
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
    const cursorVoronoiContainer = this.getCursorVoronoiContainer();
    this.setState({ cursorVoronoiContainer, series });
  };

  private getAdjustedContainerHeight = () => {
    const { adjustContainerHeight, height, containerHeight = height } = this.props;
    const { width } = this.state;

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

  private getChart = (series: ChartSeries, index: number) => {
    const { hiddenSeries } = this.state;

    return (
      <ChartArea
        data={!hiddenSeries.has(index) ? series.data : [{ y: null }]}
        interpolation="monotoneX"
        key={series.childName}
        name={series.childName}
        style={series.style}
      />
    );
  };

  // Returns CursorVoronoiContainer component
  private getCursorVoronoiContainer = () => {
    const { formatter, formatOptions } = this.props;

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
          left: 8,
          right: 8,
          top: 8,
        }}
      />
    );
  };

  // Returns onMouseOver, onMouseOut, and onClick events for the interactive legend
  private getEvents() {
    const { hiddenSeries, series } = this.state;

    const result = getInteractiveLegendEvents({
      chartNames: getChartNames(series),
      isHidden: index => isSeriesHidden(hiddenSeries, index),
      legendName: 'legend',
      onLegendClick: props => this.handleLegendClick(props.index),
    });
    return result;
  }

  private getLegend = () => {
    const { hiddenSeries, series } = this.state;

    return (
      <ChartLegend
        data={getLegendData(series, hiddenSeries)}
        height={25}
        gutter={20}
        name="legend"
        responsive={false}
        y={275}
      />
    );
  };

  // Hide each data series individually
  private handleLegendClick = (index: number) => {
    const hiddenSeries = initHiddenSeries(this.state.series, this.state.hiddenSeries, index);
    this.setState({ hiddenSeries });
  };

  private handleResize = () => {
    const { width } = this.state;
    const { clientWidth = 0 } = this.containerRef.current || {};

    if (clientWidth !== width) {
      this.setState({ width: clientWidth });
    }
  };

  public render() {
    const {
      height,
      intl,
      padding = {
        bottom: 75,
        left: 40,
        right: 40,
        top: 8,
      },
      title,
    } = this.props;
    const { cursorVoronoiContainer, hiddenSeries, series, width } = this.state;
    const domain = getDomain(series, hiddenSeries);

    // Clone original container. See https://issues.redhat.com/browse/COST-762
    const container = cursorVoronoiContainer
      ? React.cloneElement(cursorVoronoiContainer, {
          disable: !isDataAvailable(series, hiddenSeries),
          labelComponent: (
            <ChartLegendTooltip
              legendData={getLegendData(series, hiddenSeries, true)}
              title={datum =>
                intl.formatMessage(messages.chartTooltipTitle, {
                  value: intl.formatDate(datum.x, {
                    month: 'long',
                  }),
                })
              }
            />
          ),
        })
      : undefined;

    return (
      <>
        {title && (
          <Title headingLevel="h3" size="md">
            {title}
          </Title>
        )}
        <div className="chartOverride" ref={this.containerRef} style={{ height: this.getAdjustedContainerHeight() }}>
          <div style={{ height, width }}>
            <Chart
              containerComponent={container}
              domain={domain}
              events={this.getEvents()}
              height={height}
              legendAllowWrap
              legendComponent={this.getLegend()}
              legendData={getLegendData(series, hiddenSeries)}
              legendPosition="bottom-left"
              padding={padding}
              theme={ChartTheme}
              width={width}
            >
              {series &&
                series.map((s, index) => {
                  return this.getChart(s, index);
                })}
              <ChartAxis
                fixLabelOverlap
                style={styles.xAxis}
                tickFormat={t =>
                  intl.formatDate(t, {
                    month: 'long',
                  })
                }
                tickValues={getTickValues(series)}
              />
              <ChartAxis dependentAxis style={styles.yAxis} />
            </Chart>
          </div>
        </div>
      </>
    );
  }
}

const TrendChart = injectIntl(TrendChartBase);

export { TrendChart, TrendChartProps };
