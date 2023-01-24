import * as NeverEatAlone from 'never_eat_alone';

export class DemoSignUpPageModel extends NeverEatAlone.SignUpPageModel {
  constructor(email: string, avatars: NeverEatAlone.UserProfileImage[],
      defaultImage: NeverEatAlone.UserProfileImage) {
    super();
    this._email = email;
    this._avatars = avatars;
    this._defaultImage = defaultImage;
  }

  public async load(): Promise<void> {
    return;
  }

  public get email(): string {
    return this._email;
  }

  public get avatars(): NeverEatAlone.UserProfileImage[] {
    return this._avatars;
  }

  public get defaultImage(): NeverEatAlone.UserProfileImage {
    return this._defaultImage;
  }

  public async uploadImage(): Promise<NeverEatAlone.UserProfileImage> {
    return new NeverEatAlone.UserProfileImage(1, Date.now(),
      'resources/images/profileguy2.jpeg');
  }

  public async signUp(password: string): Promise<void> {
    return;
  }

  public async setUpProfile(displayName: string,
      image: NeverEatAlone.UserProfileImage): Promise<void> {
    return;
  }

  private _email: string;
  private _avatars: NeverEatAlone.UserProfileImage[];
  private _defaultImage: NeverEatAlone.UserProfileImage;
}
