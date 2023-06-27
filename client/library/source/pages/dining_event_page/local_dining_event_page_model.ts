import { Attendee, DressCode, Location, Restaurant, Seating, User } from
  '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(eventId: number, eventColor: string, eventFee: number,
      coverImageSrc: string, title: string, restaurant: Restaurant, dressCode:
      DressCode, seating: Seating, location: Location, reservationName: string,
      startTime: Date, endTime: Date, attendeeList: Attendee[], totalCapacity:
      number, description: string, isGoing: boolean, isRSVPOpen: boolean) {
    super();
    this._isLoaded = false;
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

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get eventId(): number {
    this.ensureIsLoaded();
    return this._eventId;
  }

  public get eventColor(): string {
    this.ensureIsLoaded();
    return this._eventColor;
  }

  public get eventFee(): number {
    this.ensureIsLoaded();
    return this._eventFee;
  }

  public get coverImageSrc(): string {
    this.ensureIsLoaded();
    return this._coverImageSrc;
  }

  public get title(): string {
    this.ensureIsLoaded();
    return this._title;
  }

  public get restaurant(): Restaurant {
    this.ensureIsLoaded();
    return this._restaurant;
  }

  public get dressCode(): DressCode {
    this.ensureIsLoaded();
    return this._dressCode;
  }

  public get seating(): Seating {
    this.ensureIsLoaded();
    return this._seating;
  }

  public get location(): Location {
    this.ensureIsLoaded();
    return this._location;
  }

  public get reservationName(): string {
    this.ensureIsLoaded();
    return this._reservationName;
  }

  public get startTime(): Date {
    this.ensureIsLoaded();
    return this._startTime;
  }

  public get endTime(): Date {
    this.ensureIsLoaded();
    return this._endTime;
  }

  public get attendeeList(): Attendee[] {
    this.ensureIsLoaded();
    return this._attendeeList;
  }

  public get totalCapacity(): number {
    this.ensureIsLoaded();
    return this._totalCapacity;
  }

  public get description(): string {
    this.ensureIsLoaded();
    return this._description;
  }

  public get isGoing(): boolean {
    this.ensureIsLoaded();
    return this._isGoing;
  }

  public get isRSVPOpen(): boolean {
    this.ensureIsLoaded();
    return this._isRSVPOpen;
  }

  public async joinEvent(account: User, profileImageSrc: string): Promise<
      boolean> {
    this.ensureIsLoaded();
    return Boolean(account && profileImageSrc);
  }

  public async removeSeat(account: User): Promise<boolean> {
    this.ensureIsLoaded();
    return Boolean(account);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
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
  private _isLoaded: boolean;
}
