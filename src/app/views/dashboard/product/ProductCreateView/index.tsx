import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './Header';
import ProductCreateForm from './ProductCreateForm';
import Page from 'app/components/pages';

const ProductCreateView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Product Create">
      <Container>
        <Header />
        <ProductCreateForm />
      </Container>
    </Page>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
  },
}));

export default ProductCreateView;
