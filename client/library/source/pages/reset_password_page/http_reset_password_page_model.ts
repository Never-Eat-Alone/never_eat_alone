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

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }

    const account = await (async () => {
      const response = await fetch('/api/current_user');
      if (response.status !== 200) {
        return User.makeGuest();  
      }
      const responseObject = await response.json();
      return User.fromJson(responseObject.user);
    })();

    const accountProfileImage = await (async () => {
      if (account?.id !== -1) {
        const imageResponse = await fetch(
          `/api/user_profile_image/${account.id}`);
        if (imageResponse.status === 200) {
          const responseObject = await imageResponse.json();
          return UserProfileImage.fromJson(
            responseObject.accountProfileImage);
        }
        return UserProfileImage.default(account.id);
      }
      return UserProfileImage.default();
    })();

    this._model = new LocalResetPasswordPageModel(account.name,
      accountProfileImage.src, account);
    await this._model.load();
    this._isLoaded = true;
  }

  public get displayName(): string {
    return this._model.displayName;
  }

  public get profileImageSrc(): string {
    return this._model.profileImageSrc;
  }

  public async savePassword(newPassword: string): Promise<User> {
    const response = await fetch('/api/update_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
