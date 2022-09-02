import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the payment card. */
  value?: NeverEatAlone.PaymentCard;

  /** The callback to update the value. */
  update?: (newCard: NeverEatAlone.PaymentCard) => void;
}

/** A payment card input. */
export class PaymentCardInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={PaymentCardInput.STYLE.container}>
        <div style={PaymentCardInput.STYLE.label}>
          <input type='radio' name='credit_type' id='visa' value='visa'
            checked={this.props.value ===  NeverEatAlone.CreditCardType.VISA}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='visa'>visa</label>
        </div>
        <div style={PaymentCardInput.STYLE.label}>
          <input type='radio' name='credit_type' id='amex' value='amex'
            checked={this.props.value ===  NeverEatAlone.CreditCardType.AMEX}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='amex'>amex</label>
        </div>
        <div style={PaymentCardInput.STYLE.label}>
          <input type='radio' name='credit_type' id='mastercard'
            value='mastercard'
            checked={this.props.value ===
              NeverEatAlone.CreditCardType.MASTERCARD}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='mastercard'>mastercard</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value;
    if (mode === 'amex') {
      this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
        NeverEatAlone.CreditCardType.AMEX, 1111));
    } else if (mode === 'mastercard') {
      this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
        NeverEatAlone.CreditCardType.MASTERCARD, 6666));
    } else {
      this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
        NeverEatAlone.CreditCardType.VISA, 5555));
    }
  }

  private static readonly STYLE = {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    } as React.CSSProperties,
    radio: {
      margin: '0 5px 0 0'
    } as React.CSSProperties,
    label: {
      display: 'flex',
      alignItems: 'center'
    } as React.CSSProperties
  };
}
