import * as NeverEatAlone from 'never_eat_alone';

export class DemoEditProfilePageModel extends
    NeverEatAlone.EditProfilePageModel {
  constructor(languageList: NeverEatAlone.Language[], cuisineList:
      NeverEatAlone.Cuisine[], coverImage: NeverEatAlone.CoverImage,
      coverImageList: NeverEatAlone.CoverImage[], profileImage:
      NeverEatAlone.UserProfileImage, selectedLocation: string,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: NeverEatAlone.Language[],
      selectedCuisineList: NeverEatAlone.Cuisine[], isCuisinePrivate: boolean,
      isFacebookPrivate: boolean, isTwitterPrivate: boolean,
      isInstagramPrivate: boolean, facebookLink: string, twitterLink: string,
      instagramLink: string) {
    super();
    this._isLoaded = false;
    this._coverImage = coverImage;
    this._coverImageList = coverImageList;
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
    this._facebookLink = facebookLink;
    this._twitterLink = twitterLink;
    this._instagramLink = instagramLink;
    this._selectedLocation = selectedLocation;
    this._languageList = languageList;
    this._cuisineList = cuisineList;
    this._suggestedLocationList = new Map();
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get languageList(): NeverEatAlone.Language[] {
    this.ensureIsLoaded();
    return this._languageList;
  }

  public get cuisineList(): NeverEatAlone.Cuisine[] {
    this.ensureIsLoaded();
    return this._cuisineList;
  }

  public get coverImage(): NeverEatAlone.CoverImage {
    this.ensureIsLoaded();
    return this._coverImage;
  }

  public get coverImageList(): NeverEatAlone.CoverImage[] {
    this.ensureIsLoaded();
    return this._coverImageList;
  }

  public get profileImage(): NeverEatAlone.UserProfileImage {
    this.ensureIsLoaded();
    return this._profileImage;
  }

  public get selectedLocation(): string {
    this.ensureIsLoaded();
    return this._selectedLocation;
  }

  public get isUpcomingEventsPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isUpcomingEventsPrivate;
  }

  public get isPastEventsPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isPastEventsPrivate;
  }

  public get isLocationPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isLocationPrivate;
  }

  public addSuggestedLocationList(value: string, locationList: string[]
      ): void {
    this._suggestedLocationList.set(value, locationList);
  }

  public async getSuggestedLocationList(value: string): Promise<
      string[]> {
    return this._suggestedLocationList.get(value);
  }

  public get isLanguagePrivate(): boolean {
    this.ensureIsLoaded();
    return this._isLanguagePrivate;
  }

  public get biographyValue(): string {
    this.ensureIsLoaded();
    return this._biographyValue;
  }

  public get isBiographyPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isBiographyPrivate;
  }

  public get selectedLanguageList(): NeverEatAlone.Language[] {
    this.ensureIsLoaded();
    return this._selectedLanguageList;
  }

  public get selectedCuisineList(): NeverEatAlone.Cuisine[] {
    this.ensureIsLoaded();
    return this._selectedCuisineList;
  }

  public get isCuisinePrivate(): boolean {
    this.ensureIsLoaded();
    return this._isCuisinePrivate;
  }

  public get isFacebookPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isFacebookPrivate;
  }

  public get isTwitterPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isTwitterPrivate;
  }

  public get isInstagramPrivate(): boolean {
    this.ensureIsLoaded();
    return this._isInstagramPrivate;
  }

  public get facebookLink(): string {
    this.ensureIsLoaded();
    return this._facebookLink;
  }

  public get twitterLink(): string {
    this.ensureIsLoaded();
    return this._twitterLink;
  }

  public get instagramLink(): string {
    this.ensureIsLoaded();
    return this._instagramLink;
  }

  public async uploadProfileImage(newImage: NeverEatAlone.UserProfileImage
      ): Promise<NeverEatAlone.UserProfileImage> {
    this._profileImage = newImage;
    return newImage;
  }

  public async saveCoverImage(newImage: NeverEatAlone.CoverImage): Promise<
      void> {
    this._coverImageList.push(newImage);
    this._coverImage = newImage;
  }

  public async save(coverImage: NeverEatAlone.CoverImage,
      profileImage: NeverEatAlone.UserProfileImage, isUpcomingEventsPrivate:
      boolean, isPastEventsPrivate: boolean, isLocationPrivate: boolean,
      selectedLocation: string, isLanguagePrivate: boolean,
      selectedLanguageList: NeverEatAlone.Language[], isBiographyPrivate:
      boolean, biographyValue: string, isFacebookPrivate: boolean,
      facebookLink: string, isTwitterPrivate: boolean, twitterLink: string,
      isInstagramPrivate: boolean, instagramLink: string, isCuisinePrivate:
      boolean, selectedCuisineList: NeverEatAlone.Cuisine[]): Promise<void> {
    this._coverImage = coverImage;
    this._profileImage = profileImage;
    this._isUpcomingEventsPrivate = isUpcomingEventsPrivate;
    this._isPastEventsPrivate = isPastEventsPrivate;
    this._isLocationPrivate = isLocationPrivate;
    this._selectedLocation = selectedLocation;
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
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('EditProfilePageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _coverImage: NeverEatAlone.CoverImage;
  private _coverImageList: NeverEatAlone.CoverImage[];
  private _profileImage: NeverEatAlone.UserProfileImage;
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
  private _languageList: NeverEatAlone.Language[];
  private _cuisineList: NeverEatAlone.Cuisine[];
  private _suggestedLocationList: Map<string, string[]>;
}
