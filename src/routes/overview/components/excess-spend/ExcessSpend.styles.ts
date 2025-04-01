import { chart_color_blue_300 } from '@patternfly/react-tokens/dist/js/chart_color_blue_300';
import { t_global_spacer_md } from '@patternfly/react-tokens/dist/js/t_global_spacer_md';
import type React from 'react';

export const styles = {
  infoContainer: {
    color: chart_color_blue_300.var,
  },
  infoLabel: {
    marginLeft: t_global_spacer_md.var,
  },
  infoTitle: {
    fontWeight: 'bold',
  },
} as { [className: string]: React.CSSProperties };
