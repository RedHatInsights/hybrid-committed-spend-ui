import global_FontSize_xs from '@patternfly/react-tokens/dist/js/global_FontSize_xs';
import type React from 'react';

export const styles = {
  emptyValue: {
    marginLeft: global_FontSize_xs.var,
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
