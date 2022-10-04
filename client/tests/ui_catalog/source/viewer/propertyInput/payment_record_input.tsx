import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the payment record. */
  value?: NeverEatAlone.PaymentRecord;

  /** The callback to update the value. */
  update?: (newCard: NeverEatAlone.PaymentRecord) => void;
}

/** A payment record input. */
export class PaymentRecordInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value && this.props.value.amountCharged ||
      '0'} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim() ||
          Number(event.target.value).toString() === 'NaN') {
        return new NeverEatAlone.PaymentRecord(1,
          new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
          new Date(2022, 6, 12, 19, 0, 0), new Date(2021, 6, 12, 23, 0, 0),
          'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
          'yellow'), 0, 0, new Date(), new NeverEatAlone.PaymentCard(Date.now(),
          4567890123456789, 'Jlo Jlo', 12, 2026, 2345, 'M3E 5G6',
          NeverEatAlone.CreditCardType.AMEX));
      }
      return new NeverEatAlone.PaymentRecord(1,
        new NeverEatAlone.EventCardSummary(2, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2021, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), Number(event.target.value), 0, new Date(),
        new NeverEatAlone.PaymentCard(Date.now(),
        4567890123456789, 'Jlo Jlo', 12, 2026, 2345, 'M3E 5G6',
        NeverEatAlone.CreditCardType.AMEX));
    })();
    this.props.update(newValue);
  }
}
