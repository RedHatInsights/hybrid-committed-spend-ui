import { global_Color_200 } from '@patternfly/react-tokens/dist/js/global_Color_200';
import { global_FontSize_xs } from '@patternfly/react-tokens/dist/js/global_FontSize_xs';
import { global_spacer_lg } from '@patternfly/react-tokens/dist/js/global_spacer_lg';
import { global_spacer_md } from '@patternfly/react-tokens/dist/js/global_spacer_md';

export const styles = {
  alertContainer: {
    marginBottom: global_spacer_lg.var,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'center',
  },
  chartSkeleton: {
    height: '125px',
    marginBottom: global_spacer_md.var,
    marginTop: global_spacer_md.var,
  },
  legendSkeleton: {
    marginTop: global_spacer_md.var,
  },
  reportSummary: {
    height: '100%',
  },
  subtitle: {
    display: 'inline-block',
    fontSize: global_FontSize_xs.var,
    color: global_Color_200.var,
    marginBottom: 0,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
