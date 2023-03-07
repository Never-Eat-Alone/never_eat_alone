import { CityProvince, CoverImage, Cuisine, Language, UserProfileImage
} from '../../definitions';

export abstract class EditProfilePageModel {
  public abstract load(): Promise<void>;
  public abstract get locationList(): CityProvince[];
  public abstract get languageList(): Language[];
  public abstract get cuisineList(): Cuisine[];
  public abstract get coverImage(): CoverImage;
  public abstract get coverImageList(): CoverImage[];
  public abstract get profileImage(): UserProfileImage;
  public abstract get displayName(): string;
  public abstract get userName(): string;
  public abstract get selectedLocation(): CityProvince;
  public abstract get profileId(): number;
  public abstract get isUpcomingEventsPrivate(): boolean;
  public abstract get isPastEventsPrivate(): boolean;
  public abstract get isLocationPrivate(): boolean;
  public abstract getSuggestedLocationList(value: string): Promise<
    CityProvince[]>;
  public abstract get isLanguagePrivate(): boolean;
  public abstract getSuggestedLanguageList(value: string): Promise<Language[]>;
  public abstract getSuggestedCuisineList(value: string): Promise<Cuisine[]>;
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
    isLocationPrivate: boolean, isLanguagePrivate: boolean,
    biographyValue: string, isBiographyPrivate: boolean,
    selectedLanguageList: Language[], selectedCuisineList: Cuisine[],
    isCuisinePrivate: boolean, isFacebookPrivate: boolean,
    isTwitterPrivate: boolean, isInstagramPrivate: boolean,
    facebookLink: string, twitterLink: string, instagramLink: string): Promise<
    boolean>;
}
