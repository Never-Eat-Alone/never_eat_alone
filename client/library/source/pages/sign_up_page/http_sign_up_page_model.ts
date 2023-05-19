import { arrayFromJson, Avatar, User, UserProfileImage
} from '../../definitions';
import { LocalSignUpPageModel } from './local_sign_up_page_model';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  constructor(account: User) {
    super();
    this._account = account;
    console.log('HttpSignUpPageModel constructor for accountid',
      this._account.id);
  }

  public async load(): Promise<void> {
    console.log('load');
    const response = await fetch(`/api/sign_up/${this._account.id}`);
    console.log('response status', response.status);
    if (response.status !== 200) {
      return;
    }
    const responseObject = await response.json();
    let userProfileImage: UserProfileImage;
    if (responseObject.userProfileImage) {
      userProfileImage = UserProfileImage.fromJson(
        responseObject.userProfileImage);
      console.log('userProfileImage', userProfileImage);
    }
    let avatars: Avatar[] = [];
    if (responseObject.avatars && responseObject.avatars.length > 0) {
      avatars = arrayFromJson(Avatar, responseObject.avatars);
      console.log('avatars', avatars);
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
    console.log('uloading image', `/api/upload_profile_image/${this._account.id}`);
    const response = await fetch(
      `/api/upload_profile_image/${this._account.id}`, {
      method: 'POST',
      body: formData
    });
    console.log('response.status', response.status);
    if (response.status === 201) {
      const responseObject = await response.json();
      console.log('uploaded image successfully', UserProfileImage.fromJson(responseObject.userProfileImage));
      const uploadedImage = UserProfileImage.fromJson(responseObject.userProfileImage);
      this.addUploadedImage(uploadedImage);
      return uploadedImage;
    }
    console.log('failed to upload image and returning default image', UserProfileImage.default(this._account.id));
    //this is the problem, need to create the image with the user id and defaulr src for default image
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
      console.log('Failed to save the account updates.');
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
