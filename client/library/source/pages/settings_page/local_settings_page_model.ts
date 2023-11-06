import { NotificationSettings, PaymentCard, PaymentRecord, SocialAccount, User }
  from '../../definitions';
import { SettingsPageModel } from './settings_page_model';

export class LocalSettingsPageModel extends SettingsPageModel {
  constructor(profileId: number, displayName: string, email: string,
      linkedSocialAccounts: SocialAccount[], notificationSettings:
      NotificationSettings, defaultCard: PaymentCard, paymentCards:
      PaymentCard[], paymentRecords: PaymentRecord[]) {
    super();
    this._isLoaded = false;
    this._profileId = profileId;
    this._displayName = displayName;
    this._email = email;
    this._linkedSocialAccounts = linkedSocialAccounts;
    this._notificationSettings = notificationSettings;
    this._defaultCard = defaultCard;
    this._paymentCards = paymentCards;
    this._paymentRecords = paymentRecords;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get profileId(): number {
    this.ensureIsLoaded();
    return this._profileId;
  }

  public get displayName(): string {
    this.ensureIsLoaded();
    return this._displayName;
  }

  public get email(): string {
    this.ensureIsLoaded();
    return this._email;
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    this.ensureIsLoaded();
    return this._linkedSocialAccounts;
  }

  public getNotificationSetting(setting: string): boolean {
    this.ensureIsLoaded();
    return this._notificationSettings.getSetting(setting);
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

  public get isEmailUpdateTokenValid(): boolean {
    return this._isEmailUpdateTokenValid;
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

  public async toggleNotificationSetting(setting: string): Promise<boolean> {
    this.ensureIsLoaded();
    const newSetting = !this._notificationSettings.getSetting(setting);
    this._notificationSettings.toggleSetting(setting);
    return newSetting;
  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<boolean> {
    this.ensureIsLoaded();
    return Boolean(paymentRecord);
  }

  public async submitHelpEmail(receiptId: number, message: string): Promise<
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

  public async unlinkAccount(account: SocialAccount): Promise<boolean> {
    this.ensureIsLoaded();
    const index = this._linkedSocialAccounts.findIndex(ac => ac.provider ===
      account.provider && ac.email === account.email);
    if (index === -1) {
      throw new Error(`Social account with email ${account.email} not found`);
    }
    this._linkedSocialAccounts = this._linkedSocialAccounts.splice(index, 1);
    return index !== -1;
  }

  public async saveDisplayName(newDisplayName: string): Promise<User> {
    this.ensureIsLoaded();
    this._displayName = newDisplayName;
    return;
  }

  public async saveEmailUpdateRequest(newEmail: string, password: string):
      Promise<void> {
    this.ensureIsLoaded();
    this._email = newEmail;
    return;
  }

  public async savePassword(currentPassword: string, newPassword: string
      ): Promise<void> {
    this.ensureIsLoaded();
    return;
  }

  public async resendEmailUpdateConfirmation(): Promise<void> {
    this.ensureIsLoaded();
    return;
  }

  public async discardEmailUpdateRequest(): Promise<void> {
    this.ensureIsLoaded();
    return;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('SettingsPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _profileId: number;
  private _displayName: string;
  private _email: string;
  private _linkedSocialAccounts: SocialAccount[];
  private _notificationSettings: NotificationSettings;
  private _defaultCard: PaymentCard;
  private _paymentCards: PaymentCard[];
  private _paymentRecords: PaymentRecord[];
  private _isEmailUpdateTokenValid: boolean;
}
