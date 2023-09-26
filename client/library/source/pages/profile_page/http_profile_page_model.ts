import { arrayFromJson, CoverImage, Cuisine, EventCardSummary, Language,
  SocialAccountType, UserProfileSocialAccount } from '../../definitions';
import { EmptyProfilePageModel } from './empty_profile_page_model';
import { LocalProfilePageModel } from './local_profile_page_model';
import { ProfilePageModel } from './profile_page_model';

export class HttpProfilePageModel extends ProfilePageModel {
  constructor(profileId: number) {
    super();
    this._isLoaded = false;
    this._profileId = profileId;
    this._model = new EmptyProfilePageModel();
  }

  /** Loads the data displayed on the profile page. Must be called before other
   * methods.
   */
  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(`/api/profile_page/${this._profileId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const coverImage = CoverImage.fromJson(responseObject.coverImage);
    const profileImageSrc = responseObject.profileImageSrc;
    const name: string = responseObject.name;
    const userName: string = responseObject.userName;
    const createdAt = new Date(Date.parse(responseObject.createdAt));
    const biography: string = responseObject.biography;
    const address: string = responseObject.address;
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const socialAccounts: UserProfileSocialAccount[] = arrayFromJson(
      UserProfileSocialAccount, responseObject.socialAccounts);
    const facebookLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.FACEBOOK)?.link;
    const twitterLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.TWITTER)?.link;
    const instagramLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.INSTAGRAM)?.link;
    const favoriteCuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.favoriteCuisineList);
    const upcomingEventList: EventCardSummary[] = arrayFromJson(
      EventCardSummary, responseObject.upcomingEventList);
    const pastEventList: EventCardSummary[] = arrayFromJson(EventCardSummary,
      responseObject.pastEventList);
    this._model = new LocalProfilePageModel(this._profileId, coverImage,
      profileImageSrc, name, userName, createdAt, biography, address,
      languageList, facebookLink, twitterLink, instagramLink,
      favoriteCuisineList, upcomingEventList, pastEventList);
    await this._model.load();
    this._isLoaded = true;
  }

  public get profileId(): number {
    return this._profileId;
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

  public get address(): string {
    return this._model.address;
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

  public async updateUpcomingEventList(): Promise<void> {
    this._isLoaded = false;
    const response = await fetch(`/api/profile_page/${this._profileId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const coverImage = CoverImage.fromJson(responseObject.coverImage);
    const profileImageSrc = responseObject.profileImageSrc;
    const name: string = responseObject.name;
    const userName: string = responseObject.userName;
    const createdAt = new Date(Date.parse(responseObject.createdAt));
    const biography: string = responseObject.biography;
    const address: string = responseObject.address;
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const socialAccounts: UserProfileSocialAccount[] = arrayFromJson(
      UserProfileSocialAccount, responseObject.socialAccounts);
    const facebookLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.FACEBOOK)?.link;
    const twitterLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.TWITTER)?.link;
    const instagramLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.INSTAGRAM)?.link;
    const favoriteCuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.favoriteCuisineList);
    const newUpcomingEventList: EventCardSummary[] = arrayFromJson(
      EventCardSummary, responseObject.upcomingEventList);
    const pastEventList: EventCardSummary[] = arrayFromJson(EventCardSummary,
      responseObject.pastEventList);
    const newModel = new LocalProfilePageModel(this._profileId, coverImage,
      profileImageSrc, name, userName, createdAt, biography, address,
      languageList, facebookLink, twitterLink, instagramLink,
      favoriteCuisineList, newUpcomingEventList, pastEventList);
    this._model = newModel;
    await this._model.updateUpcomingEventList();
    this._isLoaded = true;
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private _isLoaded: boolean;
  private _profileId: number;
  private _model: ProfilePageModel;
}
