import { User, UserProfileImage } from '../../definitions';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  constructor(account: User, accountProfileImage: UserProfileImage) {
    super();
    this._account = account;
    this._accountProfileImage = accountProfileImage;
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
      //this.addUploadedImage(uploadedImage);
      return uploadedImage;
    }
    // If the upload fails, the image is set to the last image.
    return this._accountProfileImage;
  }

  public async signUp(password: string): Promise<boolean> {
    const response = await fetch(`/api/set_up_password/${this._account.id}`, {
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
      Promise<{ account: User, accountProfileImage: UserProfileImage }> {
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
        accountProfileImage: this._accountProfileImage
      };
    } else {
      const responseObject = await response.json();
      return {
        account: User.fromJson(responseObject.user),
        accountProfileImage: UserProfileImage.fromJson(
          responseObject.userProfileImage)
      };
    }
  }

  private _account: User;
  private _accountProfileImage: UserProfileImage;
}
