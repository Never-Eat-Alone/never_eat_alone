import { CreditCardType, PaymentCard, PaymentRecord, SocialAccount, User } from
  '../../definitions';
import { SettingsPageModel } from './settings_page_model';

export class LocalSettingsPageModel extends SettingsPageModel {
  constructor(linkedSocialAccounts: SocialAccount[], password: string,
      isNewEventsNotificationOn: boolean, isEventJoinedNotificationOn: boolean,
      isEventRemindersNotificationOn: boolean, isChangesNotificationOn: boolean,
      isSomeoneJoinedNotificationOn: boolean,
      isFoodieAcceptedInviteNotificationOn: boolean,
      isAnnouncementNotificationOn: boolean, defaultCard: PaymentCard,
      paymentCards: PaymentCard[], paymentRecords: PaymentRecord[]) {
    super();
    this._isLoaded = false;
    this._linkedSocialAccounts = linkedSocialAccounts;
    this._password = password;
    this._isNewEventsNotificationOn = isNewEventsNotificationOn;
    this._isEventJoinedNotificationOn = isEventJoinedNotificationOn;
    this._isEventRemindersNotificationOn = isEventRemindersNotificationOn;
    this._isChangesNotificationOn = isChangesNotificationOn;
    this._isSomeoneJoinedNotificationOn = isSomeoneJoinedNotificationOn;
    this._isFoodieAcceptedInviteNotificationOn =
      isFoodieAcceptedInviteNotificationOn;
    this._isAnnouncementNotificationOn = isAnnouncementNotificationOn;
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

  public get password(): string {
    this.ensureIsLoaded();
    return this._password;
  }

  public get isNewEventsNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isNewEventsNotificationOn;
  }

  public get isEventJoinedNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isEventJoinedNotificationOn;
  }

  public get isEventRemindersNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isEventRemindersNotificationOn;
  }

  public get isChangesNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isChangesNotificationOn;
  }

  public get isSomeoneJoinedNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isSomeoneJoinedNotificationOn;
  }

  public get isFoodieAcceptedInviteNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isFoodieAcceptedInviteNotificationOn;
  }

  public get isAnnouncementNotificationOn(): boolean {
    this.ensureIsLoaded();
    return this._isAnnouncementNotificationOn;
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
  public async addCard(cardNumber: number, nameOnCard: string, month: number,
      year: number, securityCode: number, zipcode: string, creditCardType:
      CreditCardType): Promise<PaymentCard> {
    this.ensureIsLoaded();
    const newCard = new PaymentCard(Date.now(), cardNumber, nameOnCard, month,
      year, securityCode, zipcode, creditCardType);
    this._paymentCards.push(newCard);
    return newCard;
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean):
      Promise<PaymentCard> {
    this.ensureIsLoaded();
    const cardIndex = this._paymentCards.findIndex(card => card.id ===
      newCard.id);
    if (cardIndex === -1) {
      throw new Error(`Card with ID ${newCard.id} not found`);
    }
    this._paymentCards[cardIndex] = newCard;
    return newCard;
  }

  public async deleteCard(cardId: number): Promise<boolean> {
    this.ensureIsLoaded();
    const initialLength = this._paymentCards.length;
    this._paymentCards = this._paymentCards.filter(card => card.id !== cardId);
    return initialLength > this._paymentCards.length;
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
  private _password: string;
  private _isNewEventsNotificationOn: boolean;
  private _isEventJoinedNotificationOn: boolean;
  private _isEventRemindersNotificationOn: boolean;
  private _isChangesNotificationOn: boolean;
  private _isSomeoneJoinedNotificationOn: boolean;
  private _isFoodieAcceptedInviteNotificationOn: boolean;
  private _isAnnouncementNotificationOn: boolean;
  private _defaultCard: PaymentCard;
  private _paymentCards: PaymentCard[];
  private _paymentRecords: PaymentRecord[];
}
