import { createMockStoreCreator } from 'store/mockStore';

import { featureToggleSelectors } from '.';
import * as actions from './featureToggleActions';
import { featureToggleReducer, stateKey } from './featureToggleReducer';
import * as selectors from './featureToggleSelectors';

const createUIStore = createMockStoreCreator({
  [stateKey]: featureToggleReducer,
});

test('default state', async () => {
  const store = createUIStore();
  expect(selectors.selectFeatureToggleState(store.getState())).toMatchSnapshot();
});

test('Billing stage feature is enabled', async () => {
  const store = createUIStore();
  store.dispatch(actions.setFeatureToggle({ isBillingStageToggleEnabled: true }));
  expect(featureToggleSelectors.selectIsBillingStageToggleEnabled(store.getState())).toBe(true);
});
