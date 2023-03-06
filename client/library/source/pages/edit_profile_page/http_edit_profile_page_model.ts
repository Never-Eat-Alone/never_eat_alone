import { CityProvince, CoverImage, Cuisine, Language } from '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';

export class HttpEditProfilePageModel extends EditProfilePageModel {
  public async load(): Promise<void> {
    
  }

  public get locationList(): CityProvince[] {
    return this._model.locationList;
  }

  public get languageList(): Language[] {
    return this._model.languageList;
  }

  public get cuisineList(): Cuisine[] {
    return this._model.cuisineList;
  }

  public get coverImage(): CoverImage {
    return this._model.coverImage;
  }

  public get coverImageList(): CoverImage[] {
    return this._model.coverImageList;
  }

  public get profileImageSrc(): string {
    return this._model.profileImageSrc;
  }

  public get displayName(): string {
    return this._model.displayName;
  }

  public get userName(): string {
    return this._model.userName;
  }

  public get selectedLocation(): CityProvince {
    return this._model.selectedLocation;
  }

  public get profileUserId(): number {
    return this._model.profileUserId;
  }

  public get isUpcomingEventsPrivate(): boolean {
    return this._model.isUpcomingEventsPrivate;
  }

  public get isPastEventsPrivate(): boolean {
    return this._model.isPastEventsPrivate;
  }

  public get isLocationPrivate(): boolean {
    return this._model.isLocationPrivate;
  }

  public async getSuggestedLocationList(value: string): Promise<
      CityProvince[]> {
    return ;
  }

  public get isLanguagePrivate(): boolean {
    return this._model.isLanguagePrivate;
  }

  public async getSuggestedLanguageList(value: string): Promise<Language[]> {
    return;
  }

  public async getSuggestedCuisineList(value: string): Promise<Cuisine[]> {
    return;
  }

  public get biographyValue(): string {
    return this._model.biographyValue;
  }

  public get isBiographyPrivate(): boolean {
    return this._model.isBiographyPrivate;
  }

  public get selectedLanguageList(): Language[] {
    return this._model.selectedLanguageList;
  }

  public get selectedCuisineList(): Cuisine[] {
    return this._model.selectedCuisineList;
  }

  public get isCuisinePrivate(): boolean {
    return this._model.isCuisinePrivate;
  }

  public get isFacebookPrivate(): boolean {
    return this._model.isFacebookPrivate;
  }

  public get isTwitterPrivate(): boolean {
    return this._model.isTwitterPrivate;
  }

  public get isInstagramPrivate(): boolean {
    return this._model.isInstagramPrivate;
  }

  public get facebookLink(): string {
    return this._model.facebookLink;
  }

  public get twitterLink(): string {
    return this._model.twitterLink;
  }

  public get instagramLink(): string {
    return this._model.instagramLink;
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

  private _model: EditProfilePageModel;
}
