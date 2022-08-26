import { Bullseye, Spinner } from '@patternfly/react-core';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SamplePage = lazy(() => import(/* webpackChunkName: "SamplePage" */ './Routes/SamplePage/SamplePage'));
const OopsPage = lazy(() => import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage'));
const NoPermissionsPage = lazy(
  () => import(/* webpackChunkName: "NoPermissionsPage" */ './Routes/NoPermissionsPage/NoPermissionsPage')
);

const routes = [
  {
    component: SamplePage,
    exact: true,
    path: '/',
  },
  {
    component: SamplePage,
    exact: true,
    path: '/explorer',
  },
  {
    component: NoPermissionsPage,
    exact: true,
    path: '/no-permissions',
  },
  {
    component: OopsPage,
    exact: true,
    path: '/oops',
  },
];

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      {/* Finally, catch all unmatched routes */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Suspense>
);
