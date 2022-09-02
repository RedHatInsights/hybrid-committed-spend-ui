import { getUserAccessQuery } from 'api/queries/userAccessQuery';

jest.mock('axios');

import axios from 'axios';
import { billingUserAccessQuery } from 'store/userAccess/userAccessCommon';

import { fetchUserAccess } from './userAccess';

test('api get provider calls axios.get', () => {
  const query = getUserAccessQuery(billingUserAccessQuery);
  fetchUserAccess(query);
  expect(axios.get).toBeCalledWith('user-access/?type=');
});
