import global_FontSize_3xl from '@patternfly/react-tokens/dist/js/global_FontSize_3xl';
import global_spacer_2xl from '@patternfly/react-tokens/dist/js/global_spacer_2xl';
import global_spacer_sm from '@patternfly/react-tokens/dist/js/global_spacer_sm';
import type React from 'react';

export const styles = {
  arrowIcon: {
    display: 'flex',
    alignSelf: 'center',
  },
  body: {
    minHeight: '125px',
  },
  percent: {
    paddingLeft: global_spacer_sm.var,
  },
  percentContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  value: {
    alignSelf: 'end',
    marginRight: global_spacer_2xl.var,
    marginTop: '10px',
    fontSize: global_FontSize_3xl.var,
  },
  valueContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
} as { [className: string]: React.CSSProperties };
