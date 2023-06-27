import { arrayFromJson, Attendee, DressCode, Location, Restaurant, Seating, User
  } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';
import { EmptyDiningEventPageModel } from './empty_dining_event_page_model';
import { LocalDiningEventPageModel } from './local_dining_event_page_model';

export class HttpDiningEventPageModel extends DiningEventPageModel {
  constructor(eventId: number) {
    super();
    this._isLoaded = false;
    this._eventId = eventId;
    this._model = new EmptyDiningEventPageModel();
  }

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(`/api/dining_events/${this._eventId}`);
    if (response.status === 200) {
      const responseObject = await response.json();
      const eventId = responseObject.eventId;
      const eventColor = responseObject.eventColor;
      const eventFee = responseObject.eventFee;
      const coverImageSrc = responseObject.coverImageSrc;
      const title = responseObject.title;
      const restaurant = Restaurant.fromJson(responseObject.restaurant);
      const dressCode = responseObject.dressCode as DressCode;
      const seating = responseObject.seating as Seating;
      const location = Location.fromJson(responseObject.location);
      const reservationName = responseObject.reservationName;
      const startTime = new Date(Date.parse(responseObject.startTime));
      const endTime = new Date(Date.parse(responseObject.endTime));
      const attendeeList: Attendee[] = arrayFromJson(Attendee,
        responseObject.attendeeList);
      const totalCapacity = responseObject.totalCapacity;
      const description = responseObject.description;
      const isGoing = responseObject.isGoing;
      const isRSVPOpen = responseObject.isRSVPOpen;
      this._model = new LocalDiningEventPageModel(eventId, eventColor, eventFee,
        coverImageSrc, title, restaurant, dressCode, seating, location,
        reservationName, startTime, endTime, attendeeList, totalCapacity,
        description, isGoing, isRSVPOpen);
    }
    await this._model.load();
    this._isLoaded = true;
  }

  public get eventId(): number {
    return this._model.eventId;
  }

  public get eventColor(): string {
    return this._model.eventColor;
  }

  public get eventFee(): number {
    return this._model.eventFee;
  }

  public get coverImageSrc(): string {
    return this._model.coverImageSrc;
  }

  public get title(): string {
    return this._model.title;
  }

  public get restaurant(): Restaurant {
    return this._model.restaurant;
  }

  public get dressCode(): DressCode {
    return this._model.dressCode;
  }

  public get seating(): Seating {
    return this._model.seating;
  }

  public get location(): Location {
    return this._model.location;
  }

  public get reservationName(): string {
    return this._model.reservationName;
  }

  public get startTime(): Date {
    return this._model.startTime;
  }

  public get endTime(): Date {
    return this._model.endTime;
  }

  public get attendeeList(): Attendee[] {
    return this._model.attendeeList;
  }

  public get totalCapacity(): number {
    return this._model.totalCapacity;
  }

  public get description(): string {
    return this._model.description;
  }

  public get isGoing(): boolean {
    return this._model.isGoing;
  }

  public get isRSVPOpen(): boolean {
    return this._model.isRSVPOpen;
  }

  public async joinEvent(account: User, profileImageSrc: string): Promise<
      boolean> {
    const response = await fetch('/api/join_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'account': account.toJson(),
        'profileImageSrc': profileImageSrc
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async removeSeat(account: User): Promise<boolean> {
    const response = await fetch('/api/remove_seat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'account': account.toJson()
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  private _model: DiningEventPageModel;
  private _eventId: number;
  private _isLoaded: boolean;
}
