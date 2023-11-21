import * as React from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCardType } from '../definitions';
import { PrimaryTextButton } from './text_button';

const stripePromise = loadStripe('pk_test_51OCmJEKaHeyRq5c018mgmbhTOf9Vr4c7DavGL5xEert25CgTVQAvLgsFgZig5r2A7trQ8pO56HjfiuBaLrqn24Ph00PYe0I0F7');

console.log('process', process.env);

console.log(stripePromise);

interface Properties {
  /** Title section of the form. */
  titleSection?: JSX.Element;

  /** Style associated with the title section. */
  titleSectionStyle?: React.CSSProperties;

  /** Label used for the Add card button. */
  onAddLabel: string;

  /** Error message regarding adding a new card. */
  addCardErrorMessage: string;

  /** The form css style. */
  style?: React.CSSProperties;

  /** Indicates the cancel button is clicked. */
  onCancel: () => void;

  /** Indicates the add button is clicked. */
  onAddCard: (cardNumber: number, cardName: string, month: number, year: number,
    securityCode: number, zipcode: string, creditCardType: CreditCardType
    ) => void;
}

interface State {
  error: string;
}

/** Displays the Add Creditcard Form. */
export const AddCreditCardForm: React.FC<Properties> = (props: Properties) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState<string | null>(null);

  const handleOnAdd = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      // Send result.paymentMethod.id to your server to save it to the user's profile
      console.log('Payment method ID:', result.paymentMethod.id);
    }
  };

  const titleSection = (props.titleSection ||
    <div
        style={{...ADD_CARD_TITLE_ROW_STYLE, ...props.titleSectionStyle}}
    >
      <img
        style={BACK_ICON_STYLE}
        src='resources/icons/back.svg'
        alt='Back Icon'
        onClick={props.onCancel}
      />
      <h1 style={ADD_CARD_HEADLINE_STYLE} >Add a card</h1>
    </div>);

  return (
    <Elements stripe={stripePromise} >
      <form style={props.style} onSubmit={handleOnAdd} >
        {titleSection}
        <CardElement />
        {error && <div style={ERROR_MESSAGE_STYLE} >{error}</div>}
        <PrimaryTextButton
          type='submit'
          style={CONTINUE_BUTTON_STYLE}
          label={props.onAddLabel}
          onClick={handleOnAdd}
        />
      </form>
    </Elements>
  );
};

const ADD_CARD_TITLE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '30px',
  backgroundColor: 'transparent',
  gap: '10px',
  marginBottom: '10px'
};

const BACK_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  height: '15px',
  minWidth: '15px',
  minHeight: '15px',
  backgroundColor: 'transparent'
};

const ADD_CARD_HEADLINE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const CONTINUE_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  marginTop: '7px',
  height: '38px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  minHeight: '18px',
  color: '#FF2C79',
  padding: '0px',
  margin: '5px 0px 0px 0px',
  width: '100%'
};
