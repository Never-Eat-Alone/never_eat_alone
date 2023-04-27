import { EmailConfirmationPageModel } from './email_confirmation_page_model';
import { LocalEmailConfirmationPageModel
} from './local_email_confirmation_page_model';

export class HttpEmailConfirmationPageModel extends EmailConfirmationPageModel {
  constructor(tokenId: string) {
    super();
    this._tokenId = tokenId;
  }

  /** Loads the Email confirmation page for a specific token id. */
  public async load(): Promise<void> {
    const response = await fetch(`/api/email_confirmation_page/${this._tokenId}`
      );
    let error, message = '';
    let isValid = false;
    if (response.status === 200) {
      isValid = true;
    } else {
      const responseObject = await response.json();
      error = responseObject.error;
      message = responseObject.message;
    }
    this._model = new LocalEmailConfirmationPageModel(isValid, error, message);
  }

  public get isValid(): boolean {
    return this._model.isValid;
  }

  public get error(): string {
    return this._model.error;
  }

  public get message(): string {
    return this._model.message;
  }

  private _model: EmailConfirmationPageModel;
  private _tokenId: string;
}
