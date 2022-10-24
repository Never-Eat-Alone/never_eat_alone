import { CreditCardType } from './credit_card_type';
import { PaymentMethod } from './payment_method';
import { PaymentStatus } from './payment_status';

/** Describes the payment transaction. */
export class PaymentTransaction {
  public static fromJson(value: any): PaymentTransaction {
    return new PaymentTransaction(
      value.id,
      value.title,
      value.amount,
      value.paymentMethod as PaymentMethod,
      value.cardType as CreditCardType,
      value.cardLast4digits,
      value.description,
      new Date(Date.parse(value.scheduledAt)),
      new Date(Date.parse(value.processedAt)),
      value.status as PaymentStatus,
      value.taxRate);
  }

  constructor(id: number, title: string, amount: number,
      paymentMethod: PaymentMethod, cardType: CreditCardType,
      cardLast4digits: string, description: string, scheduledAt: Date,
      processedAt: Date, status: PaymentStatus, taxRate: number) {
    this._id = id;
    this._title = title;
    this._amount = amount;
    this._paymentMethod = paymentMethod;
    this._cardType = cardType;
    this._cardLast4digits = cardLast4digits;
    this._description = description;
    this._scheduledAt = scheduledAt;
    this._processedAt = processedAt;
    this._status = status;
    this._taxRate = taxRate;
  }

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get amount(): number {
    return this._amount;
  }

  public get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  public get cardType(): CreditCardType {
    return this._cardType;
  }

  public get cardLast4digits(): string {
    return this._cardLast4digits;
  }

  public get description(): string {
    return this._description;
  }

  /** The date that the transaction should happen. */
  public get scheduledAt(): Date {
    return this._scheduledAt;
  }

  /** The date the transaction happened. */
  public get processedAt(): Date {
    return this._processedAt;
  }

  public get status(): PaymentStatus {
    return this._status;
  }

  public get taxRate(): number {
    return this._taxRate;
  }

  public toJson() {
    return {
      id: this._id,
      title: this._title,
      amount: this._amount,
      paymentMethod: this._paymentMethod,
      cardType: this._cardType,
      cardLast4digits: this._cardLast4digits,
      description: this._description,
      scheduledAt: this._scheduledAt.toJSON(),
      processedAt: this._processedAt.toJSON(),
      status: this._status,
      taxRate: this._taxRate
    };
  }

  private _id: number;
  private _title: string;
  private _amount: number;
  private _paymentMethod: PaymentMethod;
  private _cardType: CreditCardType;
  private _cardLast4digits: string;
  private _description: string;
  private _scheduledAt: Date;
  private _processedAt: Date;
  private _status: PaymentStatus;
  private _taxRate: number;
}
