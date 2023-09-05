import { arrayFromJson, arrayToJson, CoverImage, Cuisine, Language,
  UserProfileImage } from '../definitions';

export class ProfilePageData {
  public static fromJson(value: any): ProfilePageData {
    return new ProfilePageData(
      CoverImage.fromJson(value.coverImage),
      UserProfileImage.fromJson(value.profileImage),
      value.isUpcomingEventsPrivate,
      value.isPastEventsPrivate,
      value.isLocationPrivate,
      value.selectedLocation,
      value.isLanguagePrivate,
      arrayFromJson(Language, value.selectedLanguageList),
      value.isBiographyPrivate,
      value.biographyValue,
      value.isFacebookPrivate,
      value.facebookLink,
      value.isTwitterPrivate,
      value.twitterLink,
      value.isInstagramPrivate,
      value.instagramLink,
      value.isCuisinePrivate,
      arrayFromJson(Cuisine, value.selectedCuisineList)
    );
  }

  constructor(coverImage: CoverImage, profileImage: UserProfileImage,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, selectedLocation: string, isLanguagePrivate:
      boolean, selectedLanguageList: Language[], isBiographyPrivate: boolean,
      biographyValue: string, isFacebookPrivate: boolean, facebookLink: string,
      isTwitterPrivate: boolean, twitterLink: string, isInstagramPrivate:
      boolean, instagramLink: string, isCuisinePrivate: boolean,
      selectedCuisineList: Cuisine[]) {
    this._coverImage = coverImage;
    this._profileImage = profileImage;
    this._isUpcomingEventsPrivate = isUpcomingEventsPrivate;
    this._isPastEventsPrivate = isPastEventsPrivate;
    this._isLocationPrivate = isLocationPrivate;
    this._selectedLocation = selectedLocation;
    this._isLanguagePrivate = isLanguagePrivate;
    this._selectedLanguageList = selectedLanguageList;
    this._isBiographyPrivate = isBiographyPrivate;
    this._biographyValue = biographyValue;
    this._isFacebookPrivate = isFacebookPrivate;
    this._facebookLink = facebookLink;
    this._isTwitterPrivate = isTwitterPrivate;
    this._instagramLink = instagramLink;
    this._twitterLink = twitterLink;
    this._isInstagramPrivate = isInstagramPrivate;
    this._isCuisinePrivate = isCuisinePrivate;
    this._selectedCuisineList = selectedCuisineList;
  }

  public get coverImage(): CoverImage {
    return this._coverImage;
  }

  public get profileImage(): UserProfileImage {
    return this._profileImage;
  }

  public get isUpcomingEventsPrivate(): boolean {
    return this._isUpcomingEventsPrivate;
  }

  public get isPastEventsPrivate(): boolean {
    return this._isPastEventsPrivate;
  }

  public get isLocationPrivate(): boolean {
    return this._isLocationPrivate;
  }

  public get selectedLocation(): string {
    return this._selectedLocation;
  }

  public get isBiographyPrivate(): boolean {
    return this._isBiographyPrivate;
  }

  public get biographyValue(): string {
    return this._biographyValue;
  }

  public get isFacebookPrivate(): boolean {
    return this._isFacebookPrivate;
  }

  public get facebookLink(): string {
    return this._facebookLink;
  }

  public get isTwitterPrivate(): boolean {
    return this._isTwitterPrivate;
  }

  public get twitterLink(): string {
    return this._twitterLink;
  }

  public get isInstagramPrivate(): boolean {
    return this._isInstagramPrivate;
  }

  public get instagramLink(): string {
    return this._instagramLink;
  }

  public get isCuisinePrivate(): boolean {
    return this._isCuisinePrivate;
  }
  
  public get selectedCuisineList(): Cuisine[] {
    return this._selectedCuisineList;
  }

  public toJson(): any {
    return {
      coverImage: this._coverImage.toJson(),
      profileImage: this._profileImage.toJson(),
      isUpcomingEventsPrivate: this._isUpcomingEventsPrivate,
      isPastEventsPrivate: this._isPastEventsPrivate,
      isLocationPrivate: this._isLocationPrivate,
      selectedLocation: this._selectedLocation,
      isLanguagePrivate: this._isLanguagePrivate,
      selectedLanguageList: arrayToJson(this._selectedLanguageList),
      isBiographyPrivate: this._isBiographyPrivate,
      biographyValue: this._biographyValue,
      isFacebookPrivate: this._isFacebookPrivate,
      facebookLink: this._facebookLink,
      isTwitterPrivate: this._isTwitterPrivate,
      twitterLink: this._twitterLink,
      isInstagramPrivate: this._isInstagramPrivate,
      instagramLink: this._instagramLink,
      isCuisinePrivate: this._isCuisinePrivate,
      selectedCuisineList: arrayToJson(this._selectedCuisineList)
    };
  }

  private _coverImage: CoverImage;
  private _profileImage: UserProfileImage;
  private _isUpcomingEventsPrivate: boolean;
  private _isPastEventsPrivate: boolean;
  private _isLocationPrivate: boolean;
  private _selectedLocation: string;
  private _isLanguagePrivate: boolean;
  private _selectedLanguageList: Language[];
  private _isBiographyPrivate: boolean;
  private _biographyValue: string;
  private _isFacebookPrivate: boolean;
  private _facebookLink: string;
  private _isTwitterPrivate: boolean;
  private _twitterLink: string;
  private _isInstagramPrivate: boolean;
  private _instagramLink: string;
  private _isCuisinePrivate: boolean;
  private _selectedCuisineList: Cuisine[];
}
