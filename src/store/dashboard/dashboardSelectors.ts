import type { RootState } from 'store/rootReducer';

import { dashboardDefaultFilters, dashboardStateKey, getQueryForWidget } from './dashboardCommon';

export const selectDashboardState = (state: RootState) => state[dashboardStateKey];

export const selectWidgets = (state: RootState) => selectDashboardState(state).widgets;

export const selectWidget = (state: RootState, id: number) => selectWidgets(state)[id];

export const selectCurrentWidgets = (state: RootState) => selectDashboardState(state).currentWidgets;

export const selectWidgetQueries = (state: RootState, id: number) => {
  const widget = selectWidget(state, id);

  const defaultFilter = {
    ...dashboardDefaultFilters,
    ...(widget.filter ? widget.filter : {}),
  };

  return {
    previous: getQueryForWidget({
      ...defaultFilter,
      time_scope_value: -2,
    }),
    current: getQueryForWidget(defaultFilter),
    forecast: getQueryForWidget({}, { limit: 31 }),
  };
};
