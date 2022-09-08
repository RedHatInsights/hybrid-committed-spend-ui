import { actualSpendWidget, committedSpendWidget } from './billingDashboardWidgets';

jest.mock('store/reports/reportActions');

import { createMockStoreCreator } from 'store/mockStore';
import { reportActions } from 'store/reports';

import * as actions from './billingDashboardActions';
import { billingDashboardStateKey } from './billingDashboardCommon';
import { billingDashboardReducer } from './billingDashboardReducer';
import * as selectors from './billingDashboardSelectors';

const createOcpDashboardStore = createMockStoreCreator({
  [billingDashboardStateKey]: billingDashboardReducer,
});

const fetchReportMock = reportActions.fetchReport as jest.Mock;

beforeEach(() => {
  fetchReportMock.mockReturnValue({ type: '@@test' });
});

test('default state', () => {
  const store = createOcpDashboardStore();
  const state = store.getState();
  expect(selectors.selectCurrentWidgets(state)).toEqual([actualSpendWidget.id, committedSpendWidget.id]);
  expect(selectors.selectWidget(state, actualSpendWidget.id)).toEqual(actualSpendWidget);
});

test('fetch widget reports', () => {
  const store = createOcpDashboardStore();
  store.dispatch(actions.fetchWidgetReports(actualSpendWidget.id));
  expect(fetchReportMock.mock.calls).toMatchSnapshot();
});
