import { arrayFromJson, arrayToJson } from './array_json';
import { Cuisine } from './cuisine';
import { PriceRange } from './price_range';

/** Implements the EventCardSummary. */
export class EventCardSummary {
  public static noSummary(): EventCardSummary {
    return new EventCardSummary(-1, '', new Date(), new Date(), '',
      PriceRange.UNKNOWN, [], '', 0, 0, false, '');
  }

  /** Creates an EventCardSummary from a json object. */
  public static fromJson(value: any): EventCardSummary {
    return new EventCardSummary(
      value.eventId,
      value.eventTitle,
      new Date(Date.parse(value.eventStartTime)),
      new Date(Date.parse(value.eventEndTime)),
      value.restaurantName,
      value.restaurantPriceRange as PriceRange,
      arrayFromJson(Cuisine, value.cuisines),
      value.imageSrc,
      value.numberOfAttendees,
      value.numberOfSeats,
      value.isAttending,
      value.eventColor
    );
  }

  constructor(eventId: number, eventTitle: string, eventStartTime: Date,
      eventEndTime: Date, restaurantName: string,
      restaurantPriceRange: PriceRange, cuisines: Cuisine[], imageSrc: string,
      numberOfAttendees: number, numberOfSeats: number, isAttending: boolean,
      eventColor: string) {
    this._eventId = eventId;
    this._eventTitle = eventTitle;
    this._eventStartTime = eventStartTime;
    this._eventEndTime = eventEndTime;
    this._restaurantName = restaurantName;
    this._restaurantPriceRange = restaurantPriceRange;
    this._cuisines = [...cuisines];
    this._imageSrc = imageSrc;
    this._numberOfAttendees = numberOfAttendees;
    this._numberOfSeats = numberOfSeats;
    this._isAttending = isAttending;
    this._eventColor = eventColor;
  }

  /** Returns the event id. */
  public get eventId(): number {
    return this._eventId;
  }

  /** Returns the event title. */
  public get eventTitle(): string {
    return this._eventTitle;
  }

  /** Returns the event start time. */
  public get eventStartTime(): Date {
    return this._eventStartTime;
  }

  /** Returns the event end time. */
  public get eventEndTime(): Date {
    return this._eventEndTime;
  }

  /** Returns the restaurant name. */
  public get restaurantName(): string {
    return this._restaurantName;
  }

  /** Returns the restaurant price range. */
  public get restaurantPriceRange(): PriceRange {
    return this._restaurantPriceRange;
  }

  /** Returns the cuisines. */
  public get cuisines(): Cuisine[] {
    return this._cuisines;
  }

  /** Returns the image source for the EventCardSummary. */
  public get imageSrc(): string {
    return this._imageSrc;
  }

  /** Returns the number of attendees. */
  public get numberOfAttendees(): number {
    return this._numberOfAttendees;
  }

  /** Returns the number of seats. */
  public get numberOfSeats(): number {
    return this._numberOfSeats;
  }

  /** Indicates whether the user is attending this event or not. */
  public get isAttending(): boolean {
    return this._isAttending;
  }

  /** Indicates the event color assined to the card. */
  public get eventColor(): string {
    return this._eventColor;
  }

  /** Converts the EventCardSummary to json. */
  public toJson(): any {
    return {
      eventId: this._eventId,
      eventTitle: this._eventTitle,
      eventStartTime: this._eventStartTime.toJSON(),
      eventEndTime: this._eventEndTime.toJSON(),
      restaurantName: this._restaurantName,
      restaurantPriceRange: this._restaurantPriceRange,
      cuisines: arrayToJson(this._cuisines),
      imageSrc: this._imageSrc,
      numberOfAttendees: this._numberOfAttendees,
      numberOfSeats: this._numberOfSeats,
      isFollowing: this._isFollowing,
      isAttending: this._isAttending,
      eventColor: this._eventColor
    };
  }

  private _eventId: number;
  private _eventTitle: string;
  private _eventStartTime: Date;
  private _eventEndTime: Date;
  private _restaurantName: string;
  private _restaurantPriceRange: PriceRange;
  private _cuisines: Cuisine[];
  private _imageSrc: string;
  private _numberOfAttendees: number;
  private _numberOfSeats: number;
  private _isFollowing: boolean;
  private _isAttending: boolean;
  private _eventColor: string;
}
