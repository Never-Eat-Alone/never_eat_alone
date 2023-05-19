import { Avatar, User, UserProfileImage } from '../../definitions';
import { SignUpPageModel } from './sign_up_page_model';

export class LocalSignUpPageModel extends SignUpPageModel {
  constructor(account: User, avatars: Avatar[]) {
    super();
    this._account = account;
    this._avatars = avatars;
    this._imageSrc = UserProfileImage.default(this._account.id).src;
  }

  public async load(): Promise<void> {}

  public get avatars(): Avatar[] {
    return this._avatars;
  }

  public addUploadedImage(newImage: UserProfileImage): void {
    this._imageSrc = newImage.src;
  }

  public async uploadImageFile(imageFile: File): Promise<UserProfileImage> {
    return new UserProfileImage(this._account.id, this._imageSrc);
  }

  public async signUp(password: string): Promise<boolean> {
    return Boolean(password);
  }

  public async setUpProfile(displayName: string, image: UserProfileImage |
      Avatar): Promise<{ account: User, accountProfileImage: UserProfileImage }
      > {
    const tempAccount = new User(this._account.id, displayName,
      this._account.email, this._account.userName, this._account.userStatus,
      this._account.createdAt);
    this._account = tempAccount;
    this._imageSrc = image.src;
    return {
      account: this._account,
      accountProfileImage: new UserProfileImage(this._account.id, image.src)
    };
  }

  private _avatars: Avatar[];
  private _account: User;
  private _imageSrc: string;
}
