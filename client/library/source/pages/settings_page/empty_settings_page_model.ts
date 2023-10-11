import { PaymentCard, PaymentRecord, SocialAccount, User } from
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

  public get hashedPassword(): string {
    throw new Error('SettingsPageModel not loaded.');
  }

  public getNotificationSetting(setting: string): boolean {
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
  public async addCard(card: PaymentCard): Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean):
      Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async deleteCard(cardId: number): Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async toggleNotificationSetting(setting: string): Promise<boolean> {
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

  public async unlinkAccount(account: SocialAccount): Promise<boolean> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async saveDisplayName(newDisplayName: string): Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }
}
