import * as NeverEatAlone from 'never_eat_alone';

export class DemoEditProfilePageModel extends
    NeverEatAlone.EditProfilePageModel {
  constructor(coverImage: NeverEatAlone.CoverImage, coverImageList:
      NeverEatAlone.CoverImage[], profileImage: NeverEatAlone.UserProfileImage,
      displayName: string, userName: string, profileId: number,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: NeverEatAlone.Language[],
      selectedCuisineList: NeverEatAlone.Cuisine[], isCuisinePrivate: boolean,
      isFacebookPrivate: boolean, isTwitterPrivate: boolean,
      isInstagramPrivate: boolean, facebookLink: string, twitterLink: string,
      instagramLink: string, selectedLocation: string, locationList: string[],
      languageList: NeverEatAlone.Language[], cuisineList:
      NeverEatAlone.Cuisine[]) {
    super();
    this._coverImage = coverImage;
    this._coverImageList = coverImageList;
    this._profileImage = profileImage;
    this._displayName = displayName;
    this._userName = userName;
    this._profileId = profileId;
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
    this._twitterLink = twitterLink;
    this._instagramLink = instagramLink;
    this._selectedLocation = selectedLocation;
    this._locationList = locationList;
    this._languageList = languageList;
    this._cuisineList = cuisineList;
  }

  public async load(): Promise<void> {
    return;
  }

  public get locationList(): string[] {
    return this._locationList;
  }

  public get languageList(): NeverEatAlone.Language[] {
    return this._languageList;
  }

  public get cuisineList(): NeverEatAlone.Cuisine[] {
    return this._cuisineList;
  }

  public get coverImage(): NeverEatAlone.CoverImage {
    return this._coverImage;
  }

  public get coverImageList(): NeverEatAlone.CoverImage[] {
    return this._coverImageList;
  }

  public get profileImage(): NeverEatAlone.UserProfileImage {
    return this._profileImage;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public get userName(): string {
    return this._userName;
  }

  public get selectedLocation(): string {
    return this._selectedLocation;
  }

  public get profileId(): number {
    return this._profileId;
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

  public async getSuggestedLocationList(value: string): Promise<string[]> {
    const searchValue = value.toLowerCase();
    return this._locationList.filter(location =>
      location.toLowerCase().includes(searchValue));
  }

  public get isLanguagePrivate(): boolean {
    return this._isLanguagePrivate;
  }

  public async getSuggestedLanguageList(value: string): Promise<
      NeverEatAlone.Language[]> {
    return this._languageList.filter((language) =>
      language.name.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
  }

  public async getSuggestedCuisineList(value: string): Promise<
      NeverEatAlone.Cuisine[]> {
    return this._cuisineList.filter((cuisine) =>
      cuisine.label.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
  }

  public get biographyValue(): string {
    return this._biographyValue;
  }

  public get isBiographyPrivate(): boolean {
    return this._isBiographyPrivate;
  }

  public get selectedLanguageList(): NeverEatAlone.Language[] {
    return this._selectedLanguageList;
  }

  public get selectedCuisineList(): NeverEatAlone.Cuisine[] {
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

  public async uploadProfileImage(newImage: NeverEatAlone.UserProfileImage
      ): Promise<NeverEatAlone.UserProfileImage> {
    this._profileImage = newImage;
    return newImage;
  }

  public async saveCoverImage(newImage: NeverEatAlone.CoverImage): Promise<
      NeverEatAlone.CoverImage> {
    this._coverImage = newImage;
    return newImage;
  }

  public async save(coverImage: NeverEatAlone.CoverImage,
      profileImage: NeverEatAlone.UserProfileImage, isUpcomingEventsPrivate:
      boolean, isPastEventsPrivate: boolean, isLocationPrivate: boolean,
      isLanguagePrivate: boolean, biographyValue: string,
      isBiographyPrivate: boolean, selectedLanguageList:
      NeverEatAlone.Language[], selectedCuisineList: NeverEatAlone.Cuisine[],
      isCuisinePrivate: boolean, isFacebookPrivate: boolean, isTwitterPrivate:
      boolean, isInstagramPrivate: boolean, facebookLink: string, twitterLink:
      string, instagramLink: string): Promise<boolean> {
    this._coverImage = coverImage;
    this._profileImage = profileImage;
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
    this._isFacebookPrivate = isFacebookPrivate;
    this._facebookLink = facebookLink;
    this._twitterLink = twitterLink;
    this._instagramLink = instagramLink;
    return true;
  }

  private _coverImage: NeverEatAlone.CoverImage;
  private _coverImageList: NeverEatAlone.CoverImage[];
  private _profileImage: NeverEatAlone.UserProfileImage;
  private _displayName: string;
  private _userName: string;
  private _profileId: number;
  private _isUpcomingEventsPrivate: boolean;
  private _isPastEventsPrivate: boolean;
  private _isLocationPrivate: boolean;
  private _isLanguagePrivate: boolean;
  private _biographyValue: string;
  private _isBiographyPrivate: boolean;
  private _selectedLanguageList: NeverEatAlone.Language[];
  private _selectedCuisineList : NeverEatAlone.Cuisine[];
  private _isCuisinePrivate: boolean;
  private _isFacebookPrivate: boolean;
  private _isTwitterPrivate: boolean;
  private _isInstagramPrivate: boolean;
  private _facebookLink: string;
  private _twitterLink: string;
  private _instagramLink: string;
  private _selectedLocation: string;
  private _locationList: string[];
  private _languageList: NeverEatAlone.Language[];
  private _cuisineList: NeverEatAlone.Cuisine[];
}
