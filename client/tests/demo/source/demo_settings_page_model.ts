import * as NeverEatAlone from 'never_eat_alone';

export class DemoSettingsPageModel extends NeverEatAlone.SettingsPageModel {
  constructor(linkedSocialAccounts: NeverEatAlone.SocialAccount[],
      hashedPassword: string, notificationSettings:
      NeverEatAlone.NotificationSettings, defaultCard:
      NeverEatAlone.PaymentCard, paymentCards: NeverEatAlone.PaymentCard[],
      paymentRecords: NeverEatAlone.PaymentRecord[]) {
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

  public get linkedSocialAccounts(): NeverEatAlone.SocialAccount[] {
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

  public get defaultCard(): NeverEatAlone.PaymentCard {
    this.ensureIsLoaded();
    return this._defaultCard;
  }

  public get paymentCards(): NeverEatAlone.PaymentCard[] {
    this.ensureIsLoaded();
    return this._paymentCards;
  }

  public get paymentRecords(): NeverEatAlone.PaymentRecord[] {
    this.ensureIsLoaded();
    return this._paymentRecords;
  }

  public async addCard(card: NeverEatAlone.PaymentCard): Promise<void> {
    this.ensureIsLoaded();
    this._paymentCards.push(card);
  }

  public async updateCard(newCard: NeverEatAlone.PaymentCard,
      isMarkedAsDefault: boolean): Promise<void> {
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

  public async emailReceipt(paymentRecord: NeverEatAlone.PaymentRecord):
      Promise<boolean> {
    this.ensureIsLoaded();
    return Boolean(paymentRecord);
  }

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
      boolean> {
    this.ensureIsLoaded();
    return Boolean(receiptId && message);
  }

  public async deleteAccount(password: string): Promise<NeverEatAlone.User> {
    this.ensureIsLoaded();
    return NeverEatAlone.User.makeGuest();
  }

  public async deactivateAccount(): Promise<boolean> {
    this.ensureIsLoaded();
    return true;
  }

  public async unlinkAccount(account: NeverEatAlone.SocialAccount): Promise<
      boolean> {
    this.ensureIsLoaded();
    const index = this._linkedSocialAccounts.findIndex(ac => ac.provider ===
      account.provider && ac.email === account.email);
    if (index === -1) {
      throw new Error(`Social account with email ${account.email} not found`);
    }
    this._linkedSocialAccounts = this._linkedSocialAccounts.splice(index, 1);
    return index !== -1;
  }

  public async saveDisplayName(newDisplayName: string): Promise<void> {
    this.ensureIsLoaded();
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('SettingsPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _linkedSocialAccounts: NeverEatAlone.SocialAccount[];
  private _hashedPassword: string;
  private _notificationSettings: NeverEatAlone.NotificationSettings;
  private _defaultCard: NeverEatAlone.PaymentCard;
  private _paymentCards: NeverEatAlone.PaymentCard[];
  private _paymentRecords: NeverEatAlone.PaymentRecord[];
}
