import { User } from '../../definitions';
import { ResetPasswordPageModel } from './reset_password_page_model';

export class LocalResetPasswordPageModel extends ResetPasswordPageModel {
  constructor(profileImageSrc: string, account: User) {
    super();
    this._isLoaded = false;
    this._profileImageSrc = profileImageSrc;
    this._account = account;
  }

  public async load(token: string): Promise<void> {
    this._isLoaded = true;
  }

  public get account(): User {
    this.ensureIsLoaded();
    return this._account;
  }

  public get profileImageSrc(): string {
    this.ensureIsLoaded();
    return this._profileImageSrc;
  }

  public async savePassword(newPassword: string): Promise<User> {
    this.ensureIsLoaded();
    return this._account;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('ResetPasswordPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _profileImageSrc: string;
  private _account: User;
}
