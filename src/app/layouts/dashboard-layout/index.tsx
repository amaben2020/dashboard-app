import React from 'react';
import { Grid } from '@material-ui/core';

import DashboardSidebarNavigation from './dashboard-sidebar-navigation';
import NavigationBar from './main-layout/navigation-bar';

type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <DashboardSidebarNavigation />
      {children}
    </Grid>
  );
};

export default Dashboard;
