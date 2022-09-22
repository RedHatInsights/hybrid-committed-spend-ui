import {
  actualSpendBreakdownWidget,
  actualSpendWidget,
  committedSpendTrendWidget,
  committedSpendWidget,
} from './dashboardWidgets';

jest.mock('store/reports/reportActions');

import { createMockStoreCreator } from 'store/mockStore';
import { reportActions } from 'store/reports';

import { dashboardStateKey } from './dashboardCommon';
import { dashboardReducer } from './dashboardReducer';
import * as selectors from './dashboardSelectors';

const createDashboardStore = createMockStoreCreator({
  [dashboardStateKey]: dashboardReducer,
});

const fetchReportMock = reportActions.fetchReport as jest.Mock;

beforeEach(() => {
  fetchReportMock.mockReturnValue({ type: '@@test' });
});

test('default state', () => {
  const store = createDashboardStore();
  const state = store.getState();
  expect(selectors.selectCurrentWidgets(state)).toEqual([
    actualSpendWidget.id,
    committedSpendWidget.id,
    committedSpendTrendWidget.id,
    actualSpendBreakdownWidget.id,
  ]);
  expect(selectors.selectWidget(state, actualSpendWidget.id)).toEqual(actualSpendWidget);
});
