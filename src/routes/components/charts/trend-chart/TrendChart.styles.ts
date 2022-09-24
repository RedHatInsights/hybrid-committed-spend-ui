import { chart_color_black_200 } from '@patternfly/react-tokens/dist/js/chart_color_black_200';
import { chart_color_blue_300 } from '@patternfly/react-tokens/dist/js/chart_color_blue_300';
import { chart_color_blue_400 } from '@patternfly/react-tokens/dist/js/chart_color_blue_400';
import { chart_color_green_100 } from '@patternfly/react-tokens/dist/js/chart_color_green_100';
import { chart_color_green_200 } from '@patternfly/react-tokens/dist/js/chart_color_green_200';
import { chart_color_green_300 } from '@patternfly/react-tokens/dist/js/chart_color_green_300';
import { chart_color_green_400 } from '@patternfly/react-tokens/dist/js/chart_color_green_400';
import { chart_color_green_500 } from '@patternfly/react-tokens/dist/js/chart_color_green_500';

export const styles = {
  currentColorScale: [chart_color_blue_300.value, chart_color_blue_400.value],
  currentSpend: {
    fill: 'none',
  },
  previousColorScale: [chart_color_black_200.value, chart_color_black_200.value],
  previousSpend: {
    fill: 'none',
  },
  thresholdColorScale: [
    chart_color_green_400.value,
    chart_color_green_300.value,
    chart_color_green_200.value,
    chart_color_green_100.value,
    chart_color_green_500.value,
  ],
  threshold: {
    fill: 'none',
    strokeDasharray: '3,3',
  },
  yAxis: {
    axisLabel: {
      padding: 15,
    },
    grid: {
      stroke: 'none',
    },
  },
  xAxis: {
    axisLabel: {
      padding: 40,
    },
    grid: {
      stroke: 'none',
    },
  },
};
