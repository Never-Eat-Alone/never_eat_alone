import { Attendee, DressCode, Location, Restaurant, Seating
} from '../../definitions';

/** Base class for the model used by the DiningEventPage. */
export abstract class DiningEventPageModel {
  /** Loads the data to display on the DiningEventPage
   * must be called before calling any other method of this class.
   */
  public abstract load(): Promise<void>;
  public abstract getEventColor(): string;
  public abstract getEventFee(): number;
  public abstract getCoverImageSrc(): string;
  public abstract getTitle(): string;
  public abstract getRestaurant(): Restaurant;
  public abstract getDressCode(): DressCode;
  public abstract getSeating(): Seating;
  public abstract getLocation(): Location;
  public abstract getReservationName(): string;
  public abstract getStartTime(): Date;
  public abstract getEndTime(): Date;
  public abstract getAttendeeList(): Attendee[];
  public abstract getTotalCapacity(): number;
  public abstract getDescription(): string;
  public abstract getIsGoing(): boolean;
  public abstract getIsLoggedIn(): boolean;
  public abstract getIsRSVPOpen(): boolean;
}
