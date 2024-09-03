import t_global_background_color_100 from '@patternfly/react-tokens/dist/js/t_global_background_color_100';
import t_global_spacer_3xl from '@patternfly/react-tokens/dist/js/t_global_spacer_3xl';
import type React from 'react';

export const styles = {
  emptyState: {
    backgroundColor: t_global_background_color_100.value,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: t_global_spacer_3xl.value,
    height: '35vh',
    width: '100%',
  },
} as { [className: string]: React.CSSProperties };
