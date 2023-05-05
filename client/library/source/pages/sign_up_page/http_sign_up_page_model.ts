import { arrayFromJson, Avatar, UserProfileImage } from '../../definitions';
import { LocalSignUpPageModel } from './local_sign_up_page_model';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  constructor(profileId: number) {
    super();
    this._profileId = profileId;
  }

  public async load(): Promise<void> {
    const response = await fetch(`/api/sign_up/${this._profileId}`);
    if (response.status !== 200) {
      return;
    }
    const responseObject = await response.json();
    const email = responseObject.email;
    let userProfileImage = UserProfileImage.NoImage();
    if (responseObject.userProfileImage) {
      userProfileImage = UserProfileImage.fromJson(
        responseObject.userProfileImage);
    }
    let avatars: Avatar[] = [];
    if (responseObject.avatars && responseObject.avatars.length > 0) {
      avatars = arrayFromJson(Avatar, responseObject.avatars);
    }
    this._model = new LocalSignUpPageModel(email, userProfileImage, avatars);
    this._model.load();
  }

  public async uploadImage(userProfileImageFile: File):
      Promise<UserProfileImage> {
    const formData = new FormData();
    formData.append('userProfileImage', userProfileImageFile);
    const response = await fetch(
      `/api/upload_profile_image/${this._profileId}`, {
      method: 'POST',
      body: formData
    });
    if (response.status === 201) {
      const responseObject = await response.json();
      return UserProfileImage.fromJson(responseObject.userProfileImage);
    }
    return UserProfileImage.NoImage();
  }

  public async signUp(password: string): Promise<boolean> {
    const response = await fetch(`/api/sign_up/${this._profileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'password': password
      })
    });
    if (response.status === 201 || response.status === 200) {
      return true;
    }
    return false;
  }

  public async setUpProfile(displayName: string, image: UserProfileImage
      ): Promise<boolean> {
    const response = await fetch(`/api/set_up_profile/${this._profileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'displayName': displayName,
        'image': image.toJson()
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public get email(): string {
    return this._model.email;
  }

  public get defaultImage(): UserProfileImage {
    return this._model.defaultImage;
  }

  public get avatars(): Avatar[] {
    return this._model.avatars;
  }

  private _model: SignUpPageModel;
  private _profileId: number;
}
