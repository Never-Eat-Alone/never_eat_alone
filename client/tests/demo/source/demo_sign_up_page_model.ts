import * as NeverEatAlone from 'never_eat_alone';

export class DemoSignUpPageModel extends NeverEatAlone.SignUpPageModel {
  constructor(account: NeverEatAlone.User, avatars: NeverEatAlone.Avatar[]) {
    super();
    this._account = account;
    this._avatars = avatars;
    this._imageSrc = NeverEatAlone.UserProfileImage.default(
      this._account.id).src;
  }

  public async load(): Promise<void> {}

  public get avatars(): NeverEatAlone.Avatar[] {
    return this._avatars;
  }

  public addUploadedImage(newImage: NeverEatAlone.UserProfileImage): void {
    this._imageSrc = newImage.src;
  }

  public async uploadImageFile(imageFile: File):
      Promise<NeverEatAlone.UserProfileImage> {
    return new NeverEatAlone.UserProfileImage(this._account.id, this._imageSrc);
  }

  public async signUp(password: string): Promise<boolean> {
    return Boolean(password);
  }

  public async setUpProfile(displayName: string,
      image: NeverEatAlone.UserProfileImage | NeverEatAlone.Avatar):
      Promise<void> {
    const tempAccount = new NeverEatAlone.User(this._account.id, displayName,
      this._account.email, this._account.userName, this._account.userStatus,
      this._account.createdAt);
    this._account = tempAccount;
    this._imageSrc = image.src;
  }

  private _account: NeverEatAlone.User;
  private _avatars: NeverEatAlone.Avatar[];
  private _imageSrc: string;
}
