import * as React from 'react';
import { PrimaryTextButton } from '../../components';

interface Properties {

  style?: React.CSSProperties;

  label: string;

  /** Indicates user clicked on checkout button. */
  onCheckout: () => void;
}

const StripeCheckoutForm : React.FC<Properties> = (props) => {
  const handleCheckoutSubmit = async (event: React.FormEvent<HTMLFormElement>
      ) => {
    event.preventDefault();
    props.onCheckout();
  };

  return (
    <form onSubmit={handleCheckoutSubmit} style={{ ...FORM_STYLE,
        ...props.style}} >
      <PrimaryTextButton label={props.label} type='submit'
        style={CHECKOUT_BUTTON_STYLE} />
    </form>);
};

export default StripeCheckoutForm;

const FORM_STYLE: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  marginTop: '20px',
  marginBottom: '20px'
};

const CHECKOUT_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px'
};
