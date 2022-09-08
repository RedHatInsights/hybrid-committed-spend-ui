import { ActionType, getType } from 'typesafe-actions';

import { setWidgetTab } from './billingDashboardActions';
import { BillingDashboardWidget } from './billingDashboardCommon';
import { actualSpendWidget, committedSpendWidget } from './billingDashboardWidgets';

export type BillingDashboardAction = ActionType<typeof setWidgetTab>;

export type BillingDashboardState = Readonly<{
  widgets: Record<number, BillingDashboardWidget>;
  currentWidgets: number[];
}>;

export const defaultState: BillingDashboardState = {
  currentWidgets: [actualSpendWidget.id, committedSpendWidget.id],
  widgets: {
    [actualSpendWidget.id]: actualSpendWidget,
    [committedSpendWidget.id]: committedSpendWidget,
  },
};

export function billingDashboardReducer(state = defaultState, action: BillingDashboardAction): BillingDashboardState {
  switch (action.type) {
    case getType(setWidgetTab):
      return {
        ...state,
        widgets: {
          ...state.widgets,
          [action.payload.id]: {
            ...state.widgets[action.payload.id],
          },
        },
      };
    default:
      return state;
  }
}
