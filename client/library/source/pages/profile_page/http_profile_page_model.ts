import { arrayFromJson, CityProvince, CoverImage, Cuisine, EventCardSummary,
  Language } from '../../definitions';
import { LocalProfilePageModel } from './local_profile_page_model';
import { ProfilePageModel } from './profile_page_model';

export class HttpProfilePageModel extends ProfilePageModel {
  constructor(profileId: number) {
    super();
    this._profileId = profileId;
  }

  /** Loads the data displayed on the profile page. Must be called before other 
   * methods.
   */
  public async load(): Promise<void> {
    const response = await fetch(`/api/profile_page/${this._profileId}`);
    if (response.status !== 200) {
      return;
    }
    const responseObject = await response.json();
    const coverImage = responseObject.coverImage;
    const profileImageSrc = responseObject.profileImageSrc;
    const name = responseObject.name;
    const userName = responseObject.userName;
    const createdAt = responseObject.createdAt;
    const biography = responseObject.biography;
    const location = responseObject.location;
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const facebookLink = responseObject.facebookLink;
    const twitterLink = responseObject.twitterLink;
    const instagramLink = responseObject.instagramLink;
    const favoriteCuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.favoriteCuisineList);
    const upcomingEventList: EventCardSummary[] = arrayFromJson(
      EventCardSummary, responseObject.upcomingEventList);
    const pastEventList: EventCardSummary[] = arrayFromJson(EventCardSummary,
      responseObject.pastEventList);
    this._model = new LocalProfilePageModel(this._profileId, coverImage,
      profileImageSrc, name, userName, createdAt, biography, location,
      languageList, facebookLink, twitterLink, instagramLink,
      favoriteCuisineList, upcomingEventList, pastEventList);
    this._model.load();
  }

  public get profileId(): number {
    return this._model.profileId;
  }

  public get coverImage(): CoverImage {
    return this._model.coverImage;
  }

  public get profileImageSrc(): string {
    return this._model.profileImageSrc;
  }

  public get name(): string {
    return this._model.name;
  }

  public get userName(): string {
    return this._model.userName;
  }

  public get createdAt(): Date {
    return this._model.createdAt;
  }

  public get biography(): string {
    return this._model.biography;
  }

  public get location(): CityProvince {
    return this._model.location;
  }

  public get languageList(): Language[] {
    return this._model.languageList;
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

  public get favoriteCuisineList(): Cuisine[] {
    return this._model.favoriteCuisineList;
  }

  public get upcomingEventList(): EventCardSummary[] {
    return this._model.upcomingEventList;
  }

  public get pastEventList(): EventCardSummary[] {
    return this._model.pastEventList;
  }

  private _model: ProfilePageModel;
  private _profileId: number;
}