import { arrayFromJson, CoverImage, Cuisine, EventCardSummary, Language,
  ProfilePageData, SocialAccountType, UserProfileImage, UserProfileSocialAccount
  } from '../../definitions';
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
    const profileImage = UserProfileImage.fromJson(responseObject.profileImage);
    const name: string = responseObject.name;
    const userName: string = responseObject.userName;
    const createdAt = new Date(Date.parse(responseObject.createdAt));
    const biography: string = responseObject.biography;
    const isBiographyPrivate = responseObject.isBiographyPrivate;
    const address: string = responseObject.address;
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const isUpcomingEventsPrivate = responseObject.isUpcomingEventsPrivate;
    const isPastEventsPrivate = responseObject.isPastEventsPrivate;
    const isLocationPrivate = responseObject.isLocationPrivate;
    const isLanguagePrivate = responseObject.isLanguagePrivate;
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
    const profilePageData = new ProfilePageData(this._profileId, coverImage,
      profileImage, isUpcomingEventsPrivate, isPastEventsPrivate,
      isLocationPrivate, address, isLanguagePrivate,
      languageList, isBiographyPrivate, biography,
      isFacebookPrivate, facebookLink, isTwitterPrivate, twitterLink,
      isInstagramPrivate, instagramLink, isCuisinePrivate, favoriteCuisineList);
    this._model = new LocalProfilePageModel(profilePageData, name, userName,
      createdAt, upcomingEventList, pastEventList);
    await this._model.load();
    this._isLoaded = true;
  }

  public get profilePageData(): ProfilePageData {
    return this._model.profilePageData;
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
