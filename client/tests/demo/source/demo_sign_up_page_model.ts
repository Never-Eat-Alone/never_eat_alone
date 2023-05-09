import * as NeverEatAlone from 'never_eat_alone';

export class DemoSignUpPageModel extends NeverEatAlone.SignUpPageModel {
  constructor(account: NeverEatAlone.User,
      avatars: NeverEatAlone.Avatar[],
      defaultImage: NeverEatAlone.UserProfileImage) {
    super();
    this._account = account;
    this._avatars = avatars;
    this._defaultImage = defaultImage;
  }

  public async load(): Promise<void> {}

  public get avatars(): NeverEatAlone.Avatar[] {
    return this._avatars;
  }

  public get defaultImage(): NeverEatAlone.UserProfileImage {
    return this._defaultImage;
  }

  public async uploadImage(imageFile: File):
      Promise<NeverEatAlone.UserProfileImage> {
    return this._defaultImage;
  }

  public async signUp(password: string): Promise<boolean> {
    return Boolean(password);
  }

  public async setUpProfile(displayName: string,
      image: NeverEatAlone.UserProfileImage): Promise<void> {
    const tempAccount = new NeverEatAlone.User(this._account.id, displayName,
      this._account.email, this._account.userName, this._account.userStatus,
      this._account.createdAt);
    this._account = tempAccount;
    this._defaultImage = image;
  }

  private _account: NeverEatAlone.User;
  private _avatars: NeverEatAlone.Avatar[];
  private _defaultImage: NeverEatAlone.UserProfileImage;
}
