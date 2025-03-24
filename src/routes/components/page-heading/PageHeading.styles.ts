import t_global_font_size_xs from '@patternfly/react-tokens/dist/js/t_global_font_size_xs';
import type React from 'react';

export const styles = {
  emptyValue: {
    marginLeft: t_global_font_size_xs.var,
  },
  headingContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headingContentRight: {
    display: 'flex',
    justifyContent: 'end',
  },
} as { [className: string]: React.CSSProperties };
