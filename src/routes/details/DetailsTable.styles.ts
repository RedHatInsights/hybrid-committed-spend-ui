import global_BackgroundColor_light_100 from '@patternfly/react-tokens/dist/js/global_BackgroundColor_light_100';
import global_spacer_3xl from '@patternfly/react-tokens/dist/js/global_spacer_3xl';
import type React from 'react';

export const styles = {
  emptyState: {
    backgroundColor: global_BackgroundColor_light_100.value,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: global_spacer_3xl.value,
    height: '35vh',
    width: '100%',
  },
} as { [className: string]: React.CSSProperties };
