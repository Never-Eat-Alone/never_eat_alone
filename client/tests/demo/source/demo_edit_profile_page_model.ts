import * as NeverEatAlone from 'never_eat_alone';

export class DemoEditProfilePageModel extends
    NeverEatAlone.EditProfilePageModel {
  constructor(coverImageSrc: string, profileImageSrc: string,
      displayName: string, userName: string, profileUserId: number,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: NeverEatAlone.Language[],
      selectedCuisineList: NeverEatAlone.Cuisine[], isCuisinePrivate: boolean,
      isFacebookPrivate: boolean, isTwitterPrivate: boolean,
      isInstagramPrivate: boolean, facebookLink: string, twitterLink: string,
      instagramLink: string, selectedLocation: NeverEatAlone.CityProvince,
      locationList: NeverEatAlone.CityProvince[], languageList:
      NeverEatAlone.Language[], cuisineList: NeverEatAlone.Cuisine[]) {
    super();
    this._coverImageSrc = coverImageSrc;
    this._profileImageSrc = profileImageSrc;
    this._displayName = displayName;
    this._userName = userName;
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

  public get coverImageSrc(): string {
    return this._coverImageSrc;
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

  public get selectedLocation(): NeverEatAlone.CityProvince {
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
      NeverEatAlone.CityProvince[]> {
    const temp: NeverEatAlone.CityProvince[] = [];
    const searchValue = value.toLowerCase();
    for (const location of this._locationList) {
      if (location.city.toLowerCase().indexOf(searchValue) !== -1 ||
          location.province.toLowerCase().indexOf(searchValue) !== -1 ||
          location.country.toLowerCase().indexOf(searchValue) !== -1) {
        temp.push(location);
      }
    }
    return temp;
  }

  public get isLanguagePrivate(): boolean {
    return this._isLanguagePrivate;
  }

  public async getSuggestedLanguageList(value: string): Promise<
      NeverEatAlone.Language[]> {
    return [];
  }

  public async getSuggestedCuisineList(value: string): Promise<
      NeverEatAlone.Cuisine[]> {
    return [];
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

  public async uploadProfileImage(): Promise<string> {
    return '';
  }

  public async uploadCoverImage(): Promise<string> {
    return '';
  }

  public async save(coverImageSrc: string, profileImageSrc: string,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: NeverEatAlone.Language[],
      selectedCuisineList: NeverEatAlone.Cuisine[], isCuisinePrivate: boolean,
      isFacebookPrivate: boolean, isTwitterPrivate: boolean,
      isInstagramPrivate: boolean, facebookLink: string, twitterLink: string,
      instagramLink: string): Promise<void> {
    this._coverImageSrc = coverImageSrc;
    this._profileImageSrc = profileImageSrc;
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
    return;
  }

  private _coverImageSrc: string;
  private _profileImageSrc: string;
  private _displayName: string;
  private _userName: string;
  private _profileUserId: number;
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
  private _selectedLocation: NeverEatAlone.CityProvince;
  private _locationList: NeverEatAlone.CityProvince[];
  private _languageList: NeverEatAlone.Language[];
  private _cuisineList: NeverEatAlone.Cuisine[];
}
