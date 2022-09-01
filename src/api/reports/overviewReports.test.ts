jest.mock('axios');

import axios from 'axios';

import { runReport } from './overviewReports';
import { ReportType } from './report';

test('api run reports calls axios get', () => {
  const query = 'filter[resolution]=daily';
  runReport(ReportType.cost, query);
  expect(axios.get).toBeCalledWith(`?${query}`); // `reports/aws/storage/?${query}`
});
