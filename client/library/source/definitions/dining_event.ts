import { EventStatus } from './event_status';
import { EventType } from './event_type';

/** Represents the DiningEvent object. */
export class DiningEvent {
  /** Creates DiningEvent from json. */
  public static fromJson(value: any): DiningEvent {
    return new DiningEvent(
      value.id,
      value.title,
      new Date(Date.parse(value.startAt)),
      new Date(Date.parse(value.endAt)),
      value.description,
      value.restaurantId,
      value.howToFind,
      value.maxAttendeeLimit,
      value.minAttendeeLimit,
      value.guestLimit,
      new Date(Date.parse(value.rsvpOpenAt)),
      new Date(Date.parse(value.rsvpCloseAt)),
      value.status as EventStatus,
      value.type as EventType,
      new Date(Date.parse(value.createdAt)),
      new Date(Date.parse(value.updatedAt))
    );
  }

  constructor(
    id: number,
    title: string,
    startAt: Date,
    endAt: Date,
    description: string,
    restaurantId: number,
    howToFind: string,
    maxAttendeeLimit: number,
    minAttendeeLimit: number,
    guestLimit: number,
    rsvpOpenAt: Date,
    rsvpCloseAt: Date,
    status: EventStatus,
    type: EventType,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._title = title;
    this._startAt = startAt;
    this._endAt = endAt;
    this._description = description;
    this._restaurantId = restaurantId;
    this._howToFind = howToFind;
    this._maxAttendeeLimit = maxAttendeeLimit;
    this._minAttendeeLimit = minAttendeeLimit;
    this._guestLimit = guestLimit;
    this._rsvpOpenAt = rsvpOpenAt;
    this._rsvpCloseAt = rsvpCloseAt;
    this._status = status;
    this._type = type;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get startAt(): Date {
    return this._startAt;
  }

  public get description(): string {
    return this._description;
  }

  public get restaurantId(): number {
    return this._restaurantId;
  }

  public get endAt(): Date {
    return this._endAt;
  }

  public get howToFind(): string {
    return this._howToFind;
  }

  public get maxAttendeeLimit(): number {
    return this._maxAttendeeLimit;
  }

  public get minAttendeeLimit(): number {
    return this._minAttendeeLimit;
  }

  public get guestLimit(): number {
    return this._guestLimit;
  }

  public get rsvpOpenAt(): Date {
    return this._rsvpOpenAt;
  }

  public get rsvpCloseAt(): Date {
    return this._rsvpCloseAt;
  }

  public get status(): EventStatus {
    return this._status;
  }

  public get type(): EventType {
    return this._type;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  /** Converts DiningEvent to json. */
  public toJson(): any {
    return {
      id: this._id,
      title: this._title,
      startAt: this._startAt.toJSON(),
      endAt: this._endAt.toJSON(),
      description: this._description,
      restaurantId: this._restaurantId,
      howToFind: this._howToFind,
      maxAttendeeLimit: this._maxAttendeeLimit,
      minAttendeeLimit: this._minAttendeeLimit,
      guestLimit: this._guestLimit,
      rsvpOpenAt: this._rsvpOpenAt.toJSON(),
      rsvpCloseAt: this._rsvpCloseAt.toJSON(),
      status: this._status,
      type: this._type,
      createdAt: this._createdAt.toJSON(),
      updatedAt: this._updatedAt.toJSON()
    };
  }

  private _id: number;
  private _title: string;
  private _startAt: Date;
  private _endAt: Date;
  private _description: string;
  private _restaurantId: number;
  private _howToFind: string;
  private _maxAttendeeLimit: number;
  private _minAttendeeLimit: number;
  private _guestLimit: number;
  private _rsvpOpenAt: Date;
  private _rsvpCloseAt: Date;
  private _status: EventStatus;
  private _type: EventType;
  private _createdAt: Date;
  private _updatedAt: Date;
}
