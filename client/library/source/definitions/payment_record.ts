import { arrayFromJson, arrayToJson } from './array_json';
import { EventCardSummary } from './event_card_summary';
import { PaymentTransaction } from './payment_transaction';

/** Describes the payment record. */
export class PaymentRecord {
  public static noRecord(): PaymentRecord {
    return new PaymentRecord(-1, EventCardSummary.noSummary(), []);
  }

  public static fromJson(value: any): PaymentRecord {
    return new PaymentRecord(
      value.id,
      value.eventCardSummary,
      arrayFromJson(PaymentTransaction, value.paymentTransactions)
    );
  }

  constructor(id: number, eventCardSummary: EventCardSummary,
      paymentTransactions: PaymentTransaction[]) {
    this._id = id;
    this._eventCardSummary = eventCardSummary;
    this._paymentTransactions = paymentTransactions;
  }

  public get id(): number {
    return this._id;
  }

  public get eventCardSummary(): EventCardSummary {
    return this._eventCardSummary;
  }

  public get paymentTransactions(): PaymentTransaction[] {
    return this._paymentTransactions;
  }

  /** Converts the payment record object to json. */
  public toJson(): any {
    return {
      id: this._id,
      eventCardSummary: this._eventCardSummary,
      paymentTransactions: arrayToJson(this._paymentTransactions)
    };
  }

  private _id: number;
  private _eventCardSummary: EventCardSummary;
  private _paymentTransactions: PaymentTransaction[];
}
