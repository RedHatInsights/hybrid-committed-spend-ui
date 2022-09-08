import { Grid, GridItem } from '@patternfly/react-core';
import React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { BillingCardSize } from 'store/dashboard/billingDashboard';

type DashboardOwnProps = WrappedComponentProps;

interface DashboardStateProps {
  DashboardWidget: any;
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
      return widget.size === BillingCardSize.full ? (
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

export default DashboardBase;
