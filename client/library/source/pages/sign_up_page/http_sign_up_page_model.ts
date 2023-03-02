import { UserProfileImage } from '../../definitions';
import { LocalSignUpPageModel } from './local_sign_up_page_model';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  public async load(): Promise<void> {
    const response = await fetch('/api/sign_up');
    const responseObject = await response.json();
    let email = '';
    let defaultImage = UserProfileImage.NoImage();
    let avatars: UserProfileImage[] = [];
    if (response.status === 200) {
      email = responseObject.email;
      defaultImage = UserProfileImage.fromJson(responseObject.defaultImage);
      for (const avatar of responseObject.avatars) {
        avatars.push(UserProfileImage.fromJson(avatar));
      }
    }
    this._model = new LocalSignUpPageModel(email, defaultImage, avatars);
    this._model.load();
  }

  public async uploadImage(image: UserProfileImage): Promise<UserProfileImage> {
    const response = await fetch('/api/upload_profile_image', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image': image.toJson()
      })
    });
    if (response.status === 201) {
      const responseObject = await response.json();
      return UserProfileImage.fromJson(responseObject.userProfileImage);
    }
    return UserProfileImage.NoImage();
  }

  public async signUp(password: string): Promise<boolean> {
    const response = await fetch('/api/sign_up', {
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
    const response = await fetch('/api/set_up_profile', {
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

  public get avatars(): UserProfileImage[] {
    return this._model.avatars;
  }

  private _model: SignUpPageModel;
}