import { UserProfileImage } from '../definitions';
import { HeaderModel } from './header_model';

export class LocalHeaderModel extends HeaderModel {
  constructor(profileImage: UserProfileImage) {
    super();
    this._profileImage = profileImage;
  }

  public async load(): Promise<void> {}

  public get profileImage(): UserProfileImage {
    return this._profileImage;
  }

  private _profileImage: UserProfileImage;
}
