import { t_global_font_size_xs } from '@patternfly/react-tokens/dist/js/t_global_font_size_xs';
import { t_global_spacer_lg } from '@patternfly/react-tokens/dist/js/t_global_spacer_lg';
import { t_global_spacer_md } from '@patternfly/react-tokens/dist/js/t_global_spacer_md';
import { t_global_text_color_200 } from '@patternfly/react-tokens/dist/js/t_global_text_color_200';

export const styles = {
  alertContainer: {
    marginBottom: t_global_spacer_lg.var,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'center',
  },
  chartSkeleton: {
    height: '125px',
    marginBottom: t_global_spacer_md.var,
    marginTop: t_global_spacer_md.var,
  },
  legendSkeleton: {
    marginTop: t_global_spacer_md.var,
  },
  reportSummary: {
    height: '100%',
  },
  subtitle: {
    display: 'inline-block',
    fontSize: t_global_font_size_xs.var,
    color: t_global_text_color_200.var,
    marginBottom: 0,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
