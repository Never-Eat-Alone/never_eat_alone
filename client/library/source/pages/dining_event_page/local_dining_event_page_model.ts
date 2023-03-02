import { Attendee, DressCode, Location, Restaurant, Seating, User
} from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** local model used by the DiningEventPage. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(eventId: number, eventColor: string, eventFee: number,
      coverImageSrc: string, title: string, restaurant: Restaurant,
      dressCode: DressCode, seating: Seating, location: Location,
      reservationName: string, startTime: Date, endTime: Date,
      attendeeList: Attendee[], totalCapacity: number, description: string,
      isGoing: boolean, isRSVPOpen: boolean) {
    super();
    this._eventId = eventId;
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
    this._isRSVPOpen = isRSVPOpen;
  }

  /** Loads the data to display on the DiningEventPage
   * must be called before calling any other method of this class.
   */
  public async load(): Promise<void> {}

  public get eventId(): number {
    return this._eventId;
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

  public get startTime(): Date {
    return this._startTime;
  }

  public get endTime(): Date {
    return this._endTime;
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

  public get isGoing(): boolean {
    return this._isGoing;
  }

  public get isRSVPOpen(): boolean {
    return this._isRSVPOpen;
  }

  public async joinEvent(account: User, profileImageSrc: string): Promise<
      boolean> {
    return Boolean(account && profileImageSrc);
  }

  public async removeSeat(account: User): Promise<boolean> {
    return Boolean(account);
  }

  
  private _eventId: number;
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
  private _isRSVPOpen: boolean;
}
