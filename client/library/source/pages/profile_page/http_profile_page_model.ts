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
    const isCuisinePrivate = responseObject.isCuisinePrivate;
    const favoriteCuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.favoriteCuisineList);
    const upcomingEventList: EventCardSummary[] = arrayFromJson(
      EventCardSummary, responseObject.upcomingEventList);
    const pastEventList: EventCardSummary[] = arrayFromJson(EventCardSummary,
      responseObject.pastEventList);
    const {link: facebookLink, isPrivate: isFacebookPrivate} =
      this.extractSocialAccountDetails(SocialAccountType.FACEBOOK,
      socialAccounts);
    const {link: twitterLink, isPrivate: isTwitterPrivate} =
      this.extractSocialAccountDetails(SocialAccountType.TWITTER,
      socialAccounts);
    const {link: instagramLink, isPrivate: isInstagramPrivate} =
      this.extractSocialAccountDetails(SocialAccountType.INSTAGRAM,
      socialAccounts);
    const profilePageData = new ProfilePageData(this._profileId, coverImage,
      profileImage, isUpcomingEventsPrivate, isPastEventsPrivate,
      isLocationPrivate, address, isLanguagePrivate,
      languageList, isBiographyPrivate, biography,
      isFacebookPrivate, facebookLink, isTwitterPrivate, twitterLink,
      isInstagramPrivate, instagramLink, isCuisinePrivate, favoriteCuisineList);
    this._model = new LocalProfilePageModel(profilePageData, name, createdAt,
      upcomingEventList, pastEventList);
    await this._model.load();
    this._isLoaded = true;
  }

  public get profilePageData(): ProfilePageData {
    return this._model.profilePageData;
  }

  public get name(): string {
    return this._model.name;
  }

  public get createdAt(): Date {
    return this._model.createdAt;
  }

  public get upcomingEventList(): EventCardSummary[] {
    return this._model.upcomingEventList;
  }

  public get pastEventList(): EventCardSummary[] {
    return this._model.pastEventList;
  }

  public async updateName(newName: string): Promise<void> {
    await this._model.updateName(newName);
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private extractSocialAccountDetails(platform: SocialAccountType, accounts:
      UserProfileSocialAccount[]): { link: string, isPrivate: boolean } {
    const account = accounts.find(acc => acc.platform === platform);
    if (account) {
      return { link: account.link, isPrivate: account.isPrivate };
    }
    return { link: '', isPrivate: true };
  }

  private _isLoaded: boolean;
  private _profileId: number;
  private _model: ProfilePageModel;
}
