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
    return <input value={this.props.value.last4Digits.toString()}
      onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim() ||
          Number(event.target.value).toString() === 'NaN') {
        return new NeverEatAlone.PaymentCard(Date.now(),
          NeverEatAlone.CreditCardType.OTHER, 3838);
      }
      return new NeverEatAlone.PaymentCard(Date.now(),
        NeverEatAlone.CreditCardType.VISA, Number(event.target.value));
    })();
    this.props.update(newValue);
  }
}
