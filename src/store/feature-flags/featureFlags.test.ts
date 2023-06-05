import { createMockStoreCreator } from 'store/mockStore';

import { featureFlagsSelectors } from '.';
import * as actions from './featureFlagsActions';
import { featureFlagsReducer, stateKey } from './featureFlagsReducer';
import * as selectors from './featureFlagsSelectors';

const createUIStore = createMockStoreCreator({
  [stateKey]: featureFlagsReducer,
});

test('default state', async () => {
  const store = createUIStore();
  expect(selectors.selectFeatureFlagsState(store.getState())).toMatchSnapshot();
});

test('Billing stage feature is enabled', async () => {
  const store = createUIStore();
  store.dispatch(actions.setFeatureFlags({ isBillingStageFeatureEnabled: true }));
  expect(featureFlagsSelectors.selectIsBillingStageFeatureEnabled(store.getState())).toBe(true);
});
