import t_global_font_size_3xl from '@patternfly/react-tokens/dist/js/t_global_font_size_3xl';
import t_global_spacer_2xl from '@patternfly/react-tokens/dist/js/t_global_spacer_2xl';
import t_global_spacer_sm from '@patternfly/react-tokens/dist/js/t_global_spacer_sm';
import type React from 'react';

export const styles = {
  arrowIcon: {
    display: 'flex',
    alignSelf: 'center',
  },
  body: {
    minHeight: '125px',
  },
  percentage: {
    paddingLeft: t_global_spacer_sm.var,
  },
  percentContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  value: {
    alignSelf: 'end',
    marginRight: t_global_spacer_2xl.var,
    marginTop: '10px',
    fontSize: t_global_font_size_3xl.var,
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
} as { [className: string]: React.CSSProperties };
