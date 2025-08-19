import { axiosInstance } from 'api';

import { runFilter } from './detailsFilter';
import { FilterType } from './filter';

test('api run reports calls axios get', () => {
  const query = '';
  runFilter(FilterType.product, query);
  expect(axiosInstance.get).toHaveBeenCalledWith(`reports/detailsFilter${query}`);
});
