import { EmbeddedCheckoutProvider,
  EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import * as React from 'react';

const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';
const stripeTestPromise: Promise<Stripe | null> = loadStripe(
  STRIPE_TEST_PUBLIC_KEY);

function StripeCheckoutContainer() {
	const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

	console.log('clientSecret', clientSecret);

	const options = {
    clientSecret: clientSecret
  };

	return (
    <div id='checkout' >
      { clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripeTestPromise} options={options} >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default StripeCheckoutContainer;
