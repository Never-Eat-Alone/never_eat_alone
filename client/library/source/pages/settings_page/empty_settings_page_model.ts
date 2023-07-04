import { CreditCardType, PaymentCard, PaymentRecord, SocialAccount, User } from
  '../../definitions';
import { SettingsPageModel } from './settings_page_model';

/**
 * Implements a SettingsPageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptySettingsPageModel extends SettingsPageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get password(): string {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isNewEventsNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isEventJoinedNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isEventRemindersNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isChangesNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isSomeoneJoinedNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isFoodieAcceptedInviteNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get isAnnouncementNotificationOn(): boolean {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get defaultCard(): PaymentCard {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get paymentCards(): PaymentCard[] {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get paymentRecords(): PaymentRecord[] {
    throw new Error('SettingsPageModel not loaded.');
  }

  /** Payment methods tab related methods */
  public async addCard(cardNumber: number, nameOnCard: string, month: number,
      year: number, securityCode: number, zipcode: string, creditCardType:
      CreditCardType): Promise<PaymentCard> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean):
      Promise<PaymentCard> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async deleteCard(cardId: number): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleNewEventsNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleEventJoinedNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleEventRemindersNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleChangesNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleSomeoneJoinedNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleFoodieAcceptedInviteNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleAnnouncementNotification(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
      boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async deleteAccount(password: string): Promise<User> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async deactivateAccount(): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }
}
