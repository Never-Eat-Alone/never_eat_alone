import { arrayFromJson, NotificationSettings, PaymentCard, PaymentRecord,
  SocialAccount, User } from '../../definitions';
import { EmptySettingsPageModel } from './empty_settings_page_model';
import { LocalSettingsPageModel } from './local_settings_page_model';
import { SettingsPageModel } from './settings_page_model';

export class HttpSettingsPageModel extends SettingsPageModel {
  constructor(userId: number) {
    super();
    this._isLoaded = false;
    this._userId = userId;
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
    const response = await fetch(`/api/settings/${this._userId}`);
    this._checkResponse(response);
    const responseObject = await response.json();
    const linkedSocialAccounts: SocialAccount[] = arrayFromJson(SocialAccount,
      responseObject.linkedSocialAccounts);
    const hashedPassword = responseObject.hashedPassword;
    const notificationSettings = NotificationSettings.fromJson(
      responseObject.notificationSettings);
    const defaultCard = PaymentCard.fromJson(responseObject.defaultCard);
    const paymentCards: PaymentCard[] = arrayFromJson(PaymentCard,
      responseObject.paymentCards);
    const paymentRecords: PaymentRecord[] = arrayFromJson(PaymentRecord,
      responseObject.paymentRecords);
    this._model = new LocalSettingsPageModel(linkedSocialAccounts,
      hashedPassword, notificationSettings, defaultCard, paymentCards,
      paymentRecords);
    await this._model.load();
    this._isLoaded = true;
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    return this._model.linkedSocialAccounts;
  }

  public get hashedPassword(): string {
    return this._model.hashedPassword;
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

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
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

  public async update(): Promise<void> {
    this._isLoaded = false;
    await this.load();
  }

  private _checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
  }

  private _isLoaded: boolean;
  private _userId: number;
  private _model: SettingsPageModel;
}
