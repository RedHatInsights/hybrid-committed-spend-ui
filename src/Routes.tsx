import { Bullseye, Spinner } from '@patternfly/react-core';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Explorer = lazy(() => import(/* webpackChunkName: "SamplePage" */ 'routes/views/Explorer/Explorer'));
const Overview = lazy(() => import(/* webpackChunkName: "SamplePage" */ 'routes/views/Overview/Overview'));

const OopsPage = lazy(() => import(/* webpackChunkName: "OopsPage" */ 'routes/views/OopsPage/OopsPage'));
const NoPermissionsPage = lazy(
  () => import(/* webpackChunkName: "NoPermissionsPage" */ 'routes/views/NoPermissionsPage/NoPermissionsPage')
);

// For syncing with permissions
export const paths = {
  explorer: '/explorer',
  overview: '/',
};

const routes = [
  {
    component: Explorer,
    exact: true,
    path: paths.explorer,
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
  {
    component: Overview,
    exact: true,
    path: paths.overview,
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
