import { AttendeeStatus } from './attendee_status';

export class Attendee {
  public static fromJson(value: any): Attendee {
    return new Attendee(
      value.userId,
      value.eventId,
      value.name,
      value.guestCount,
      value.status as AttendeeStatus,
      value.profileImageSrc,
      new Date(Date.parse(value.updatedAt)));
  }

  constructor(userId: number, eventId: number, name: string, guestCount: number,
      status: AttendeeStatus, profileImageSrc: string, updatedAt: Date) {
    this._userId = userId;
    this._eventId = eventId;
    this._name = name;
    this._guestCount = guestCount;
    this._status = status;
    this._profileImageSrc = profileImageSrc;
    this._updatedAt = updatedAt;
  }

  public get userId(): number {
    return this._userId;
  }

  public get eventId(): number {
    return this._eventId;
  }

  public get name(): string {
    return this._name;
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

  public get profileImageSrc(): string {
    return this._profileImageSrc;
  }

  public toJson(): any {
    return {
      userId: this._userId,
      eventId: this._eventId,
      name: this._name,
      guestCount: this._guestCount,
      status: this._status.toString(),
      profileImageSrc: this._profileImageSrc,
      updatedAt: this._updatedAt.toISOString()
    };
  }

  private _userId: number;
  private _eventId: number;
  private _name: string;
  private _guestCount: number;
  private _status: AttendeeStatus;
  private _profileImageSrc: string;
  private _updatedAt: Date;
}
