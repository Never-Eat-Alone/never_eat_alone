import { CityProvince, CoverImage, Cuisine, EventCardSummary, Language
} from '../../definitions';

export abstract class ProfilePageModel {
  /** Loads the data displayed on the profile page. Must be called before other 
   * methods.
   */
  public abstract load(): Promise<void>;
  public abstract get profileId(): number;
  public abstract get coverImage(): CoverImage;
  public abstract get profileImageSrc(): string;
  public abstract get name(): string;
  public abstract get userName(): string;
  public abstract get createdAt(): Date;
  public abstract get biography(): string;
  public abstract get location(): CityProvince;
  public abstract get languageList(): Language[];
  public abstract get facebookLink(): string;
  public abstract get twitterLink(): string;
  public abstract get instagramLink(): string;
  public abstract get favoriteCuisineList(): Cuisine[];
  public abstract get upcomingEventList(): EventCardSummary[];
  public abstract get pastEventList(): EventCardSummary[];
}
