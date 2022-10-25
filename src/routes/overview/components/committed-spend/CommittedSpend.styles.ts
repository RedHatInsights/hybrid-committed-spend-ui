import global_FontSize_3xl from '@patternfly/react-tokens/dist/js/global_FontSize_3xl';
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
    fontSize: global_FontSize_3xl.var,
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2px',
  },
} as { [className: string]: React.CSSProperties };
