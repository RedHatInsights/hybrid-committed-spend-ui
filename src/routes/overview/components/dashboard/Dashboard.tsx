import { Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from 'store';
import { dashboardSelectors, DashboardSize, DashboardWidget } from 'store/dashboard';

interface DashboardOwnProps {
  // TBD...
}

interface DashboardStateProps {
  currentWidgets: number[];
  selectWidgets: Record<number, DashboardWidget>;
}

type DashboardProps = DashboardOwnProps & RouteComponentProps<void> & WrappedComponentProps;

const Dashboard: React.FC<DashboardProps> = () => {
  const { selectWidgets, currentWidgets } = mapToProps();

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

const mapToProps = (): DashboardStateProps => {
  const selectWidgets = useSelector((state: RootState) => dashboardSelectors.selectWidgets(state));
  const currentWidgets = useSelector((state: RootState) => dashboardSelectors.selectCurrentWidgets(state));

  return {
    currentWidgets,
    selectWidgets,
  };
};

export default injectIntl(withRouter(Dashboard));
