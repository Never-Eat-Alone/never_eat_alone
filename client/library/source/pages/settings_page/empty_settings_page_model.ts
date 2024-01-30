import { PaymentCard, PaymentRecord, SocialAccount, User } from
  '../../definitions';
import { AccountInformationTab } from './account_information_tab';
import { SettingsPageModel } from './settings_page_model';

/**
 * Implements a SettingsPageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptySettingsPageModel extends SettingsPageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get profileId(): number {
    throw new Error('SettingsPageModel not loaded.'); 
  }

  public get displayName(): string {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get email(): string {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get pendingNewEmail(): string {
    throw new Error('SettingsPageModel not loaded.');
  }

  public get linkedSocialAccounts(): SocialAccount[] {
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

  public get isNewEmailPending(): boolean {
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

  public async submitHelpEmail(receiptId: number, message: string): Promise<
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

  public async saveDisplayName(newDisplayName: string): Promise<User> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async saveEmailUpdateRequest(newEmail: string, password: string):
      Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async savePassword(currentPassword: string, newPassword: string
      ): Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async resendEmailUpdateConfirmation(): Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }

  public async discardEmailUpdateRequest(): Promise<void> {
    throw new Error('SettingsPageModel not loaded.');
  }
}
