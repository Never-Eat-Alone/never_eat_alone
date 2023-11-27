import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import * as React from 'react';
import StripeCheckoutForm from './stripe_checkout_form';

const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';

const stripeTestPromise: Promise<Stripe | null> = loadStripe(
  STRIPE_TEST_PUBLIC_KEY);
	
console.log(stripeTestPromise);
	function StripeCheckoutContainer() {
		return (
			<Elements stripe={stripeTestPromise} >
				<StripeCheckoutForm />
			</Elements>
		);
	}
	
	export default StripeCheckoutContainer;
