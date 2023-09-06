import { arrayFromJson, arrayToJson, CoverImage, Cuisine, Language,
  ProfilePageData, SocialAccountType, UserProfileImage,
  UserProfileSocialAccount } from '../../definitions';
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
    const response = await fetch(`/api/users/${this._profileId}/edit`);
    if (response.status !== 200) {
      throw new Error(`Load failed with response status ${response.status}`);
    }
    const responseObject = await response.json();
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const favoriteCuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.favoriteCuisineList);
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
    const { facebookLink, isFacebookPrivate, twitterLink, isTwitterPrivate,
        instagramLink, isInstagramPrivate } = (() => {
      let facebookLink = '', twitterLink = '', instagramLink = '';
      let isFacebookPrivate = true, isTwitterPrivate = true,
        isInstagramPrivate = true;
      if (socialAccounts && socialAccounts.length > 0) {
        const facebookAccount = socialAccounts.find((account) =>
          account.platform === SocialAccountType.FACEBOOK);
        if (facebookAccount) {
          facebookLink = facebookAccount.link;
          isFacebookPrivate = facebookAccount.isPrivate;
        }
        const twitterAccount = socialAccounts.find((account) =>
          account.platform === SocialAccountType.TWITTER);
        if (twitterAccount) {
          twitterLink = twitterAccount.link;
          isTwitterPrivate = twitterAccount.isPrivate;
        }
        const instagramAccount = socialAccounts.find((account) =>
          account.platform === SocialAccountType.INSTAGRAM);
        if (instagramAccount) {
            instagramLink = instagramAccount.link;
            isInstagramPrivate = instagramAccount.isPrivate;
        }
      }
      return {
        facebookLink: facebookLink,
        isFacebookPrivate: isFacebookPrivate,
        twitterLink: twitterLink,
        isTwitterPrivate: isTwitterPrivate,
        instagramLink: instagramLink,
        isInstagramPrivate: isInstagramPrivate
      };
    })();
    const profilePageData = new ProfilePageData(this._profileId, coverImage,
      profileImage, isUpcomingEventsPrivate, isPastEventsPrivate,
      isLocationPrivate, selectedLocation, isLanguagePrivate,
      selectedLanguageList, isBiographyPrivate, biographyValue,
      isFacebookPrivate, facebookLink, isTwitterPrivate, twitterLink,
      isInstagramPrivate, instagramLink, isCuisinePrivate, selectedCuisineList);
    this._model = new LocalEditProfilePageModel(profilePageData, coverImageList,
      languageList, favoriteCuisineList);
    await this._model.load();
    this._isLoaded = true;
  }

  public get profilePageData(): ProfilePageData {
    return this._model.profilePageData;
  }

  public get languageList(): Language[] {
    return this._model.languageList;
  }

  public get cuisineList(): Cuisine[] {
    return this._model.cuisineList;
  }

  public get coverImageList(): CoverImage[] {
    return this._model.coverImageList;
  }

  public async getSuggestedLocationList(value: string): Promise<string[]> {
    const response = await fetch(`/api/locations/suggestions/${value}`);
    if (response.status !== 200) {
      return [];
    }
    const responseObject = await response.json();
    const suggestedLocationList: string[] = [
      ...responseObject.suggestedLocationList];
    return suggestedLocationList;
  }

  public async uploadProfileImage(userProfileImageFile: File): Promise<
      UserProfileImage> {
    const formData = new FormData();
    formData.append('userProfileImage', userProfileImageFile);
    const response = await fetch(
      `/api/upload_profile_image/${this._profileId}`, {
      method: 'POST',
      body: formData
    });

    if (response.status === 201) {
      const responseObject = await response.json();
      const uploadedImage = UserProfileImage.fromJson(
        responseObject.accountProfileImage);
      await this.updateProfileImage(uploadedImage);
      return uploadedImage;
    }

    /** If the upload fails, the image is set to the last image. */
    return this._model.profilePageData.profileImage;
  }

  public updateProfileImage = async (newImage: UserProfileImage): Promise<
      void> => {
    await this._model.updateProfileImage(newImage);
  }

  public async saveCoverImage(newImage: CoverImage): Promise<void> {
    const response = await fetch(`/api/users/${this._profileId}/cover-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image': newImage.toJson()
      })
    });
    this._checkResponse(response);
    await this._model.saveCoverImage(newImage);
  }

  public async save(profilePageData: ProfilePageData): Promise<void> {
    const response = await fetch(`/api/users/${this._profileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'profilePageData': profilePageData.toJson()
      })
    });
    this._checkResponse(response);
    await this._model.save(profilePageData);
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private _isLoaded: boolean;
  private _model: EditProfilePageModel;
  private _profileId: number;
}
