import { ActionType } from 'typesafe-actions';

import { DashboardWidget } from './dashboardCommon';
import { actualSpendWidget, committedSpendTrendWidget, committedSpendWidget } from './dashboardWidgets';

export type DashboardState = Readonly<{
  widgets: Record<number, DashboardWidget>;
  currentWidgets: number[];
}>;

export const defaultState: DashboardState = {
  currentWidgets: [actualSpendWidget.id, committedSpendWidget.id, committedSpendTrendWidget.id],
  widgets: {
    [actualSpendWidget.id]: actualSpendWidget,
    [committedSpendWidget.id]: committedSpendWidget,
    [committedSpendTrendWidget.id]: committedSpendTrendWidget,
  },
};

export function dashboardReducer(state = defaultState, action: ActionType<any>): DashboardState {
  switch (action.type) {
    default:
      return state;
  }
}
