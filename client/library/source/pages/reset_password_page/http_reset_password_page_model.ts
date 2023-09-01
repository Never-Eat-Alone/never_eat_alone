import { User, UserProfileImage } from '../../definitions';
import { EmptyResetPasswordPageModel } from './empty_reset_password_page_model';
import { LocalResetPasswordPageModel } from './local_reset_password_page_model';
import { ResetPasswordPageModel } from './reset_password_page_model';

export class HttpResetPasswordPageModel extends ResetPasswordPageModel {
  constructor() {
    super();
    this._isLoaded = false;
    this._model = new EmptyResetPasswordPageModel();
  }

  public async load(token: string): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const resetResponse = await fetch(`/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    });
    this._checkResponse(resetResponse);
    const responseObject = await resetResponse.json();
    if (!responseObject || !responseObject.user) {
      throw new Error("Invalid server response. User data not found.");
    }
    const account = User.fromJson(responseObject.user);
    const profileImageSrc = responseObject.profileImageSrc;
    this._model = new LocalResetPasswordPageModel(profileImageSrc, account);
    await this._model.load(token);
    this._isLoaded = true;
  }

  public get account(): User {
    return this._model.account;
  }

  public get profileImageSrc(): string {
    return this._model.profileImageSrc;
  }

  public async savePassword(newPassword: string): Promise<User> {
    const response = await fetch('/api/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'account': this._model.account.toJson(),
        'password': newPassword
      })
    });
    this._checkResponse(response);
    return await this._model.savePassword(newPassword);
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private _isLoaded: boolean;
  private _model: ResetPasswordPageModel;
}
