import { arrayFromJson, Avatar, User, UserProfileImage
} from '../../definitions';
import { LocalSignUpPageModel } from './local_sign_up_page_model';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  constructor(account: User) {
    super();
    this._account = account;
  }

  public async load(): Promise<void> {
    const response = await fetch(`/api/sign_up/${this._account.id}`);
    if (response.status !== 200) {
      return;
    }
    const responseObject = await response.json();
    let userProfileImage: UserProfileImage;
    if (responseObject.userProfileImage) {
      userProfileImage = UserProfileImage.fromJson(
        responseObject.userProfileImage);
    }
    let avatars: Avatar[] = [];
    if (responseObject.avatars && responseObject.avatars.length > 0) {
      avatars = arrayFromJson(Avatar, responseObject.avatars);
    }
    this._model = new LocalSignUpPageModel(this._account, avatars);
    this._model.load();
  }

  public addUploadedImage(newImage: UserProfileImage): void {
    this._model.addUploadedImage(newImage);
  }

  public async uploadImageFile(userProfileImageFile: File):
      Promise<UserProfileImage> {
    const formData = new FormData();
    formData.append('userProfileImage', userProfileImageFile);
    const response = await fetch(
      `/api/upload_profile_image/${this._account.id}`, {
      method: 'POST',
      body: formData
    });
    if (response.status === 201) {
      const responseObject = await response.json();
      const uploadedImage = UserProfileImage.fromJson(
        responseObject.userProfileImage);
      this.addUploadedImage(uploadedImage);
      return uploadedImage;
    }
    return UserProfileImage.default(this._account.id);
  }

  public async signUp(password: string): Promise<boolean> {
    const response = await fetch(`/api/sign_up/${this._account.id}`, {
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

  public async setUpProfile(displayName: string, image: UserProfileImage |
      Avatar): Promise<{ account: User, accountProfileImage: UserProfileImage }
      > {
    const response = await fetch(`/api/set_up_profile/${this._account.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'displayName': displayName,
        'image': image.toJson()
      })
    });
    if (response.status !== 200) {
      return {
        account: this._account,
        accountProfileImage: UserProfileImage.default(this._account.id)
      };
    } else {
      const responseObject = await response.json();
      return {
        account: User.fromJson(responseObject.account),
        accountProfileImage: UserProfileImage.fromJson(
          responseObject.accountProfileImage)
      };
    }
  }

  public get avatars(): Avatar[] {
    return this._model.avatars;
  }

  private _model: SignUpPageModel;
  private _account: User;
}
