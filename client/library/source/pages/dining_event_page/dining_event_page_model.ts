import { Attendee, DressCode, Location, Restaurant, Seating, User } from
  '../../definitions';

/** Base class for the model used by the DiningEventPage. */
export abstract class DiningEventPageModel {
  /**
   * Loads the data to display on the DiningEventPage.
   * Must be called before calling any other method of this class.
   */
  public abstract load(): Promise<void>;
  public abstract get eventId(): number;
  public abstract get eventColor(): string;
  public abstract get eventFee(): number;
  public abstract get coverImageSrc(): string;
  public abstract get title(): string;
  public abstract get restaurant(): Restaurant;
  public abstract get dressCode(): DressCode;
  public abstract get seating(): Seating;
  public abstract get location(): Location;
  public abstract get reservationName(): string;
  public abstract get startTime(): Date;
  public abstract get endTime(): Date;
  public abstract get attendeeList(): Attendee[];
  public abstract get totalCapacity(): number;
  public abstract get description(): string;
  public abstract get isGoing(): boolean;
  public abstract get isRSVPOpen(): boolean;
  public abstract joinEvent(account: User, profileImageSrc: string): Promise<
    boolean>;
  public abstract removeSeat(account: User): Promise<boolean>;
}
