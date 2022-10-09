import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const PaymentPage = () => {
  const { price } = useParams<{ price: string }>();

  const [isOpen, setIsOpen] = useState(false);

  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo:
        'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  //@ts-ignore
  const handleFlutterPayment = useFlutterwave(config);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Checkout payment of subscription worth ${price}</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: response => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {
              setIsOpen(false);
            },
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
};

export default PaymentPage;
