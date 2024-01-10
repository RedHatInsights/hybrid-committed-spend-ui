import { Grid, GridItem } from '@patternfly/react-core';
import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { DashboardWidget } from 'store/dashboard';
import { dashboardSelectors, DashboardSize } from 'store/dashboard';
import { DashboardComponent } from 'store/dashboard/dashboardCommon';

const ActualSpend = lazy(() => import('routes/overview/components/actual-spend'));
const ActualSpendBreakdown = lazy(() => import('routes/overview/components/actual-spend-breakdown'));
const CommittedSpend = lazy(() => import('routes/overview/components/committed-spend'));
const CommittedSpendTrend = lazy(() => import('routes/overview/components/committed-spend-trend'));

interface DashboardOwnProps {
  // TBD...
}

interface DashboardStateProps {
  currentWidgets: number[];
  selectWidgets: Record<number, DashboardWidget>;
}

type DashboardProps = DashboardOwnProps;

const Dashboard: React.FC<DashboardProps> = () => {
  const { selectWidgets, currentWidgets } = useMapToProps();

  return (
    <Grid hasGutter>
      {currentWidgets.map(widgetId => {
        const widget: any = selectWidgets[widgetId];

        let Component;
        switch (widget.component) {
          case DashboardComponent.ActualSpend:
            Component = ActualSpend;
            break;
          case DashboardComponent.ActualSpendBreakdown:
            Component = ActualSpendBreakdown;
            break;
          case DashboardComponent.CommittedSpend:
            Component = CommittedSpend;
            break;
          case DashboardComponent.CommittedSpendTrend:
            Component = CommittedSpendTrend;
            break;
        }

        if (!Component) {
          return null;
        }
        return widget.size === DashboardSize.half ? (
          <GridItem lg={12} xl2={6} key={widgetId}>
            <Component widgetId={widgetId} />
          </GridItem>
        ) : (
          <GridItem sm={12} key={widgetId}>
            <Component widgetId={widgetId} />
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

export default Dashboard;
