import React, { useState, useEffect } from 'react';

import Header from './Header';
import { getProductAxios } from 'services/productService';
import { ProductType } from 'models/product-type';
import Results from './Results';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import Page from 'app/components/pages';

const ProductListView = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const fetchProducts = async () => {
    handleToggle();
    try {
      const { data } = await getProductAxios();
      setProducts(data);
    } catch (error) {
      alert('Something is wrong.');
    }
    handleClose(); // closes backdrop after data fetch
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Page
      className={classes.root}
      title="Product List"
      style={{ marginLeft: '30' }}
    >
      <Container maxWidth={false}>
        <Header />

        {products && (
          <Box mt={3}>
            <Results products={products} />
          </Box>
        )}
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
      ok
    </Page>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: 100,
    },
  }),
);
export default ProductListView;
