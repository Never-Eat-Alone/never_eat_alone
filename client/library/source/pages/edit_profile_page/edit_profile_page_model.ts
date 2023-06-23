import { CoverImage, Cuisine, Language, UserProfileImage
} from '../../definitions';

export abstract class EditProfilePageModel {
  public abstract load(): Promise<void>;

  public abstract isEmpty(): boolean;

  /** List of all languages user can select from. */
  public abstract get languageList(): Language[];

  /** List of all cuisines user can select from. */
  public abstract get cuisineList(): Cuisine[];

  /** Cover image of the user profile page. */
  public abstract get coverImage(): CoverImage;

  /** List of cover images user can select from such as template images. */
  public abstract get coverImageList(): CoverImage[];
  public abstract get profileImage(): UserProfileImage;
  public abstract get selectedLocation(): string;
  public abstract get isUpcomingEventsPrivate(): boolean;
  public abstract get isPastEventsPrivate(): boolean;
  public abstract get isLocationPrivate(): boolean;
  public abstract getSuggestedLocationList(value: string): Promise<string[]>;
  public abstract get isLanguagePrivate(): boolean;
  public abstract get biographyValue(): string;
  public abstract get isBiographyPrivate(): boolean;
  public abstract get selectedLanguageList(): Language[];
  public abstract get selectedCuisineList(): Cuisine[];
  public abstract get isCuisinePrivate(): boolean;
  public abstract get isFacebookPrivate(): boolean;
  public abstract get isTwitterPrivate(): boolean;
  public abstract get isInstagramPrivate(): boolean;
  public abstract get facebookLink(): string;
  public abstract get twitterLink(): string;
  public abstract get instagramLink(): string;
  public abstract uploadProfileImage(newImage: UserProfileImage): Promise<
    UserProfileImage>;
  public abstract saveCoverImage(newImage: CoverImage): Promise<CoverImage>;
  public abstract save(coverImage: CoverImage, profileImage: UserProfileImage,
    isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
    isLocationPrivate: boolean, selectedLocation: string, isLanguagePrivate:
    boolean, selectedLanguageList: Language[], isBiographyPrivate: boolean,
    biographyValue: string, isFacebookPrivate: boolean, facebookLink: string,
    isTwitterPrivate: boolean, twitterLink: string, isInstagramPrivate: boolean,
    instagramLink: string, isCuisinePrivate: boolean, selectedCuisineList:
    Cuisine[]): Promise<boolean>;
}
