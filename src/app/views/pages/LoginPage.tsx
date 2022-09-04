import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Container, Divider } from '@material-ui/core';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Page from './../../components/pages';

const LoginPage = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Page className={classes.root} title="Authentication">
      <Container>
        <Box
          my={5}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {/*if isLogin is true - show LoginForm, otherwise show 
RegisterForm. This implies that there's no need to create another register page, just set login to false 😂 */}

          {isLogin ? <LoginForm /> : <RegisterForm />}
          <Divider />
          <Box mt={5}>
            Go to{' '}
            {isLogin ? (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(false)}
              >
                Register Form
              </Button>
            ) : (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(true)}
              >
                Login Form
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles(() => ({ root: {} }));
export default LoginPage;
