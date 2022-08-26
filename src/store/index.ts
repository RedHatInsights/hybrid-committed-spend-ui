import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import { Middleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

export let registry: ReducerRegistry<any>;

export function init(...middleware: Middleware[]) {
  registry = getRegistry({}, [
    promiseMiddleware,
    notificationsMiddleware({ errorDescriptionKey: ['detail', 'stack'] }),
    ...middleware,
  ]);
  return registry;
}
