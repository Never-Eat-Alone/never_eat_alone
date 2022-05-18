import { arrayFromJson, arrayToJson } from './array_json';
import { Cuisine } from './cuisine';
import { PriceRange } from './price_range';

/** Implements the EventCardSummary. */
export class EventCardSummary {
  /** Creates an EventCardSummary from a json object. */
  public static fromJson(value: any): EventCardSummary {
    return new EventCardSummary(
      value.eventId,
      value.eventTitle,
      new Date(Date.parse(value.eventStartTime)),
      value.restaurantName,
      value.restaurantPriceRange as PriceRange,
      arrayFromJson(Cuisine, value.cuisines),
      value.imageSrc,
      value.numberOfSeats,
      value.isFollowing,
      value.isAttending,
      value.eventColor
    );
  }

  constructor(eventId: number, eventTitle: string, eventStartTime: Date,
      restaurantName: string, restaurantPriceRange: PriceRange,
      cuisines: Cuisine[], imageSrc: string, numberOfSeats: number,
      isFollowing: boolean, isAttending: boolean, eventColor: string) {
    this._eventId = eventId;
    this._eventTitle = eventTitle;
    this._eventStartTime = eventStartTime;
    this._restaurantName = restaurantName;
    this._restaurantPriceRange = restaurantPriceRange;
    this._cuisines = [...cuisines];
    this._imageSrc = imageSrc;
    this._numberOfSeats = numberOfSeats;
    this._isFollowing = isFollowing;
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

  /** Returns the number of seats available. */
  public get numberOfSeats(): number {
    return this._numberOfSeats;
  }

  /** Indicates whether the uset is following this event or not. */
  public get isFollowing(): boolean {
    return this._isFollowing;
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
      restaurantName: this._restaurantName,
      restaurantPriceRange: this._restaurantPriceRange,
      cuisines: arrayToJson(this._cuisines),
      imageSrc: this._imageSrc,
      numberOfSeats: this._numberOfSeats,
      isFollowing: this._isFollowing,
      isAttending: this._isAttending,
      eventColor: this._eventColor
    };
  }

  private _eventId: number;
  private _eventTitle: string;
  private _eventStartTime: Date;
  private _restaurantName: string;
  private _restaurantPriceRange: PriceRange;
  private _cuisines: Cuisine[];
  private _imageSrc: string;
  private _numberOfSeats: number;
  private _isFollowing: boolean;
  private _isAttending: boolean;
  private _eventColor: string;
}
