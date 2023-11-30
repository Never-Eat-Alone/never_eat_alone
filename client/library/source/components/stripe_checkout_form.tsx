import * as React from 'react';
import { loadStripe, Stripe  } from '@stripe/stripe-js';

const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';
const stripeTestPromise: Promise<Stripe | null> = loadStripe(
  STRIPE_TEST_PUBLIC_KEY);

const StripeCheckoutForm : React.FC = () => {
  const handleCheckoutSubmit = async (event: React.FormEvent<HTMLFormElement>
      ) => {
    event.preventDefault();
    const stripe = await stripeTestPromise;
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }

    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <form onSubmit={handleCheckoutSubmit} >
      <button type='submit' >
        Checkout
      </button>
    </form>);
};

export default StripeCheckoutForm;
