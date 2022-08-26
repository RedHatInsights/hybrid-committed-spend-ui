import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

const SamplePage = lazy(
  () =>
    import(
      /* webpackChunkName: "SamplePage" */ './Routes/SamplePage/SamplePage'
    )
);
const OopsPage = lazy(
  () => import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage')
);
const NoPermissionsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "NoPermissionsPage" */ './Routes/NoPermissionsPage/NoPermissionsPage'
    )
);

const routes = [
  {
    path: '/',
    component: SamplePage,
    exact: true,
  },
  {
    path: '/explorer',
    component: SamplePage,
    exact: true,
  },
  {
    path: '/no-permissions',
    component: NoPermissionsPage,
    exact: true,
  },
  {
    path: '/oops',
    component: OopsPage,
    exact: true,
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
      {routes.map((route) => (
        <Route key={route.path as any} {...route} />
      ))}
      {/* Finally, catch all unmatched routes */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Suspense>
);
