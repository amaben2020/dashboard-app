import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import Dashboard from './layouts/dashboard-layout';
import HomePage from './views/pages/HomePage';
import NotFoundPage from './views/pages/NotFoundPage';
import ProtectedRoute from './components/protected-route';

export const Routes = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Switch>
        {/*eager loading*/}
        <Route path={'/'} component={HomePage} exact />
        {/*lazy loadings*/}
        <Route
          path={'/about'}
          component={lazy(() => import('./views/pages/AboutPage'))}
          exact
        />

        <Route
          path={'/login'}
          exact
          component={lazy(() => import('./views/pages/LoginPage'))}
        />

        <Route
          path={'/pricing'}
          exact
          component={lazy(() => import('./views/pages/pricing/PricingPage'))}
        />

        <Route
          path={'/payment/:price'}
          exact
          component={lazy(() => import('./views/pages/payment/PaymentPage'))}
        />

        <ProtectedRoute
          path={'/dashboard'}
          render={({ match: { path } }) => (
            <Dashboard>
              <Switch>
                <Route
                  path={path + '/'}
                  component={lazy(
                    () => import('./views/dashboard/dashboard-default-content'),
                  )}
                  exact
                />
                <Route
                  path={path + '/settings-and-privacy'}
                  component={lazy(
                    () => import('./views/dashboard/settings-and-privacy'),
                  )}
                  exact
                />
                <Route
                  exact
                  path={path + '/account'}
                  component={lazy(
                    () => import('./views/dashboard/account/AccountView/index'),
                  )}
                />
                <Route
                  path={path + '/list-products'}
                  component={lazy(
                    () => import('./views/dashboard/product/ProductListView'),
                  )}
                  exact
                />
                <Route
                  path={path + '/calendar'}
                  component={lazy(
                    () =>
                      import('./views/dashboard/calendar/CalendarView/index'),
                  )}
                />
                <Route
                  path={path + '/create-product'}
                  component={lazy(
                    () => import('./views/dashboard/product/ProductCreateView'),
                  )}
                  exact
                />
              </Switch>
            </Dashboard>
          )}
        />

        {/*eager loading*/}
        <Route path={'/not-found'} component={NotFoundPage} exact />
        <Redirect from={'*'} to={'/not-found'} exact />
      </Switch>
    </Suspense>
  );
};
