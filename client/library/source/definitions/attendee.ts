import { AttendeeStatus } from './attendee_status';

export class Attendee {
  public static fromJson(value: any): Attendee {
    return new Attendee(
      value.userId,
      value.eventId,
      value.guestCount,
      value.status as AttendeeStatus,
      new Date(Date.parse(value.updatedAt))
    );
  }

  constructor(userId: number, eventId: number, guestCount: number,
      status: AttendeeStatus, updatedAt: Date) {
    this._userId = userId;
    this._eventId = eventId;
    this._guestCount = guestCount;
    this._status = status;
    this._updatedAt = updatedAt;
  }

  public get userId(): number {
    return this._userId;
  }

  public get eventId(): number {
    return this._eventId;
  }

  public get guestCount(): number {
    return this._guestCount;
  }

  public get status(): AttendeeStatus {
    return this._status;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateStatus(status: AttendeeStatus, updatedAt: Date): void {
    this._status = status;
    this._updatedAt = updatedAt;
  }

  public updateGuests(total: number, updatedAt: Date): void {
    this._guestCount = total;
    this._updatedAt = updatedAt;
  }

  public toJson(): any {
    return {
      userId: this._userId,
      eventId: this._eventId,
      guestCount: this._guestCount,
      status: this._status,
      updatedAt: this._updatedAt.toJSON()
    };
  }

  private _userId: number;
  private _eventId: number;
  private _guestCount: number;
  private _status: AttendeeStatus;
  private _updatedAt: Date;
}
