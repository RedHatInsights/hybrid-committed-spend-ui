import axios from 'axios';

import { runReport } from './accountSummaryReport';
import { ReportType } from './report';

test('api run reports calls axios get', () => {
  const query = 'filter[resolution]=daily';
  runReport(ReportType.details, query);
  expect(axios.get).toBeCalledWith(`reports/hcsSummary?${query}`);
});
