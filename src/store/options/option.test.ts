jest.mock('api/options/optionUtils');

import { waitFor } from '@testing-library/react';
import type { Option } from 'api/options/option';
import { OptionPathsType, OptionType } from 'api/options/option';
import { runOption } from 'api/options/optionUtils';
import { FetchStatus } from 'store/common';
import { createMockStoreCreator } from 'store/mockStore';

import * as actions from './optionActions';
import { optionStateKey } from './optionCommon';
import { optionReducer } from './optionReducer';
import * as selectors from './optionSelectors';

const createOptionsStore = createMockStoreCreator({
  [optionStateKey]: optionReducer,
});

const runOptionMock = runOption as jest.Mock;

const mockOption: Option = {
  data: [],
  total: {
    value: 100,
    units: 'USD',
  },
} as any;

const optionType = OptionType.all;
const optionPathsType = OptionPathsType.detailsOption;
const optionQueryString = 'optionQueryString';

runOptionMock.mockResolvedValue({ data: mockOption });
global.Date.now = jest.fn(() => 12345);

jest.spyOn(actions, 'fetchOption');
jest.spyOn(selectors, 'selectOptionFetchStatus');

test('default state', () => {
  const store = createOptionsStore();
  expect(selectors.selectOptionState(store.getState())).toMatchSnapshot();
});

test('fetch option success', async () => {
  const store = createOptionsStore();
  store.dispatch(actions.fetchOption(optionPathsType, optionType, optionQueryString));
  expect(runOptionMock).toHaveBeenCalled();
  expect(selectors.selectOptionFetchStatus(store.getState(), optionPathsType, optionType, optionQueryString)).toBe(
    FetchStatus.inProgress
  );
  await waitFor(() => expect(selectors.selectOptionFetchStatus).toHaveBeenCalled());
  const finishedState = store.getState();
  expect(selectors.selectOptionFetchStatus(finishedState, optionPathsType, optionType, optionQueryString)).toBe(
    FetchStatus.complete
  );
  expect(selectors.selectOptionError(finishedState, optionPathsType, optionType, optionQueryString)).toBe(null);
});

test('fetch option failure', async () => {
  const store = createOptionsStore();
  const error = Symbol('option error');
  runOptionMock.mockRejectedValueOnce(error);
  store.dispatch(actions.fetchOption(optionPathsType, optionType, optionQueryString));
  expect(runOption).toHaveBeenCalled();
  expect(selectors.selectOptionFetchStatus(store.getState(), optionPathsType, optionType, optionQueryString)).toBe(
    FetchStatus.inProgress
  );
  await waitFor(() => expect(selectors.selectOptionFetchStatus).toHaveBeenCalled());
  const finishedState = store.getState();
  expect(selectors.selectOptionFetchStatus(finishedState, optionPathsType, optionType, optionQueryString)).toBe(
    FetchStatus.complete
  );
  expect(selectors.selectOptionError(finishedState, optionPathsType, optionType, optionQueryString)).toBe(error);
});

test('does not fetch option if the request is in progress', () => {
  const store = createOptionsStore();
  store.dispatch(actions.fetchOption(optionPathsType, optionType, optionQueryString));
  store.dispatch(actions.fetchOption(optionPathsType, optionType, optionQueryString));
  expect(runOption).toHaveBeenCalledTimes(1);
});

test('option is not refetched if it has not expired', async () => {
  const store = createOptionsStore();
  store.dispatch(actions.fetchOption(optionPathsType, optionType, optionQueryString));
  await waitFor(() => expect(actions.fetchOption).toHaveBeenCalled());
  store.dispatch(actions.fetchOption(optionPathsType, optionType, optionQueryString));
  expect(runOption).toHaveBeenCalledTimes(1);
});
