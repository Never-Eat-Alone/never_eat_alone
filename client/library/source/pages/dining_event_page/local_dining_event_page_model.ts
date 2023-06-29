import { Attendee, AttendeeStatus, DiningEvent } from '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/** Implements the DiningEventPage in memory. */
export class LocalDiningEventPageModel extends DiningEventPageModel {
  constructor(diningEvent: DiningEvent, isGoing: boolean) {
    super();
    this._isLoaded = false;
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

  public async joinEvent(userId: number, displayName: string, profileImageSrc:
      string): Promise<boolean> {
    this.ensureIsLoaded();
    const newAttendee = new Attendee(userId, this._diningEvent.id, displayName,
      0, AttendeeStatus.GOING, profileImageSrc, new Date(Date.now()));
    this._diningEvent.attendeeList.push(newAttendee);
    return true;
  }

  public async removeSeat(userId: number): Promise<boolean> {
    this.ensureIsLoaded();
    this._diningEvent.attendeeList.map(a => {
      if (a.userId === userId) {
        const attendeeNotGoing = new Attendee(a.userId, a.eventId, a.name, 0,
          AttendeeStatus.NOT_GOING, a.profileImageSrc, new Date(Date.now()));
        return attendeeNotGoing;
      }
      return a;
    });
    return true;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: DiningEvent;
  private _isGoing: boolean;
}
