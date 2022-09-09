import { Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import { connect } from 'react-redux';
import { createMapStateToProps } from 'store/common';
import { dashboardSelectors, DashboardSize } from 'store/dashboard';

interface DashboardOwnProps {
  // TBD...
}

interface DashboardStateProps {
  widgets: number[];
}

interface DashboardDispatchProps {
  selectWidgets?: () => void;
}

type DashboardProps = DashboardOwnProps & DashboardStateProps & DashboardDispatchProps;

const DashboardBase: React.SFC<DashboardProps> = ({ selectWidgets, widgets }) => (
  <Grid hasGutter>
    {widgets.map(widgetId => {
      const widget = selectWidgets[widgetId];
      return widget.size === DashboardSize.full ? (
        <GridItem sm={12} key={widgetId}>
          <widget.component widgetId={widgetId} />
        </GridItem>
      ) : (
        <GridItem lg={12} xl2={6} key={widgetId}>
          <widget.component widgetId={widgetId} />
        </GridItem>
      );
    })}
  </Grid>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = createMapStateToProps<DashboardOwnProps, DashboardStateProps>((state, props) => {
  return {
    selectWidgets: dashboardSelectors.selectWidgets(state),
    widgets: dashboardSelectors.selectCurrentWidgets(state),
  };
});

const Dashboard = connect(mapStateToProps, {})(DashboardBase);

export default Dashboard;
