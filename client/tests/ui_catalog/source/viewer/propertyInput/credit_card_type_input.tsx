import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the creditcard type. */
  value?: NeverEatAlone.CreditCardType;

  /** The callback to update the value. */
  update?: (newType: NeverEatAlone.CreditCardType) => void;
}

/** A creditcard type input. */
export class CreditCardTypeInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CreditCardTypeInput.STYLE.container}>
        <div style={CreditCardTypeInput.STYLE.label}>
          <input type='radio' name='credit_type' id='visa' value='visa'
            checked={this.props.value === NeverEatAlone.CreditCardType.VISA}
            onChange={this.onChange}
            style={CreditCardTypeInput.STYLE.radio}/>
          <label htmlFor='visa'>Visa</label>
        </div>
        <div style={CreditCardTypeInput.STYLE.label}>
          <input type='radio' name='credit_type' id='amex' value='amex'
            checked={this.props.value === NeverEatAlone.CreditCardType.AMEX}
            onChange={this.onChange}
            style={CreditCardTypeInput.STYLE.radio}/>
          <label htmlFor='amex'>Amex</label>
        </div>
        <div style={CreditCardTypeInput.STYLE.label}>
          <input type='radio' name='credit_type' id='mastercard'
            value='mastercard'
            checked={this.props.value ===
              NeverEatAlone.CreditCardType.MASTERCARD}
            onChange={this.onChange}
            style={CreditCardTypeInput.STYLE.radio}/>
          <label htmlFor='mastercard'>Mastercard</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'amex':
        this.props.update(NeverEatAlone.CreditCardType.AMEX);
      case 'mastercard':
        this.props.update(NeverEatAlone.CreditCardType.MASTERCARD);
      case 'visa':
        this.props.update(NeverEatAlone.CreditCardType.VISA);
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
