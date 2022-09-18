import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { price } = useParams<{ price: string }>();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>Checkout payment of subscription worth ${price}</h1>
    </div>
  );
};

export default PaymentPage;
