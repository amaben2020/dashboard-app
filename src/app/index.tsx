/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import MainLayout from './layouts/dashboard-layout/main-layout';
import NavigationBar from './layouts/dashboard-layout/main-layout/navigation-bar';
import { makeStyles } from '@material-ui/core/styles';
import { Routes } from './routes';
import { SnackbarProvider } from 'notistack';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider dense maxSnack={3}>
          <Helmet
            titleTemplate="%s - React Boilerplate"
            defaultTitle="React Boilerplate"
          >
            <meta
              name="description"
              content="A React Boilerplate 
application"
            />
          </Helmet>
          <MainLayout>
            <Routes />
          </MainLayout>
          <GlobalStyle />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}
