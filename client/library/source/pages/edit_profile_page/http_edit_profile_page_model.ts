import { arrayFromJson, CoverImage, Cuisine, Language, ProfilePageData,
  UserProfileImage } from '../../definitions';
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
    const profilePageData = ProfilePageData.fromJson(
      responseObject.profilePageData);
    const languageList: Language[] = arrayFromJson(Language,
      responseObject.languageList);
    const cuisineList: Cuisine[] = arrayFromJson(Cuisine,
      responseObject.cuisineList);
    const coverImageList: CoverImage[] = arrayFromJson(CoverImage,
      responseObject.coverImageList);
    this._model = new LocalEditProfilePageModel(profilePageData, coverImageList,
      languageList, cuisineList);
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
    const response = await fetch(`/api/users/${this._profileId}/update`, {
      method: 'PUT',
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

  public async update(): Promise<void> {
    this._isLoaded = false;
    await this.load();
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
