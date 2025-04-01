import { t_global_spacer_lg } from '@patternfly/react-tokens/dist/js/t_global_spacer_lg';
import t_global_spacer_md from '@patternfly/react-tokens/dist/js/t_global_spacer_md';
import t_global_spacer_sm from '@patternfly/react-tokens/dist/js/t_global_spacer_sm';

export const styles = {
  alertContainer: {
    marginBottom: t_global_spacer_lg.var,
    marginTop: t_global_spacer_md.var,
  },
  headerContainer: {
    paddingBottom: 0,
  },
  paginationContainer: {
    marginTop: t_global_spacer_sm.var,
  },
} as { [className: string]: React.CSSProperties };
