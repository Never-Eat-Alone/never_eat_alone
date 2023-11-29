import * as React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  console.log('stripe', stripe);

  console.log('elements', elements);
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const paymentElement = elements.create('payment');
    const cardElement = elements.getElement(CardElement);
    console.log('cardElement', cardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Here you can call your backend to save the payment method or confirm a payment intent
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <CardElement />
      <button type="submit" disabled={!stripe} >
        Add Card
      </button>
    </form>);
};

export default StripeCheckoutForm;
