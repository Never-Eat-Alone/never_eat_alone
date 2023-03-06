import { CityProvince, CoverImage, Cuisine, Language } from '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';

export class LocalEditProfilePageModel extends EditProfilePageModel {
  constructor() {
    super();
  }
  public async load(): Promise<void> {}

  public get locationList(): CityProvince[] {
    return this._locationList;
  }

  public get languageList(): Language[] {
    return this._languageList;
  }

  public get cuisineList(): Cuisine[] {
    return this._cuisineList;
  }

  public get coverImage(): CoverImage {
    return this._coverImage;
  }

  public get coverImageList(): CoverImage[];
  public get profileImageSrc(): string;
  public get displayName(): string;
  public get userName(): string;
  public get selectedLocation(): CityProvince;
  public get profileUserId(): number;
  public get isUpcomingEventsPrivate(): boolean;
  public get isPastEventsPrivate(): boolean;
  public get isLocationPrivate(): boolean;
  public getSuggestedLocationList(value: string): Promise<
    CityProvince[]>;
  public get isLanguagePrivate(): boolean;
  public getSuggestedLanguageList(value: string): Promise<Language[]>;
  public getSuggestedCuisineList(value: string): Promise<Cuisine[]>;
  public get biographyValue(): string;
  public get isBiographyPrivate(): boolean;
  public get selectedLanguageList(): Language[];
  public get selectedCuisineList(): Cuisine[];
  public get isCuisinePrivate(): boolean;
  public get isFacebookPrivate(): boolean;
  public get isTwitterPrivate(): boolean;
  public get isInstagramPrivate(): boolean;
  public get facebookLink(): string;
  public get twitterLink(): string;
  public get instagramLink(): string;
  public uploadProfileImage(): Promise<void>;
  public saveCoverImage(newImage: CoverImage): Promise<void>;
  public async save(coverImage: CoverImage, profileImageSrc: string,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: Language[], selectedCuisineList: Cuisine[],
      isCuisinePrivate: boolean, isFacebookPrivate: boolean,
      isTwitterPrivate: boolean, isInstagramPrivate: boolean,
      facebookLink: string, twitterLink: string, instagramLink: string): Promise<
      void> {

  }
}
