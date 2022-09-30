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
    return <input value={this.props.value.cardNumber.toString().slice(-4)}
      onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim() ||
          Number(event.target.value).toString() === 'NaN') {
        return new NeverEatAlone.PaymentCard(Date.now(), 4567890123456789,
          'Jlo Jlo', 12, 2026, 2345, 'M3E 5G6',
          NeverEatAlone.CreditCardType.AMEX);
      }
      return new NeverEatAlone.PaymentCard(Date.now(),
        Number(event.target.value), 'Jlo Jlo', 12, 2026, 2345, 'M3E 5G6',
        NeverEatAlone.CreditCardType.VISA);
    })();
    this.props.update(newValue);
  }
}
