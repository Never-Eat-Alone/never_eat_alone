import { UserProfileImage } from '../../definitions';
import { SignUpPageModel } from './sign_up_page_model';

export class LocalSignUpPageModel extends SignUpPageModel {
  constructor(email: string, defaultImage: UserProfileImage,
      avatars: UserProfileImage[]) {
    super();
    this._email = email;
    this._defaultImage = defaultImage;
    this._avatars = avatars;
  }

  public async load(): Promise<void> {}

  public async uploadImage(image: UserProfileImage): Promise<UserProfileImage> {
    if (!image) {
      return UserProfileImage.NoImage();
    }
    return image;
  }

  public async signUp(password: string): Promise<boolean> {
    return Boolean(password);
  }

  public async setUpProfile(displayName: string, image: UserProfileImage
      ): Promise<boolean> {
    return Boolean(displayName && image);
  }

  public get email(): string {
    return this._email;
  }

  public get defaultImage(): UserProfileImage {
    return this._defaultImage;
  }

  public get avatars(): UserProfileImage[] {
    return this._avatars;
  }

  private _email: string;
  private _defaultImage: UserProfileImage;
  private _avatars: UserProfileImage[];
}
