import { User, UserProfileImage } from '../definitions'
import { HeaderModel } from './header_model';
import { LocalHeaderModel } from './local_header_model';

export class HttpHeaderModel extends HeaderModel {
  constructor(account: User) {
    super();
    this._account = account;
  }

  public async load(): Promise<void> {
    const response = await fetch(`/api/user_profile_image/${this._account.id}`);
    const responseObject = await response.json();
    this._model = new LocalHeaderModel(UserProfileImage.fromJson
      (responseObject.userProfileImage));
    this._model.load();
  }

  public get profileImage(): UserProfileImage {
    return this._model.profileImage;
  }

  private _model: HeaderModel;
  private _account: User;
}
