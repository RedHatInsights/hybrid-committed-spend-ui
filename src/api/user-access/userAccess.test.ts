import { axiosInstance } from 'api';
import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import { billingUserAccessQuery } from 'store/user-access/userAccessCommon';

import { fetchUserAccess } from './userAccess';

test('api get provider calls axiosInstance.get', () => {
  const query = getUserAccessQuery(billingUserAccessQuery);
  fetchUserAccess(query);
  expect(axiosInstance.get).toBeCalledWith('authorization/hcsEnrollment?type=any');
});
