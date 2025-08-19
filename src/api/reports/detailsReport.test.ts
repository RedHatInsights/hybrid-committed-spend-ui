import { axiosInstance } from 'api';

import { runReport } from './detailsReport';
import { ReportType } from './report';

test('api run reports calls axios get', () => {
  const query = 'filter[resolution]=daily';
  runReport(ReportType.details, query);
  expect(axiosInstance.get).toHaveBeenCalledWith(`reports/details?${query}`);
});
