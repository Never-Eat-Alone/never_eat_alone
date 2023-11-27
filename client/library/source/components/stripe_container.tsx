import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import React from 'react';
import { AddCreditCardForm, AddCreditCardFormProperties } from
  './add_credit_card_form';

const STRIPE_TEST_PUBLIC_KEY = 'pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7';

const stripeTestPromise: Promise<Stripe | null> = loadStripe(STRIPE_TEST_PUBLIC_KEY);

interface StripeContainerProps extends AddCreditCardFormProperties { }

const StripeContainer: React.FC<StripeContainerProps> = (props) => {
	return (
		<Elements stripe={stripeTestPromise} >
			<AddCreditCardForm {...props} />
		</Elements>);
}

export default StripeContainer;
