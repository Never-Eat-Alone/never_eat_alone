import { PaymentCard, PaymentRecord, SocialAccount, User
} from '../../definitions';
import { SettingsPageModel } from './settings_page_model';

export class HttpSettingsPageModel extends SettingsPageModel {
  public async load(): Promise<void> {
    const response = await fetch('/api/settings');
  }

  public get displayName(): string {
    return this._model.displayName;
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    return this._model.linkedSocialAccounts;
  }

  public get profileId(): number {
    return this._model.profileId;
  }

  public get email(): string {
    return this._model.email;
  }

  public get password(): string {
    return this._model.password;
  }

  public get isNewEventsNotificationOn(): boolean {
    return this._model.isNewEventsNotificationOn;
  }

  public get isEventJoinedNotificationOn(): boolean {
    return this._model.isEventJoinedNotificationOn;
  }

  public get isEventRemindersNotificationOn(): boolean {
    return this._model.isEventRemindersNotificationOn;
  }

  public get isChangesNotificationOn(): boolean {
    return this._model.isChangesNotificationOn;
  }

  public get isSomeoneJoinedNotificationOn(): boolean {
    return this._model.isSomeoneJoinedNotificationOn;
  }

  public get isFoodieAcceptedInviteNotificationOn(): boolean {
    return this._model.isFoodieAcceptedInviteNotificationOn;
  }

  public get isAnnouncementNotificationOn(): boolean {
    return this._model.isAnnouncementNotificationOn;
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

  // Payment methods tab related methods
  public async addCard(cardNumber: number, nameOnCard: string, month: number,
      year: number, securityCode: number, zipcode: string): Promise<PaymentCard
      > {
    return;
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
      ): Promise<PaymentCard> {
    return;
  }

  public async deleteCard(cardId: number): Promise<void> {
    
  }

  // Notification tab related methods
  public async toggleNewEventsNotification(): Promise<void> {

  }

  public async toggleEventJoinedNotification(): Promise<void> {

  }

  public async toggleEventRemindersNotification(): Promise<void> {

  }

  public async toggleChangesNotification(): Promise<void> {

  }

  public async toggleSomeoneJoinedNotification(): Promise<void> {

  }

  public async toggleFoodieAcceptedInviteNotification(): Promise<void> {

  }

  public async toggleAnnouncementNotification(): Promise<void> {

  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<void> {

  }

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
      void> {
    
  }

  public async deleteAccount(account: User, password: string): Promise<User> {

  }

  public async deactivateAccount(accountId: number): Promise<void> {

  }

  private _model: SettingsPageModel;
}
