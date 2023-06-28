import { arrayFromJson, arrayToJson, CoverImage, Cuisine, Language,
  SocialAccountType, UserProfileImage, UserProfileSocialAccount } from
  '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';
import { EmptyEditProfilePageModel } from './empty_edit_profile_page_model';
import { LocalEditProfilePageModel } from './local_edit_profile_page_model';

export class HttpEditProfilePageModel extends EditProfilePageModel {
  constructor(profileId: number) {
    super();
    this._isLoaded = false;
    this._profileId = profileId;
    this._model = new EmptyEditProfilePageModel();
  }

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(`/api/edit_profile_page/${this._profileId}`);
    if (response.status !== 200) {
      throw new Error(`Load failed with response status ${response.status}`);
    }
    const responseObject = await response.json();
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const cuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.cuisineList);
    const coverImage = CoverImage.fromJson(responseObject.coverImage);
    const coverImageList: CoverImage[] = arrayFromJson(CoverImage,
      responseObject.coverImageList);
    const profileImage = UserProfileImage.fromJson(responseObject.profileImage);
    const selectedLocation = responseObject.selectedLocation;
    const isUpcomingEventsPrivate = responseObject.isUpcomingEventsPrivate;
    const isPastEventsPrivate = responseObject.isPastEventsPrivate;
    const isLocationPrivate = responseObject.isLocationPrivate;
    const isLanguagePrivate = responseObject.isLanguagePrivate;
    const biographyValue = responseObject.biographyValue;
    const isBiographyPrivate = responseObject.isBiographyPrivate;
    const selectedLanguageList: Language[] = arrayFromJson(Language,
      responseObject.selectedLanguageList);
    const selectedCuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.selectedCuisineList);
    const isCuisinePrivate = responseObject.isCuisinePrivate;
    const socialAccounts: UserProfileSocialAccount[] =
      arrayFromJson(UserProfileSocialAccount,
        responseObject.userProfileSocialAccountList);
    const isFacebookPrivate = socialAccounts.find((account) =>
      account.platform === SocialAccountType.FACEBOOK)?.isPrivate;
    const facebookLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.FACEBOOK)?.link;
    const isTwitterPrivate = socialAccounts.find((account) =>
      account.platform === SocialAccountType.TWITTER)?.isPrivate;
    const twitterLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.TWITTER)?.link;
    const isInstagramPrivate = socialAccounts.find((account) =>
      account.platform === SocialAccountType.INSTAGRAM)?.isPrivate;
    const instagramLink = socialAccounts.find((account) => account.platform ===
      SocialAccountType.INSTAGRAM)?.link;
    this._model = new LocalEditProfilePageModel(languageList,
      cuisineList, coverImage, coverImageList, profileImage,
      selectedLocation, isUpcomingEventsPrivate, isPastEventsPrivate,
      isLocationPrivate, isLanguagePrivate, biographyValue, isBiographyPrivate,
      selectedLanguageList, selectedCuisineList, isCuisinePrivate,
      isFacebookPrivate, isTwitterPrivate, isInstagramPrivate, facebookLink,
      twitterLink, instagramLink);
    await this._model.load();
    this._isLoaded = true;
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

  public get profileImage(): UserProfileImage {
    return this._model.profileImage;
  }

  public get selectedLocation(): string {
    return this._model.selectedLocation;
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

  public async getSuggestedLocationList(value: string): Promise<string[]> {
    const response = await fetch(`/api/suggested_location_list/${value}`);
    if (response.status !== 200) {
      return [];
    }
    const responseObject = await response.json();
    const suggestedLocationList: string[] = [
      ...responseObject.suggestedLocationList];
    return suggestedLocationList;
  }

  public get isLanguagePrivate(): boolean {
    return this._model.isLanguagePrivate;
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

  public async uploadProfileImage(newImage: UserProfileImage): Promise<
      UserProfileImage> {
    const response = await fetch('/api/upload_profile_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accountProfileImage: newImage.toJson(),
      })
    });
    if (response.status !== 201) {
      return UserProfileImage.default(this._profileId);
    }
    const responseObject = await response.json();
    return UserProfileImage.fromJson(responseObject.accountProfileImage);
  }

  public async saveCoverImage(newImage: CoverImage): Promise<CoverImage> {
    const response = await fetch('/api/save_cover_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image': newImage.toJson(),
      })
    });
    if (response.status !== 201 && response.status !== 200) {
      return CoverImage.noImage();
    }
    const responseObject = await response.json();
    return CoverImage.fromJson(responseObject.coverImage);
  }

  public async save(coverImage: CoverImage, profileImage: UserProfileImage,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, selectedLocation: string, isLanguagePrivate:
      boolean, selectedLanguageList: Language[], isBiographyPrivate: boolean,
      biographyValue: string, isFacebookPrivate: boolean, facebookLink: string,
      isTwitterPrivate: boolean, twitterLink: string, isInstagramPrivate:
      boolean, instagramLink: string, isCuisinePrivate: boolean,
      selectedCuisineList: Cuisine[]): Promise<boolean> {
    const response = await fetch(`/api/edit_profile_page/${this._profileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'coverImage': coverImage.toJson(),
        'profileImage': profileImage.toJson(),
        'isUpcomingEventsPrivate': isUpcomingEventsPrivate,
        'isPastEventsPrivate': isPastEventsPrivate,
        'isLocationPrivate': isLocationPrivate,
        'isLanguagePrivate': isLanguagePrivate,
        'biographyValue': biographyValue,
        'isBiographyPrivate': isBiographyPrivate,
        'selectedLanguageList': arrayToJson(selectedLanguageList),
        'selectedCuisineList': arrayToJson(selectedCuisineList),
        'isCuisinePrivate': isCuisinePrivate,
        'isFacebookPrivate': isFacebookPrivate,
        'isTwitterPrivate': isTwitterPrivate,
        'isInstagramPrivate': isInstagramPrivate,
        'facebookLink': facebookLink,
        'twitterLink': twitterLink,
        'instagramLink': instagramLink
      })
    });
    if (!response.ok) {
      return false;
    }
    return true;
  }

  private _isLoaded: boolean;
  private _model: EditProfilePageModel;
  private _profileId: number;
}
