import type { ActionType } from 'typesafe-actions';

import type { DashboardWidget } from './dashboardCommon';
import {
  actualSpendBreakdownWidget,
  actualSpendWidget,
  committedSpendTrendWidget,
  committedSpendWidget,
} from './dashboardWidgets';

export type DashboardState = Readonly<{
  widgets: Record<number, DashboardWidget>;
  currentWidgets: number[];
}>;

export const defaultState: DashboardState = {
  currentWidgets: [
    actualSpendWidget.id,
    committedSpendWidget.id,
    committedSpendTrendWidget.id,
    actualSpendBreakdownWidget.id,
  ],
  widgets: {
    [actualSpendWidget.id]: actualSpendWidget,
    [committedSpendWidget.id]: committedSpendWidget,
    [committedSpendTrendWidget.id]: committedSpendTrendWidget,
    [actualSpendBreakdownWidget.id]: actualSpendBreakdownWidget,
  },
};

export function dashboardReducer(state = defaultState, action: ActionType<any>): DashboardState {
  switch (action.type) {
    default:
      return state;
  }
}
