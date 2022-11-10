import { Attendee, DressCode, Location, Restaurant, Seating
} from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(eventColor: string, eventFee: number, coverImageSrc: string,
      title: string, restaurant: Restaurant, dressCode: DressCode,
      seating: Seating, location: Location, reservationName: string,
      startTime: Date, endTime: Date, attendeeList: Attendee[],
      totalCapacity: number, description: string, isGoing: boolean,
      isLoggedIn: boolean, isRSVPOpen: boolean) {
    super();
    this._eventColor = eventColor;
    this._eventFee = eventFee;
    this._coverImageSrc = coverImageSrc;
    this._title = title;
    this._restaurant = restaurant;
    this._dressCode = dressCode;
    this._seating = seating;
    this._location = location;
    this._reservationName = reservationName;
    this._startTime = startTime;
    this._endTime = endTime;
    this._attendeeList = attendeeList;
    this._totalCapacity = totalCapacity;
    this._description = description;
    this._isGoing = isGoing;
    this._isLoggedIn = isLoggedIn;
    this._isRSVPOpen = isRSVPOpen;
  }

  public load(): Promise<void> {
    return;
  }

  public getEventColor(): string {
    return this._eventColor;
  }

  public getEventFee(): number {
    return this._eventFee;
  }

  public getCoverImageSrc(): string {
    return this._coverImageSrc;
  }

  public getTitle(): string {
    return this._title;
  }

  public getRestaurant(): Restaurant {
    return this._restaurant;
  }

  public getDressCode(): DressCode {
    return this._dressCode;
  }

  public getSeating(): Seating {
    return this._seating;
  }

  public getLocation(): Location {
    return this._location;
  }

  public getReservationName(): string {
    return this._reservationName;
  }

  public getStartTime(): Date {
    return this._startTime;
  }

  public getEndTime(): Date {
    return this._endTime;
  }

  public getAttendeeList(): Attendee[] {
    return this._attendeeList;
  }

  public getTotalCapacity(): number {
    return this._totalCapacity;
  }

  public getDescription(): string {
    return this._description;
  }

  public getIsGoing(): boolean {
    return this._isGoing;
  }

  public getIsLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public getIsRSVPOpen(): boolean {
    return this._isRSVPOpen;
  }

  private _eventColor: string;
  private _eventFee: number;
  private _coverImageSrc: string;
  private _title: string;
  private _restaurant: Restaurant;
  private _dressCode: DressCode;
  private _seating: Seating;
  private _location: Location;
  private _reservationName: string;
  private _startTime: Date;
  private _endTime: Date;
  private _attendeeList: Attendee[];
  private _totalCapacity: number;
  private _description: string;
  private _isGoing: boolean;
  private _isLoggedIn: boolean;
  private _isRSVPOpen: boolean;
}
