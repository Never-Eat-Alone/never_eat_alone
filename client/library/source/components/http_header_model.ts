import { User } from '../definitions'
import { HeaderModel } from './header_model';
import { LocalHeaderModel } from './local_header_model';

export class HttpHeaderModel extends HeaderModel {
  constructor(account: User) {
    super();
    this._account = account;
  }

  public async load(): Promise<void> {
    const response = await fetch(`/profile_image/${this._account.id}`);
    const profileImageSrc = await response.json();
    this._model = new LocalHeaderModel(profileImageSrc);
    this._model.load();
  }

  public get profileImageSrc(): string {
    return this._model.profileImageSrc;
  }

  private _model: HeaderModel;
  private _account: User;
}
