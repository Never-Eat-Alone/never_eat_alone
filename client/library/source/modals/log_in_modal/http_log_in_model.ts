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

  public async googleLogIn(email: string, token: string): Promise<{user: User,
      profileImage: UserProfileImage}> {
    const response = await fetch('/api/google_log_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'token': token
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

  public async facebookLogIn(email: string, token: string): Promise<{user: User,
      profileImage: UserProfileImage}> {
    const response = await fetch('/api/facebook_log_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'token': token
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

  public async logOut(): Promise<boolean> {
    const response = await fetch('/api/log_out');
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
