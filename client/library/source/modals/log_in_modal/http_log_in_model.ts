import { User, UserProfileImage } from '../../definitions';

export class HttpLogInModel {
  public async logIn(email: string, password: string, rememberMe: boolean
      ): Promise<{user: User, profileImage: UserProfileImage}> {
    const response = await fetch('/api/log_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
        'rememberMe': rememberMe
      })
    });
    if (response.status === 200) {
      const responseObject = await response.json();
      const user = User.fromJson(responseObject.user);
      const profileImage = UserProfileImage.fromJson(
        responseObject.profileImage);
      return { user: user, profileImage: profileImage };
    }
    return { user: User.makeGuest(), profileImage: UserProfileImage.NoImage() };
  }

  public async googleLogIn(): Promise<{user: User, profileImage:
      UserProfileImage}> {
    return;
  }

  public async facebookLogIn(): Promise<{user: User, profileImage:
      UserProfileImage}> {
    return;
  }

  public async logOut(): Promise<boolean> {
    return;
  }
}
