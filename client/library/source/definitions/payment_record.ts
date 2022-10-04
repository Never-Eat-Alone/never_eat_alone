import { EventCardSummary } from './event_card_summary';
import { PaymentCard } from './payment_card';

/** Describes the payment record. */
export class PaymentRecord {
  public static noRecord(): PaymentRecord {
    return new PaymentRecord(-1, EventCardSummary.noSummary(), 0, 0,
      new Date(), PaymentCard.noCard());
  }

  public static fromJson(value: any): PaymentRecord {
    return new PaymentRecord(
      value.id,
      value.eventId,
      value.amountCharged,
      value.amountOnHold,
      new Date(Date.parse(value.transactionDate)),
      value.paymentCardId);
  }

  constructor(id: number, eventCardSummary: EventCardSummary,
      amountCharged: number, amountOnHold: number, transactionDate: Date,
      paymentCard: PaymentCard) {
    this._id = id;
    this._eventCardSummary = eventCardSummary;
    this._amountCharged = amountCharged;
    this._amountOnHold = amountOnHold;
    this._transactionDate = transactionDate;
    this._paymentCard = paymentCard;
  }

  public get id(): number {
    return this._id;
  }

  public get eventCardSummary(): EventCardSummary {
    return this._eventCardSummary;
  }

  public get amountCharged(): number {
    return this._amountCharged;
  }

  public get amountOnHold(): number {
    return this._amountOnHold;
  }

  public get transactionDate(): Date {
    return this._transactionDate;
  }

  public get paymentCard(): PaymentCard {
    return this._paymentCard;
  }

  /** Converts the payment record object to json. */
  public toJson(): any {
    return {
      id: this._id,
      eventId: this._eventCardSummary,
      amountCharged: this._amountCharged,
      amountOnHold: this._amountOnHold,
      transactionDate: this._transactionDate.toJSON(),
      paymentCardId: this._paymentCard
    };
  }

  private _id: number;
  private _eventCardSummary: EventCardSummary;
  private _amountCharged: number;
  private _amountOnHold: number;
  private _transactionDate: Date;
  private _paymentCard: PaymentCard;
}
