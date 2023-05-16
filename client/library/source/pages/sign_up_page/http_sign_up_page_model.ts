import { arrayFromJson, Avatar, User, UserProfileImage
} from '../../definitions';
import { LocalSignUpPageModel } from './local_sign_up_page_model';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  constructor(account: User) {
    super();
    this._account = account;
    console.log('HttpSignUpPageModel constructor for accountid', this._account.id);
  }

  public async load(): Promise<void> {
    console.log('load');
    const response = await fetch(`/api/sign_up/${this._account.id}`);
    console.log('response status', response.status);
    if (response.status !== 200) {
      return;
    }
    const responseObject = await response.json();
    let userProfileImage = UserProfileImage.NoImage();
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
    this._model = new LocalSignUpPageModel(this._account, userProfileImage,
      avatars);
    this._model.load();
  }

  public async uploadImage(userProfileImageFile: File):
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
      return UserProfileImage.fromJson(responseObject.userProfileImage);
    }
    console.log('gailed to upload image and returning noImage', UserProfileImage.NoImage());
    //this is the problem, need to create the image with the user id and defaulr src for default image
    return UserProfileImage.NoImage();
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

  public async setUpProfile(displayName: string, image: UserProfileImage):
      Promise<void> {
    await fetch(`/api/set_up_profile/${this._account.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'displayName': displayName,
        'image': image.toJson()
      })
    });
  }

  public get defaultImage(): UserProfileImage {
    return this._model.defaultImage;
  }

  public get avatars(): Avatar[] {
    return this._model.avatars;
  }

  private _model: SignUpPageModel;
  private _account: User;
}
