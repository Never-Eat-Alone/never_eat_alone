import { PaymentCard, PaymentRecord, SocialAccount, User, CreditCardType
} from '../../definitions';
import { SettingsPageModel } from './settings_page_model';

export class LocalSettingsPageModel extends SettingsPageModel {
  constructor(displayName: string, linkedSocialAccounts: SocialAccount[],
      profileId: number, email: string, password: string,
      isNewEventsNotificationOn: boolean, isEventJoinedNotificationOn: boolean,
      isEventRemindersNotificationOn: boolean, isChangesNotificationOn: boolean,
      isSomeoneJoinedNotificationOn: boolean,
      isFoodieAcceptedInviteNotificationOn: boolean,
      isAnnouncementNotificationOn: boolean, defaultCard: PaymentCard,
      paymentCards: PaymentCard[], paymentRecords: PaymentRecord[]) {
    super();
    this._displayName = displayName;
    this._linkedSocialAccounts = linkedSocialAccounts;
    this._profileId = profileId;
    this._email = email;
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

  public async load(): Promise<void> {}

  public get displayName(): string {
    return this._displayName;
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    return this._linkedSocialAccounts;
  }

  public get profileId(): number {
    return this._profileId;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get isNewEventsNotificationOn(): boolean {
    return this._isNewEventsNotificationOn;
  }

  public get isEventJoinedNotificationOn(): boolean {
    return this._isEventJoinedNotificationOn;
  }

  public get isEventRemindersNotificationOn(): boolean {
    return this._isEventRemindersNotificationOn;
  }

  public get isChangesNotificationOn(): boolean {
    return this._isChangesNotificationOn;
  }

  public get isSomeoneJoinedNotificationOn(): boolean {
    return this._isSomeoneJoinedNotificationOn;
  }

  public get isFoodieAcceptedInviteNotificationOn(): boolean {
    return this._isFoodieAcceptedInviteNotificationOn;
  }

  public get isAnnouncementNotificationOn(): boolean {
    return this._isAnnouncementNotificationOn;
  }

  public get defaultCard(): PaymentCard {
    return this._defaultCard;
  }

  public get paymentCards(): PaymentCard[] {
    return this._paymentCards;
  }

  public get paymentRecords(): PaymentRecord[] {
    return this._paymentRecords;
  }

  // Payment methods tab related methods
  public async addCard(cardNumber: number, nameOnCard: string, month: number,
      year: number, securityCode: number, zipcode: string,
      creditCardType: CreditCardType): Promise<PaymentCard> {
    return new PaymentCard(Date.now(), cardNumber, nameOnCard, month, year,
      securityCode, zipcode, creditCardType);
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
      ): Promise<PaymentCard> {
    return newCard;
  }

  public async deleteCard(cardId: number): Promise<boolean> {
    return Boolean(cardId);
  }

  // Notification tab related methods
  public async toggleNewEventsNotification(): Promise<boolean> {
    return true;
  }

  public async toggleEventJoinedNotification(): Promise<boolean> {
    return true;
  }

  public async toggleEventRemindersNotification(): Promise<boolean> {
    return true;
  }

  public async toggleChangesNotification(): Promise<boolean> {
    return true;
  }

  public async toggleSomeoneJoinedNotification(): Promise<boolean> {
    return true;
  }

  public async toggleFoodieAcceptedInviteNotification(): Promise<boolean> {
    return true;
  }

  public async toggleAnnouncementNotification(): Promise<boolean> {
    return true;
  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<boolean> {
    return Boolean(paymentRecord);
  }

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
      boolean> {
    return Boolean(receiptId && message);
  }

  public async deleteAccount(password: string): Promise<User> {
    if (password) {
      return account;
    }
    return User.makeGuest();
  }

  public async deactivateAccount(accountId: number): Promise<boolean> {
    return Boolean(accountId);
  }

  private _displayName: string;
  private _linkedSocialAccounts: SocialAccount[];
  private _profileId: number;
  private _email: string;
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
