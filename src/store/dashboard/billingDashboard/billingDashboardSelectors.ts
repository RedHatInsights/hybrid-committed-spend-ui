import { RootState } from 'store/rootReducer';

import {
  billingDashboardDefaultFilters,
  billingDashboardStateKey,
  getQueryForWidget,
  getQueryForWidgetTabs,
} from './billingDashboardCommon';

export const selectBillingDashboardState = (state: RootState) => state[billingDashboardStateKey];

export const selectWidgets = (state: RootState) => selectBillingDashboardState(state).widgets;

export const selectWidget = (state: RootState, id: number) => selectWidgets(state)[id];

export const selectCurrentWidgets = (state: RootState) => selectBillingDashboardState(state).currentWidgets;

export const selectWidgetQueries = (state: RootState, id: number) => {
  const widget = selectWidget(state, id);

  const defaultFilter = {
    ...billingDashboardDefaultFilters,
    ...(widget.filter ? widget.filter : {}),
  };

  return {
    previous: getQueryForWidget({
      ...defaultFilter,
      time_scope_value: -2,
    }),
    current: getQueryForWidget(defaultFilter),
    forecast: getQueryForWidget({}, { limit: 31 }),
    tabs: getQueryForWidgetTabs(widget, {
      resolution: 'monthly',
    }),
  };
};
