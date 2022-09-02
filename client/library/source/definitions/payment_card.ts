import { CreditCardType } from './credit_card_type';

/** Describes the payment card. */
export class PaymentCard {
  public static fromJson(value: any): PaymentCard {
    return new PaymentCard(
      value.id,
      value.creditType as CreditCardType,
      value.last4Digits);
  }

  constructor(id: number, creditType: CreditCardType, last4Digits: number) {
    this._id = id;
    this._creditType = creditType;
    this._last4Digits = last4Digits;
  }

  public get id(): number {
    return this._id;
  }

  public get creditType(): CreditCardType {
    return this._creditType;
  }

  public get last4Digits(): number {
    return this._last4Digits;
  }

  /** Converts the payment card object to json. */
  public toJson(): any {
    return {
      id: this._id,
      creditType: this._creditType,
      last4Digits: this._last4Digits
    };
  }

  private _id: number;
  private _creditType: CreditCardType;
  private _last4Digits: number;
}
