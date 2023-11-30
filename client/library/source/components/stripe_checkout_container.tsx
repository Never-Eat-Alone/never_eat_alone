import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import * as React from 'react';

const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';
const stripeTestPromise: Promise<Stripe | null> = loadStripe(
  STRIPE_TEST_PUBLIC_KEY);

interface Properties {
	eventId: number;
}

function StripeCheckoutContainer(props: Properties) {
	const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    fetch('/api/create-checkout-session', {
      method: 'POST',
			headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eeventId: props.eventId,
        quantity: 1
      })
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
        <Elements stripe={stripeTestPromise} options={options} >
          <PaymentElement />
        </Elements>
      )}
    </div>);
}

export default StripeCheckoutContainer;
