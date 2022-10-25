import { global_spacer_md } from '@patternfly/react-tokens/dist/js/global_spacer_md';
import type React from 'react';

export const styles = {
  perspective: {
    display: 'flex',
    alignItems: 'center',
  },
  perspectiveContainer: {
    display: 'inline-flex',
    marginRight: global_spacer_md.var,
  },
} as { [className: string]: React.CSSProperties };
