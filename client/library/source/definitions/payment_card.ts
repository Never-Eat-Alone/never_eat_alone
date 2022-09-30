import { CreditCardType } from './credit_card_type';

/** Describes the payment card. */
export class PaymentCard {
  public static noCard(): PaymentCard {
    return new PaymentCard(-1, 0, '', 1, 1, 0, '', CreditCardType.VISA);
  }

  public static fromJson(value: any): PaymentCard {
    return new PaymentCard(
      value.id,
      value.cardNumber,
      value.nameOnCard,
      value.month,
      value.year,
      value.securityCode,
      value.zipcode,
      value.creditType as CreditCardType);
  }

  constructor(id: number, cardNumber: number, nameOnCard: string, month: number,
      year: number, securityCode: number, zipcode: string,
      creditType: CreditCardType) {
    this._id = id;
    this._cardNumber = cardNumber;
    this._nameOnCard = nameOnCard;
    this._month = month;
    this._year = year;
    this._securityCode = securityCode;
    this._zipcode = zipcode;
    this._creditType = creditType;
  }

  public get id(): number {
    return this._id;
  }

  public get cardNumber(): number {
    return this._cardNumber;
  }

  public get nameOnCard(): string {
    return this._nameOnCard;
  }

  public get month(): number {
    return this._month;
  }

  public get year(): number {
    return this._year;
  }

  public get securityCode(): number {
    return this._securityCode;
  }

  public get zipcode(): string {
    return this._zipcode;
  }

  public get creditType(): CreditCardType {
    return this._creditType;
  }

  /** Converts the payment card object to json. */
  public toJson(): any {
    return {
      id: this._id,
      cardNumber: this._cardNumber,
      nameOnCard: this._nameOnCard,
      month: this._month,
      year: this.year,
      securityCode: this._securityCode,
      zipcode: this._zipcode,
      creditType: this._creditType
    };
  }

  private _id: number;
  private _cardNumber: number;
  private _nameOnCard: string;
  private _month: number;
  private _year: number;
  private _securityCode: number;
  private _zipcode: string;
  private _creditType: CreditCardType;
}
