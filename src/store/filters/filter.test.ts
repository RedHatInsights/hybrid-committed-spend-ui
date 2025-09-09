jest.mock('api/filters/filterUtils');

import { waitFor } from '@testing-library/react';
import type { Filter } from 'api/filters/filter';
import { FilterPathsType, FilterType } from 'api/filters/filter';
import { runFilter } from 'api/filters/filterUtils';
import { FetchStatus } from 'store/common';
import { createMockStoreCreator } from 'store/mockStore';

import * as actions from './filterActions';
import { filterStateKey } from './filterCommon';
import { filterReducer } from './filterReducer';
import * as selectors from './filterSelectors';

const createFiltersStore = createMockStoreCreator({
  [filterStateKey]: filterReducer,
});

const runFilterMock = runFilter as jest.Mock;

const mockFilter: Filter = {
  data: [],
  total: {
    value: 100,
    units: 'USD',
  },
} as any;

const filterType = FilterType.affiliate;
const filterPathsType = FilterPathsType.detailsFilter;
const filterQueryString = 'filterQueryString';

runFilterMock.mockResolvedValue({ data: mockFilter });
global.Date.now = jest.fn(() => 12345);

jest.spyOn(actions, 'fetchFilter');
jest.spyOn(selectors, 'selectFilterFetchStatus');

test('default state', () => {
  const store = createFiltersStore();
  expect(selectors.selectFilterState(store.getState())).toMatchSnapshot();
});

test('fetch filter success', async () => {
  const store = createFiltersStore();
  store.dispatch(actions.fetchFilter(filterPathsType, filterType, filterQueryString));
  expect(runFilterMock).toHaveBeenCalled();
  expect(selectors.selectFilterFetchStatus(store.getState(), filterPathsType, filterType, filterQueryString)).toBe(
    FetchStatus.inProgress
  );
  await waitFor(() => expect(selectors.selectFilterFetchStatus).toHaveBeenCalled());
  const finishedState = store.getState();
  expect(selectors.selectFilterFetchStatus(finishedState, filterPathsType, filterType, filterQueryString)).toBe(
    FetchStatus.complete
  );
  expect(selectors.selectFilterError(finishedState, filterPathsType, filterType, filterQueryString)).toBe(null);
});

test('fetch filter failure', async () => {
  const store = createFiltersStore();
  const error = Symbol('filter error');
  runFilterMock.mockRejectedValueOnce(error);
  store.dispatch(actions.fetchFilter(filterPathsType, filterType, filterQueryString));
  expect(runFilter).toHaveBeenCalled();
  expect(selectors.selectFilterFetchStatus(store.getState(), filterPathsType, filterType, filterQueryString)).toBe(
    FetchStatus.inProgress
  );
  await waitFor(() => expect(selectors.selectFilterFetchStatus).toHaveBeenCalled());
  const finishedState = store.getState();
  expect(selectors.selectFilterFetchStatus(finishedState, filterPathsType, filterType, filterQueryString)).toBe(
    FetchStatus.complete
  );
  expect(selectors.selectFilterError(finishedState, filterPathsType, filterType, filterQueryString)).toBe(error);
});

test('does not fetch filter if the request is in progress', () => {
  const store = createFiltersStore();
  store.dispatch(actions.fetchFilter(filterPathsType, filterType, filterQueryString));
  store.dispatch(actions.fetchFilter(filterPathsType, filterType, filterQueryString));
  expect(runFilter).toHaveBeenCalledTimes(1);
});

test('filter is not refetched if it has not expired', async () => {
  const store = createFiltersStore();
  store.dispatch(actions.fetchFilter(filterPathsType, filterType, filterQueryString));
  await waitFor(() => expect(actions.fetchFilter).toHaveBeenCalled());
  store.dispatch(actions.fetchFilter(filterPathsType, filterType, filterQueryString));
  expect(runFilter).toHaveBeenCalledTimes(1);
});
