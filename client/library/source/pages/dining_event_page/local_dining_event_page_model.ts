import { Attendee, AttendeeStatus, DiningEvent, User } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(account: User, profileImageSrc: string, diningEvent: DiningEvent,
      isGoing: boolean) {
    super();
    this._isLoaded = false;
    this._account = account;
    this._profileImageSrc = profileImageSrc;
    this._diningEvent = diningEvent;
    this._isGoing = isGoing;
  }

  /**
   * Loads the data to display on the DiningEventPage. Must be called before
   * calling any other method of this class.
   */
  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public get isGoing(): boolean {
    this.ensureIsLoaded();
    return this._isGoing;
  }

  public async joinEvent(): Promise<boolean> {
    this.ensureIsLoaded();
    const newAttendee = new Attendee(this._account.id, this._diningEvent.id,
      this._account.name, 0, AttendeeStatus.GOING, this._profileImageSrc,
      new Date(Date.now()));
    this._diningEvent.attendeeList.push(newAttendee);
    return true;
  }

  public async removeSeat(): Promise<boolean> {
    this.ensureIsLoaded();
    const newAttendeeList = this._diningEvent.attendeeList.map(a => {
      if (a.userId === this._account.id) {
        const attendeeNotGoing = new Attendee(this._account.id,
          this._diningEvent.id, this._account.name, 0, AttendeeStatus.NOT_GOING,
          this._profileImageSrc, new Date(Date.now()));
        return attendeeNotGoing;
      }
      return a;
    });
    this._diningEvent = new DiningEvent(this._diningEvent.id,
      this._diningEvent.eventColor, this._diningEvent.eventFee,
      this._diningEvent.coverImageSrc, this._diningEvent.title,
      this._diningEvent.restaurant, this._diningEvent.dressCode,
      this._diningEvent.seating, this._diningEvent.location,
      this._diningEvent.reservationName, this._diningEvent.startAt,
      this._diningEvent.endAt, newAttendeeList, this._diningEvent.totalCapacity,
      this._diningEvent.description, this._diningEvent.rsvpOpenAt,
      this._diningEvent.rsvpCloseAt, this._diningEvent.status,
      this._diningEvent.type, this._diningEvent.createdAt,
      this._diningEvent.updatedAt);
    return true;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _account: User;
  private _profileImageSrc: string;
  private _diningEvent: DiningEvent;
  private _isGoing: boolean;
}
