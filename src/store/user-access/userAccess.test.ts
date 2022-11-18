jest.mock('api/user-access');

import { waitFor } from '@testing-library/react';
import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import type { UserAccess } from 'api/user-access';
import { fetchUserAccess, UserAccessType } from 'api/user-access';
import { FetchStatus } from 'store/common';
import { createMockStoreCreator } from 'store/mockStore';

import * as actions from './userAccessActions';
import { billingUserAccessQuery, stateKey } from './userAccessCommon';
import { userAccessReducer } from './userAccessReducer';
import * as selectors from './userAccessSelectors';

const createProdvidersStore = createMockStoreCreator({
  [stateKey]: userAccessReducer,
});

const fetchUserAccessMock = fetchUserAccess as jest.Mock;

const userAccessMock: UserAccess = {
  hcsDeal: true,
};

fetchUserAccessMock.mockReturnValue(Promise.resolve({ data: userAccessMock }));

jest.spyOn(selectors, 'selectUserAccessFetchStatus');

test('default state', async () => {
  const store = createProdvidersStore();
  expect(selectors.selectUserAccessState(store.getState())).toMatchSnapshot();
});

test('fetch userAccess success', async () => {
  const userAccessQueryString = getUserAccessQuery(billingUserAccessQuery);
  const store = createProdvidersStore();
  store.dispatch(actions.fetchUserAccess(UserAccessType.all, userAccessQueryString));
  expect(fetchUserAccessMock).toBeCalled();
  expect(selectors.selectUserAccessFetchStatus(store.getState(), UserAccessType.all, userAccessQueryString)).toBe(
    FetchStatus.inProgress
  );
  await waitFor(() => expect(selectors.selectUserAccessFetchStatus).toHaveBeenCalled());
  const finishedState = store.getState();
  expect(selectors.selectUserAccessFetchStatus(finishedState, UserAccessType.all, userAccessQueryString)).toBe(
    FetchStatus.complete
  );
});

test('fetch userAccess failure', async () => {
  const userAccessQueryString = getUserAccessQuery(billingUserAccessQuery);
  const store = createProdvidersStore();
  const error = Symbol('getUserAccess error');
  fetchUserAccessMock.mockReturnValueOnce(Promise.reject(error));
  store.dispatch(actions.fetchUserAccess(UserAccessType.all, userAccessQueryString));
  expect(fetchUserAccessMock).toBeCalled();
  expect(selectors.selectUserAccessFetchStatus(store.getState(), UserAccessType.all, userAccessQueryString)).toBe(
    FetchStatus.inProgress
  );
  await waitFor(() => expect(selectors.selectUserAccessFetchStatus).toHaveBeenCalled());
  const finishedState = store.getState();
  expect(selectors.selectUserAccessFetchStatus(finishedState, UserAccessType.all, userAccessQueryString)).toBe(
    FetchStatus.complete
  );
});
