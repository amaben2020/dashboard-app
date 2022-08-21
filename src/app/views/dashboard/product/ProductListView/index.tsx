import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './Header';
import { getProductAxios } from 'services/productService';
import { ProductType } from 'models/product-type';
import Results from './Results';

const ProductListView = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Container>
      {/* <Header /> */}
      <Results />
    </Container>
  );
};

const useStyles = makeStyles(theme => ({}));
export default ProductListView;
