import { EventCardSummary, ProfilePageData } from '../../definitions';

export abstract class ProfilePageModel {
  /** Loads the data displayed on the profile page. Must be called before other 
   * methods.
   */
  public abstract load(): Promise<void>;
  public abstract get profilePageData(): ProfilePageData;
  public abstract get name(): string;
  public abstract get createdAt(): Date;
  public abstract get upcomingEventList(): EventCardSummary[];
  public abstract get pastEventList(): EventCardSummary[];
  public abstract update(): Promise<void>;
}
