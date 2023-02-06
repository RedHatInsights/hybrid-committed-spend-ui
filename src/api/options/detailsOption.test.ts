import axios from 'axios';

import { runOption } from './detailsOption';
import { OptionType } from './option';

test('api run reports calls axios get', () => {
  const query = '?';
  runOption(OptionType.all, query);
  expect(axios.get).toBeCalledWith(`reports/detailsOptions?${query}`);
});
