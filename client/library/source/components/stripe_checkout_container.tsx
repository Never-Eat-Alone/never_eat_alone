import { PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import * as React from 'react';

const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';
const stripeTestPromise: Promise<Stripe | null> = loadStripe(
  STRIPE_TEST_PUBLIC_KEY);

function StripeCheckoutContainer() {
	const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    fetch('/api/create-checkout-session', {
      method: 'POST'
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

	const options = {
    clientSecret: clientSecret
  };

	return (
    <div id='checkout' >
      { clientSecret && (
        <Element stripe={stripeTestPromise} options={options} >
          <PaymentElement />
        </Element>
      )}
    </div>);
}

export default StripeCheckoutContainer;
