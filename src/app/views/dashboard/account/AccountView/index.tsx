import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles,
} from '@material-ui/core';
import React, { useState, ChangeEvent } from 'react';
import Header from './Header';
import General from './General';
import Subscription from './Subscription';
import Notifications from './Notifications';
import Security from './Security';
import Page from 'app/components/pages';

const AccountView = () => {
  const classes = useStyles();
  /*initialize the useState to 'general' - we will use that */
  const [currentTab, setCurrentTab] = useState('general');
  /*handleTabsChange -for setting or updating the value of the current tab */
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {/*we're going to iterate or loop on the tabs here */}
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {/*current tab by default is the General component.
The rest is not displayed until clicked or selected */}
          {currentTab === 'general' && <General />}
          {currentTab === 'subscription' && <Subscription />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </Page>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
/* an array of objects with value. to be used in the
tabs for navigating between components*/
const tabs = [
  { value: 'general', label: 'General' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'security', label: 'Security' },
];
export default AccountView;
