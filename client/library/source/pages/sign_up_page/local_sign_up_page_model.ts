import { Avatar, User, UserProfileImage } from '../../definitions';
import { SignUpPageModel } from './sign_up_page_model';

export class LocalSignUpPageModel extends SignUpPageModel {
  constructor(account: User, defaultImage: UserProfileImage, avatars: Avatar[]
      ) {
    super();
    this._account = account;
    this._defaultImage = defaultImage;
    this._avatars = avatars;
  }

  public async load(): Promise<void> {}

  public async uploadImage(imageFile: File): Promise<UserProfileImage> {
    return this._defaultImage;
  }

  public async updateProfileImageByAvatar(avatar: Avatar):
      Promise<UserProfileImage> {
    return this._defaultImage;
  }

  public async signUp(password: string): Promise<boolean> {
    return Boolean(password);
  }

  public async setUpProfile(displayName: string, image: UserProfileImage
      ): Promise<void> {
    const tempAccount = new User(this._account.id, displayName,
      this._account.email, this._account.userName, this._account.userStatus,
      this._account.createdAt);
    this._account = tempAccount;
    this._defaultImage = image;
  }

  public get defaultImage(): UserProfileImage {
    return this._defaultImage;
  }

  public get avatars(): Avatar[] {
    return this._avatars;
  }

  private _defaultImage: UserProfileImage;
  private _avatars: Avatar[];
  private _account: User;
}
