import { arrayFromJson, NotificationSettings, PaymentCard, PaymentRecord,
  SocialAccount, User } from '../../definitions';
import { EmptySettingsPageModel } from './empty_settings_page_model';
import { LocalSettingsPageModel } from './local_settings_page_model';
import { SettingsPageModel } from './settings_page_model';

export class HttpSettingsPageModel extends SettingsPageModel {
  constructor(profileId: number) {
    super();
    this._isLoaded = false;
    this._profileId = profileId;
    this._model = new EmptySettingsPageModel();
  }

  /**
   * Loads the data to display on the SettingsPage. Must be called before
   * calling any other method of this class.
   */
  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(`/api/settings/${this._profileId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const linkedSocialAccounts: SocialAccount[] = arrayFromJson(SocialAccount,
      responseObject.linkedSocialAccounts);
    const notificationSettings = NotificationSettings.fromJson(
      responseObject.notificationSettings);
    const defaultCard = PaymentCard.fromJson(responseObject.defaultCard);
    const paymentCards: PaymentCard[] = arrayFromJson(PaymentCard,
      responseObject.paymentCards);
    const paymentRecords: PaymentRecord[] = arrayFromJson(PaymentRecord,
      responseObject.paymentRecords);
    this._model = new LocalSettingsPageModel(this._profileId,
      responseObject.displayName, responseObject.email,
      responseObject.pendingNewEmail, responseObject.isEmailUpdateTokenValid,
      linkedSocialAccounts, notificationSettings, defaultCard, paymentCards,
      paymentRecords);
    await this._model.load();
    this._isLoaded = true;
  }

  public get profileId(): number {
    return this._model.profileId;
  }

  public get displayName(): string {
    return this._model.displayName;
  }

  public get email(): string {
    return this._model.email;
  }

  public get pendingNewEmail(): string {
    return this._model.pendingNewEmail;
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    return this._model.linkedSocialAccounts;
  }

  public getNotificationSetting(setting: string): boolean {
    return this._model.getNotificationSetting(setting);
  }

  public get defaultCard(): PaymentCard {
    return this._model.defaultCard;
  }

  public get paymentCards(): PaymentCard[] {
    return this._model.paymentCards;
  }

  public get paymentRecords(): PaymentRecord[] {
    return this._model.paymentRecords;
  }

  public get isEmailUpdateTokenValid(): boolean {
    return this._model.isEmailUpdateTokenValid;
  }

  /** Payment methods tab related methods */
  public async addCard(card: PaymentCard): Promise<void> {
    const response = await fetch('/api/add_payment_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        card: card.toJson()
      })
    });
    this._checkResponse(response);
    const responseObject = await response.json();
    const newCard = PaymentCard.fromJson(responseObject.paymentCard);
    this._model.addCard(newCard);
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean):
      Promise<void> {
    const response = await fetch('/api/update_payment_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newCard: newCard.toJson(),
        isMarkedAsDefault: isMarkedAsDefault
      })
    });
    this._checkResponse(response);
    const responseObject = await response.json();
    const card = PaymentCard.fromJson(responseObject.paymentCard);
    this._model.updateCard(card, responseObject.isMarkedAsDefault);
  }

  public async deleteCard(cardId: number): Promise<void> {
    const response = await fetch('/api/delete_payment_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cardId })
    });
    this._checkResponse(response);
    this._model.deleteCard(cardId);
  }

  /** Notification tab related methods */
  public async toggleNotificationSetting(setting: string): Promise<boolean> {
    const response = await fetch('/api/toggle_notification_setting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ setting })
    });
    this._checkResponse(response);
    return await this._model.toggleNotificationSetting(setting);
  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<boolean> {
    const response = await fetch('/api/send_email_receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'paymentRecord': paymentRecord.toJson()
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async submitHelpEmail(receiptId: number, message: string): Promise<
      boolean> {
    const response = await fetch('/api/submit_help_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'receiptId': receiptId,
        'message': message
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async deleteAccount(password: string): Promise<User> {
    const response = await fetch('/api/delete_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      const responseObject = await response.json();
      return User.fromJson(responseObject.account);
    }
    return User.makeGuest();
  }

  public async deactivateAccount(): Promise<boolean> {
    const response = await fetch('/api/deactivate_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async unlinkAccount(account: SocialAccount): Promise<boolean> {
    const response = await fetch('/api/unlink_social_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this._checkResponse(response);
    return this._model.unlinkAccount(account);
  }

  public async saveDisplayName(name: string): Promise<User> {
    const response = await fetch('/api/update-user-display-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    this._checkResponse(response);
    const responseObject = await response.json();
    const updatedUser = User.fromJson(responseObject.user);
    await this._model.saveDisplayName(name);
    return updatedUser;
  }

  public async saveEmailUpdateRequest(newEmail: string, password: string):
      Promise<void> {
    const response = await fetch(`/api/update-user-email/${this._profileId}`,
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: newEmail, password: password })
    });
    const responseObject = await response.json();
    this._checkResponse(response, responseObject.message);
    await this._model.saveEmailUpdateRequest(newEmail, password);
  }

  public async savePassword(currentPassword: string, newPassword: string
      ): Promise<void> {
    const response = await fetch(`/api/update-user-password/${this._profileId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword
        })
      });
    this._checkResponse(response);
  }

  public async resendEmailUpdateConfirmation(): Promise<void> {
    const response = await fetch(
      `/api/update-email-resend_link/${this._profileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this._checkResponse(response);
    await this._model.resendEmailUpdateConfirmation();
  }

  public async discardEmailUpdateRequest(): Promise<void> {
    const response = await fetch(
      `/api/update-email-discard/${this._profileId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this._checkResponse(response);
    await this._model.discardEmailUpdateRequest();
  }

  private _checkResponse(response: Response, message: string = ''): void {
    if (!response.ok) {
      const error = new Error(`HTTP error, status = ${response.status}`) as any;
      error.code = response.status;
      error.message = message;
      throw error;
    }
  }

  private _isLoaded: boolean;
  private _profileId: number;
  private _model: SettingsPageModel;
}
