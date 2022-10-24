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
    return <input value={this.props.value &&
      this.props.value.paymentTransactions &&
      this.props.value.paymentTransactions[0].amount.toFixed() ||
      '0.00'} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim() ||
          Number(event.target.value).toString() === 'NaN') {
        return new NeverEatAlone.PaymentRecord(1,
          new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
          new Date(2022, 6, 12, 19, 0, 0), new Date(2021, 6, 12, 23, 0, 0),
          'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
          'yellow'), [
          new NeverEatAlone.PaymentTransaction(99, 'Event Fee', 3.98,
            NeverEatAlone.PaymentMethod.CREDIT_CARD,
            NeverEatAlone.CreditCardType.AMEX, '9604', 'Event fee',
            new Date(2021, 9, 2, 23, 15), new Date(2021, 9, 2, 23, 15),
            NeverEatAlone.PaymentStatus.CHARGED, 0.13)
        ]);
      }
      return new NeverEatAlone.PaymentRecord(1,
        new NeverEatAlone.EventCardSummary(2, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2021, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), [
          new NeverEatAlone.PaymentTransaction(99, 'Event Fee',
            Number(event.target.value),
            NeverEatAlone.PaymentMethod.CREDIT_CARD,
            NeverEatAlone.CreditCardType.VISA, '1458', 'Event fee',
            new Date(2022, 10, 1, 23, 15), new Date(2022, 10, 1, 23, 15),
            NeverEatAlone.PaymentStatus.CHARGED, 0.13)
        ]);
    })();
    this.props.update(newValue);
  }
}
