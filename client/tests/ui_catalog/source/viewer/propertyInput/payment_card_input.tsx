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
            checked={this.props.value.creditType ===
              NeverEatAlone.CreditCardType.VISA}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='visa'>visa</label>
        </div>
        <div style={PaymentCardInput.STYLE.label}>
          <input type='radio' name='credit_type' id='amex' value='amex'
            checked={this.props.value.creditType ===
              NeverEatAlone.CreditCardType.AMEX}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='amex'>amex</label>
        </div>
        <div style={PaymentCardInput.STYLE.label}>
          <input type='radio' name='credit_type' id='mastercard'
            value='mastercard'
            checked={this.props.value.creditType ===
              NeverEatAlone.CreditCardType.MASTERCARD}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='mastercard'>mastercard</label>
        </div>
        <div style={PaymentCardInput.STYLE.label}>
          <input type='radio' name='credit_type' id='other'
            value='other'
            checked={this.props.value.creditType ===
              NeverEatAlone.CreditCardType.OTHER}
            onChange={this.onChange}
            style={PaymentCardInput.STYLE.radio}/>
          <label htmlFor='other'>other</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'amex':
        this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
          NeverEatAlone.CreditCardType.AMEX, 1111));
      case 'mastercard':
        this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
          NeverEatAlone.CreditCardType.MASTERCARD, 6666));
      case 'visa':
        this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
          NeverEatAlone.CreditCardType.VISA, 5555));
      default:
        this.props.update(new NeverEatAlone.PaymentCard(Date.now(),
          NeverEatAlone.CreditCardType.OTHER, 8070));
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
