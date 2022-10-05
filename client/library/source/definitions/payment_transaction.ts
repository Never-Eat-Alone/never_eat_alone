import { PaymentStatus } from './payment_status';
import { PaymentMethod } from './payment_method';

/** Describes the payment transaction. */
export class PaymentTransaction {
  public static fromJson(value: any): PaymentTransaction {
    return new PaymentTransaction(
      value.id,
      value.amount,
      value.paymentMethod as PaymentMethod,
      value.description,
      new Date(Date.parse(value.scheduledAt)),
      new Date(Date.parse(value.processedAt)),
      value.status as PaymentStatus
    );
  }

  constructor(id: number, amount: number, paymentMethod: PaymentMethod,
      cardType: CreditCardType, cardLast4digits: number, 
      description: string, scheduledAt: Date, processedAt: Date,
      status: PaymentStatus) {
    this._id = id;
    this._amount = amount;
    this._paymentMethod = paymentMethod;
    this._description = description;
    this._scheduledAt = scheduledAt;
    this._processedAt = processedAt;
    this._status = status;
  }

  public get id(): number {
    return this._id;
  }

  public get amount(): number {
    return this._amount;
  }

  public get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  public get description(): string {
    return this._description;
  }

  public scheduledAt(): Date {
    return this._scheduledAt;
  }

  public get processedAt(): Date {
    return this._processedAt;
  }

  public get status(): PaymentStatus {
    return this._status;
  }

  public toJson() {
    return {
      id: this._id,
      amount: this._amount,
      paymentMethod: this._paymentMethod,
      description: this._description,
      scheduledAt: this._scheduledAt.toJSON(),
      processedAt: this._processedAt.toJSON(),
      status: this._status
    };
  }

  private _id: number;
  private _amount: number;
  private _paymentMethod: PaymentMethod;
  private _description: string;
  private _scheduledAt: Date;
  private _processedAt: Date;
  private _status: PaymentStatus;
}
