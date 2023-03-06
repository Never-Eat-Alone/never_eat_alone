import { CityProvince, CoverImage, Cuisine, Language } from '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';

export class LocalEditProfilePageModel extends EditProfilePageModel {
  constructor(locationList: CityProvince[], languageList: Language[],
      cuisineList: Cuisine[], coverImage: CoverImage,
      coverImageList: CoverImage[], profileImageSrc: string,
      displayName: string, userName: string, selectedLocation: CityProvince,
      profileUserId: number, isUpcomingEventsPrivate: boolean,
      isPastEventsPrivate: boolean, isLocationPrivate: boolean,
      isLanguagePrivate: boolean, biographyValue: string,
      isBiographyPrivate: boolean, selectedLanguageList: Language[],
      selectedCuisineList: Cuisine[], isCuisinePrivate: boolean,
      isFacebookPrivate: boolean, isTwitterPrivate: boolean,
      isInstagramPrivate: boolean, facebookLink: string, twitterLink: string,
      instagramLink: string) {
    super();
    this._locationList = locationList;
    this._languageList = languageList;
    this._cuisineList= cuisineList;
    this._coverImage = coverImage;
    this._coverImageList = coverImageList;
    this._profileImageSrc = profileImageSrc;
    this._displayName = displayName;
    this._userName = userName;
    this._selectedLocation = selectedLocation;
    this._profileUserId = profileUserId;
    this._isUpcomingEventsPrivate = isUpcomingEventsPrivate;
    this._isPastEventsPrivate = isPastEventsPrivate;
    this._isLocationPrivate = isLocationPrivate;
    this._isLanguagePrivate = isLanguagePrivate;
    this._biographyValue = biographyValue;
    this._isBiographyPrivate = isBiographyPrivate;
    this._selectedLanguageList = selectedLanguageList;
    this._selectedCuisineList = selectedCuisineList;
    this._isCuisinePrivate = isCuisinePrivate;
    this._isFacebookPrivate = isFacebookPrivate;
    this._isTwitterPrivate = isTwitterPrivate;
    this._isInstagramPrivate = isInstagramPrivate;
    this._facebookLink = facebookLink;
    this. _twitterLink = twitterLink;
    this._instagramLink = instagramLink;
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

  public get coverImageList(): CoverImage[] {
    return this._coverImageList;
  }

  public get profileImageSrc(): string {
    return this._profileImageSrc;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public get userName(): string {
    return this._userName;
  }

  public get selectedLocation(): CityProvince {
    return this._selectedLocation;
  }

  public get profileUserId(): number {
    return this._profileUserId;
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

  public async getSuggestedLocationList(value: string): Promise<
      CityProvince[]> {
    return;
  }

  public get isLanguagePrivate(): boolean {
    return this._isLanguagePrivate;
  }

  public async getSuggestedLanguageList(value: string): Promise<Language[]> {
    return;
  }

  public async getSuggestedCuisineList(value: string): Promise<Cuisine[]> {
    return;
  }

  public get biographyValue(): string {
    return this._biographyValue;
  }

  public get isBiographyPrivate(): boolean {
    return this._isBiographyPrivate;
  }

  public get selectedLanguageList(): Language[] {
    return this._selectedLanguageList;
  }

  public get selectedCuisineList(): Cuisine[] {
    return this._selectedCuisineList;
  }

  public get isCuisinePrivate(): boolean {
    return this._isCuisinePrivate;
  }

  public get isFacebookPrivate(): boolean {
    return this._isFacebookPrivate;
  }

  public get isTwitterPrivate(): boolean {
    return this._isTwitterPrivate;
  }

  public get isInstagramPrivate(): boolean {
    return this._isInstagramPrivate;
  }

  public get facebookLink(): string {
    return this._facebookLink;
  }

  public get twitterLink(): string {
    return this._twitterLink;
  }

  public get instagramLink(): string {
    return this._instagramLink;
  }

  public async uploadProfileImage(): Promise<void> {
    return;
  }

  public async saveCoverImage(newImage: CoverImage): Promise<void> {
    return;
  }

  public async save(coverImage: CoverImage, profileImageSrc: string,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: Language[], selectedCuisineList: Cuisine[],
      isCuisinePrivate: boolean, isFacebookPrivate: boolean,
      isTwitterPrivate: boolean, isInstagramPrivate: boolean,
      facebookLink: string, twitterLink: string, instagramLink: string
      ): Promise<void> {
    return;
  }

  private _locationList: CityProvince[];
  private _languageList: Language[];
  private _cuisineList: Cuisine[];
  private _coverImage: CoverImage;
  private _coverImageList: CoverImage[];
  private _profileImageSrc: string;
  private _displayName: string;
  private _userName: string;
  private _selectedLocation: CityProvince;
  private _profileUserId: number;
  private _isUpcomingEventsPrivate: boolean;
  private _isPastEventsPrivate: boolean;
  private _isLocationPrivate: boolean;
  private _isLanguagePrivate: boolean;
  private _biographyValue: string;
  private _isBiographyPrivate: boolean;
  private _selectedLanguageList: Language[];
  private _selectedCuisineList: Cuisine[];
  private _isCuisinePrivate: boolean;
  private _isFacebookPrivate: boolean;
  private _isTwitterPrivate: boolean;
  private _isInstagramPrivate: boolean;
  private _facebookLink: string;
  private _twitterLink: string;
  private _instagramLink: string;
}
