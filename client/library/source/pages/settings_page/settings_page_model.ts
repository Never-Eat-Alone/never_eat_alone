import { CreditCardType, PaymentCard, PaymentRecord, SocialAccount, User } from
  '../../definitions';

export abstract class SettingsPageModel {
  public abstract load(): Promise<void>;
  public abstract get linkedSocialAccounts(): SocialAccount[];
  public abstract get hashedPassword(): string;
  public abstract getNotificationSetting(setting: string): boolean;
  public abstract get defaultCard(): PaymentCard;
  public abstract get paymentCards(): PaymentCard[];
  public abstract get paymentRecords(): PaymentRecord[];
  public abstract addCard(card: PaymentCard): Promise<void>;
  public abstract updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
    ): Promise<void>;
  public abstract deleteCard(cardId: number): Promise<void>;
  public abstract toggleNotificationSetting(setting: string): Promise<void>;
  public abstract emailReceipt(paymentRecord: PaymentRecord): Promise<boolean>;
  public abstract SubmitHelpEmail(receiptId: number, message: string): Promise<
    boolean>;
  public abstract deleteAccount(password: string): Promise<User>;
  public abstract deactivateAccount(): Promise<boolean>;
}
