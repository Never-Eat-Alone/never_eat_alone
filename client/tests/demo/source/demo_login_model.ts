import * as NeverEatAlone from 'never_eat_alone';

export class DemoLogInModel extends NeverEatAlone.LogInModel {
  constructor(userList: NeverEatAlone.User[], profileImageList:
      NeverEatAlone.UserProfileImage[]) {
    super();
    this._userList = userList;
    this._profileImageList = profileImageList;
  }

  public async logIn(email: string, password: string, rememberMe: boolean):
      Promise<{user: NeverEatAlone.User, profileImage:
      NeverEatAlone.UserProfileImage}> {
    let tempUser = NeverEatAlone.User.makeGuest();
    let tempProfileImage = NeverEatAlone.UserProfileImage.NoImage();
    for (const user of this._userList) {
      if (user.email === email && password === '123') {
        tempUser = user;
        const imageIndex = this._profileImageList.findIndex((i) => i.userId ===
          user.id);
        if (imageIndex !== -1) {
          tempProfileImage = this._profileImageList[imageIndex];
        } 
      }
    }
    return {
      user: tempUser,
      profileImage: tempProfileImage
    };
  }

  public async googleLogIn(): Promise<{user: NeverEatAlone.User, profileImage:
      NeverEatAlone.UserProfileImage}> {
    return { user: this._userList[0], profileImage: this._profileImageList[0] };
  }

  public async facebookLogIn(): Promise<{user: NeverEatAlone.User, profileImage:
      NeverEatAlone.UserProfileImage}> {
    return {
      user: NeverEatAlone.User.makeGuest(),
      profileImage: NeverEatAlone.UserProfileImage.NoImage()
    };
  }

  public async logOut(): Promise<boolean> {
    return true;
  }

  private _userList: NeverEatAlone.User[];
  private _profileImageList: NeverEatAlone.UserProfileImage[];
}
