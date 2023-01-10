import axios from 'axios';

import { runFilter } from './detailsFilter';
import { FilterType } from './filter';

test('api run reports calls axios get', () => {
  const query = '?';
  runFilter(FilterType.product, query);
  expect(axios.get).toBeCalledWith(`reports/detailsFilter?${query}`);
});
