import { Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import type { WrappedComponentProps } from 'react-intl';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors, DashboardSize } from 'store/dashboard';

interface DashboardOwnProps {
  // TBD...
}

interface DashboardStateProps {
  currentWidgets: number[];
  selectWidgets: Record<number, DashboardWidget>;
}

type DashboardProps = DashboardOwnProps & WrappedComponentProps;

const Dashboard: React.FC<DashboardProps> = () => {
  const { selectWidgets, currentWidgets } = useMapToProps();

  return (
    <Grid hasGutter>
      {currentWidgets.map(widgetId => {
        const widget: any = selectWidgets[widgetId];
        return widget.size === DashboardSize.half ? (
          <GridItem lg={12} xl2={6} key={widgetId}>
            <widget.component widgetId={widgetId} />
          </GridItem>
        ) : (
          <GridItem sm={12} key={widgetId}>
            <widget.component widgetId={widgetId} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

const useMapToProps = (): DashboardStateProps => {
  const selectWidgets = useSelector((state: RootState) => dashboardSelectors.selectWidgets(state));
  const currentWidgets = useSelector((state: RootState) => dashboardSelectors.selectCurrentWidgets(state));

  return {
    currentWidgets,
    selectWidgets,
  };
};

export default injectIntl(Dashboard);
