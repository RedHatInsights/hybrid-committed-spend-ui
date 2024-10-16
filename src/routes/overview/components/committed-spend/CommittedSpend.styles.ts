import t_global_font_size_3xl from '@patternfly/react-tokens/dist/js/t_global_font_size_3xl';
import type React from 'react';

export const styles = {
  body: {
    minHeight: '125px',
  },
  committedSpend: {
    display: 'flex',
    justifyContent: 'center',
  },
  value: {
    fontSize: t_global_font_size_3xl.var,
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2px',
  },
} as { [className: string]: React.CSSProperties };
