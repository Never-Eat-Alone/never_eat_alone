import { NotificationSettings, PaymentCard, PaymentRecord, SocialAccount, User }
  from '../../definitions';
import { SettingsPageModel } from './settings_page_model';

export class LocalSettingsPageModel extends SettingsPageModel {
  constructor(linkedSocialAccounts: SocialAccount[], hashedPassword: string,
      notificationSettings: NotificationSettings, defaultCard: PaymentCard,
      paymentCards: PaymentCard[], paymentRecords: PaymentRecord[]) {
    super();
    this._isLoaded = false;
    this._linkedSocialAccounts = linkedSocialAccounts;
    this._hashedPassword = hashedPassword;
    this._notificationSettings = notificationSettings;
    this._defaultCard = defaultCard;
    this._paymentCards = paymentCards;
    this._paymentRecords = paymentRecords;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    this.ensureIsLoaded();
    return this._linkedSocialAccounts;
  }

  public get hashedPassword(): string {
    this.ensureIsLoaded();
    return this._hashedPassword;
  }

  public getNotificationSetting(setting: string): boolean {
    this.ensureIsLoaded();
    return this._notificationSettings.getSetting(setting);
  }

  public async toggleNotificationSetting(setting: string): Promise<void> {
    this.ensureIsLoaded();
    this._notificationSettings.toggleSetting(setting);
  }

  public get defaultCard(): PaymentCard {
    this.ensureIsLoaded();
    return this._defaultCard;
  }

  public get paymentCards(): PaymentCard[] {
    this.ensureIsLoaded();
    return this._paymentCards;
  }

  public get paymentRecords(): PaymentRecord[] {
    this.ensureIsLoaded();
    return this._paymentRecords;
  }

  /** Payment methods tab related methods */
  public async addCard(card: PaymentCard): Promise<void> {
    this.ensureIsLoaded();
    this._paymentCards.push(card);
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean):
      Promise<void> {
    this.ensureIsLoaded();
    const cardIndex = this._paymentCards.findIndex(card => card.id ===
      newCard.id);
    if (cardIndex === -1) {
      throw new Error(`Card with ID ${newCard.id} not found`);
    }
    this._paymentCards[cardIndex] = newCard;
  }

  public async deleteCard(cardId: number): Promise<void> {
    this.ensureIsLoaded();
    this._paymentCards = this._paymentCards.filter(card => card.id !== cardId);
  }

  /** Notification tab related methods */
  public async toggleNewEventsNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async toggleEventJoinedNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async toggleEventRemindersNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async toggleChangesNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async toggleSomeoneJoinedNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async toggleFoodieAcceptedInviteNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async toggleAnnouncementNotification(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<boolean> {
    this.ensureIsLoaded();
    return Boolean(paymentRecord);
  }

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
      boolean> {
    this.ensureIsLoaded();
    return Boolean(receiptId && message);
  }

  public async deleteAccount(password: string): Promise<User> {
    this.ensureIsLoaded();
    return User.makeGuest();
  }

  public async deactivateAccount(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('SettingsPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _linkedSocialAccounts: SocialAccount[];
  private _hashedPassword: string;
  private _notificationSettings: NotificationSettings;
  private _defaultCard: PaymentCard;
  private _paymentCards: PaymentCard[];
  private _paymentRecords: PaymentRecord[];
}
