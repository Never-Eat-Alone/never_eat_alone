import { EmailConfirmationPageModel } from './email_confirmation_page_model';

export class LocalEmailConfirmationPageModel extends
    EmailConfirmationPageModel {
  constructor(isValid: boolean, error: string, message: string) {
    super();
    this._isValid = isValid;
    this._error = error;
    this._message = message;
  }

  public async load(): Promise<void> {}

  public get isValid(): boolean {
    return this._isValid;
  }

  public get error(): string {
    return this._error;
  }

  public get message(): string {
    return this._message;
  }

  private _isValid: boolean;
  private _error: string;
  private _message: string;
}
