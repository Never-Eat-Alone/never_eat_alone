import { PaymentCard, PaymentRecord, SocialAccount, User } from
  '../../definitions';

export abstract class SettingsPageModel {
  public abstract load(): Promise<void>;
  public abstract get profileId(): number;
  public abstract get displayName(): string;
  public abstract get email(): string;
  public abstract get linkedSocialAccounts(): SocialAccount[];
  public abstract getNotificationSetting(setting: string): boolean;
  public abstract get defaultCard(): PaymentCard;
  public abstract get paymentCards(): PaymentCard[];
  public abstract get paymentRecords(): PaymentRecord[];
  public abstract get isNewEmailPending(): boolean;
  public abstract get pendingNewEmail(): string;
  public abstract addCard(card: PaymentCard): Promise<void>;
  public abstract updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
    ): Promise<void>;
  public abstract deleteCard(cardId: number): Promise<void>;
  public abstract toggleNotificationSetting(setting: string): Promise<boolean>;
  public abstract emailReceipt(paymentRecord: PaymentRecord): Promise<boolean>;
  public abstract submitHelpEmail(receiptId: number, message: string): Promise<
    boolean>;
  public abstract deleteAccount(password: string): Promise<User>;
  public abstract deactivateAccount(): Promise<boolean>;
  public abstract unlinkAccount(account: SocialAccount): Promise<boolean>;
  public abstract saveDisplayName(newDisplayName: string): Promise<User>;
  public abstract saveEmailUpdateRequest(newEmail: string, password: string):
    Promise<void>;
  public abstract savePassword(currentPassword: string, newPassword: string
    ): Promise<void>;
  public abstract resendEmailUpdateConfirmation(): Promise<void>;
  public abstract discardEmailUpdateRequest(): Promise<void>;
}
