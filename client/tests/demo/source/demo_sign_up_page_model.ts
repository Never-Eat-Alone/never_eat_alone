import * as NeverEatAlone from 'never_eat_alone';

export class DemoSignUpPageModel extends NeverEatAlone.SignUpPageModel {
  constructor(account: NeverEatAlone.User, accountProfileImage:
      NeverEatAlone.UserProfileImage) {
    super();
    this._account = account;
    this._accountProfileImage = accountProfileImage;
  }

  public addUploadedImage(newImage: NeverEatAlone.UserProfileImage): void {
    this._accountProfileImage = newImage;
  }

  public async uploadImageFile(imageFile: File):
      Promise<NeverEatAlone.UserProfileImage> {
    return this._accountProfileImage;
  }

  public async signUp(password: string): Promise<boolean> {
    return Boolean(password);
  }

  public async setUpProfile(displayName: string, image:
      NeverEatAlone.UserProfileImage): Promise<{ account: NeverEatAlone.User,
      accountProfileImage: NeverEatAlone.UserProfileImage }> {
    return {
      account: new NeverEatAlone.User(this._account.id, displayName,
        this._account.email, this._account.userName, this._account.userStatus,
        this._account.createdAt),
      accountProfileImage: image
    };
  }

  private _account: NeverEatAlone.User;
  private _accountProfileImage: NeverEatAlone.UserProfileImage;
}
