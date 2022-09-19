import { getUserAccessQuery } from 'api/queries/userAccessQuery';

jest.mock('axios');

import axios from 'axios';
import { billingUserAccessQuery } from 'store/user-access/userAccessCommon';

import { fetchUserAccess } from './userAccess';

test('api get provider calls axios.get', () => {
  const query = getUserAccessQuery(billingUserAccessQuery);
  fetchUserAccess(query);
  expect(axios.get).toBeCalledWith('authorization/hcsEnrollment?type=any');
});
