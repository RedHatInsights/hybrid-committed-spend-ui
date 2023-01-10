import axios from 'axios';

import { runReport } from './detailsReport';
import { ReportType } from './report';

test('api run reports calls axios get', () => {
  const query = 'filter[resolution]=daily';
  runReport(ReportType.billing, query);
  expect(axios.get).toBeCalledWith(`reports/details?${query}`);
});
