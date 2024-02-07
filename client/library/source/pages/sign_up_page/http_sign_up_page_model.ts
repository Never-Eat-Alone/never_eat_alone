import { User, UserProfileImage } from '../../definitions';
import { SignUpPageModel } from './sign_up_page_model';

export class HttpSignUpPageModel extends SignUpPageModel {
  public async uploadImageFile(userId: number, userProfileImageFile: File):
      Promise<UserProfileImage> {
    const formData = new FormData();
    formData.append('userProfileImage', userProfileImageFile);
    const response = await fetch(
      `/api/upload_profile_image/${userId}`, {
      method: 'POST',
      body: formData
    });
    if (response.status === 201) {
      const responseObject = await response.json();
      const uploadedImage = UserProfileImage.fromJson(
        responseObject.accountProfileImage);
      return uploadedImage;
    }
  }

  public async signUp(userId: number, password: string): Promise<boolean> {
    const response = await fetch(`/api/set-up-password/${userId}`, {
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

  public async setUpProfile(userId: number, displayName: string, image:
      UserProfileImage): Promise<{ account: User, accountProfileImage:
      UserProfileImage }> {
    const response = await fetch(`/api/set_up_profile/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'displayName': displayName,
        'accountProfileImage': image.toJson()
      })
    });

    if (response.status !== 200) {
      return {
        account: User.makeGuest(),
        accountProfileImage: UserProfileImage.default()
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
}
