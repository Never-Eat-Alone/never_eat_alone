import { arrayFromJson } from './array_json';
import { Attendee } from './attendee';
import { DressCode } from './dress_code';
import { EventStatus } from './event_status';
import { EventType } from './event_type';
import { Location } from './location';
import { Restaurant } from './restaurant';
import { Seating } from './seating';

/** Represents the DiningEvent object. */
export class DiningEvent {
  /** Creates DiningEvent from json. */
  public static fromJson(value: any): DiningEvent {
    return new DiningEvent(
      value.id,
      value.eventColor,
      value.eventFee,
      value.coverImageSrc,
      value.title,
      Restaurant.fromJson(value.restaurant),
      value.dressCode as DressCode,
      value.seating as Seating,
      Location.fromJson(value.location),
      value.reservationName,
      new Date(Date.parse(value.startAt)),
      new Date(Date.parse(value.endAt)),
      arrayFromJson(Attendee, value.attendeeList),
      value.totalCapacity,
      value.description,
      new Date(Date.parse(value.rsvpOpenAt)),
      new Date(Date.parse(value.rsvpCloseAt)),
      value.status as EventStatus,
      value.type as EventType,
      new Date(Date.parse(value.createdAt)),
      new Date(Date.parse(value.updatedAt))
    );
  }

  constructor(id: number, eventColor: string, eventFee: number,
      coverImageSrc: string, title: string, restaurant: Restaurant,
      dressCode: DressCode, seating: Seating, location: Location,
      reservationName: string, startAt: Date, endAt: Date,
      attendeeList: Attendee[], totalCapacity: number, description: string,
      rsvpOpenAt: Date, rsvpCloseAt: Date, status: EventStatus, type: EventType,
      createdAt: Date, updatedAt: Date) {
    this._id = id;
    this._eventColor = eventColor;
    this._eventFee = eventFee;
    this._coverImageSrc = coverImageSrc;
    this._title = title;
    this._restaurant = restaurant;
    this._dressCode = dressCode;
    this._seating = seating;
    this._location = location;
    this._reservationName = reservationName;
    this._startAt = startAt;
    this._endAt = endAt;
    this._attendeeList = attendeeList;
    this._totalCapacity = totalCapacity;
    this._description = description;
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

  public get eventColor(): string {
    return this._eventColor;
  }

  public get eventFee(): number {
    return this._eventFee;
  }

  public get coverImageSrc(): string {
    return this._coverImageSrc;
  }

  public get title(): string {
    return this._title;
  }

  public get restaurant(): Restaurant {
    return this._restaurant;
  }

  public get dressCode(): DressCode {
    return this._dressCode;
  }

  public get seating(): Seating {
    return this._seating;
  }

  public get location(): Location {
    return this._location;
  }

  public get reservationName(): string {
    return this._reservationName;
  }

  public get startAt(): Date {
    return this._startAt;
  }

  public get endAt(): Date {
    return this._endAt;
  }

  public get attendeeList(): Attendee[] {
    return this._attendeeList;
  }

  public get totalCapacity(): number {
    return this._totalCapacity;
  }

  public get description(): string {
    return this._description;
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
      eventColor: this._eventColor,
      eventFee: this._eventFee,
      coverImageSrc: this._coverImageSrc,
      title: this._title,
      restaurant: this._restaurant.toJson(),
      dressCode: this._dressCode,
      seating: this._seating,
      location: this._location.toJson(),
      reservationName: this._reservationName,
      startAt: this._startAt.toISOString(),
      endAt: this._endAt.toISOString(),
      description: this._description,
      rsvpOpenAt: this._rsvpOpenAt.toISOString(),
      rsvpCloseAt: this._rsvpCloseAt.toISOString(),
      status: this._status,
      type: this._type,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString()
    };
  }

  private _id: number;
  private _eventColor: string;
  private _eventFee: number;
  private _coverImageSrc: string;
  private _title: string;
  private _restaurant: Restaurant;
  private _dressCode: DressCode;
  private _seating: Seating;
  private _location: Location;
  private _reservationName: string;
  private _startAt: Date;
  private _endAt: Date;
  private _attendeeList: Attendee[];
  private _totalCapacity: number;
  private _description: string;
  private _rsvpOpenAt: Date;
  private _rsvpCloseAt: Date;
  private _status: EventStatus;
  private _type: EventType;
  private _createdAt: Date;
  private _updatedAt: Date;
}
