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

export function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>
        <NavigationBar />
        <MainLayout>
          <Routes />
        </MainLayout>
        <GlobalStyle />
      </SnackbarProvider>
    </BrowserRouter>
  );
}
