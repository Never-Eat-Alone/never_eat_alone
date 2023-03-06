import { CreditCardType, PaymentCard, PaymentRecord, SocialAccount, User
} from '../../definitions';

export abstract class SettingsPageModel {
  public abstract load(): Promise<void>;
  public abstract get linkedSocialAccounts(): SocialAccount[];
  public abstract get password(): string;
  public abstract get isNewEventsNotificationOn(): boolean;
  public abstract get isEventJoinedNotificationOn(): boolean;
  public abstract get isEventRemindersNotificationOn(): boolean;
  public abstract get isChangesNotificationOn(): boolean;
  public abstract get isSomeoneJoinedNotificationOn(): boolean;
  public abstract get isFoodieAcceptedInviteNotificationOn(): boolean;
  public abstract get isAnnouncementNotificationOn(): boolean;
  public abstract get defaultCard(): PaymentCard;
  public abstract get paymentCards(): PaymentCard[];
  public abstract get paymentRecords(): PaymentRecord[];
  // Payment methods tab related methods
  public abstract addCard(cardNumber: number, nameOnCard: string, month: number,
    year: number, securityCode: number, zipcode: string, creditCardType:
    CreditCardType): Promise<PaymentCard>;
  public abstract updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
    ): Promise<PaymentCard>;
  public abstract deleteCard(cardId: number): Promise<boolean>;
  // Notification tab related methods
  public abstract toggleNewEventsNotification(): Promise<boolean>;
  public abstract toggleEventJoinedNotification(): Promise<boolean>;
  public abstract toggleEventRemindersNotification(): Promise<boolean>;
  public abstract toggleChangesNotification(): Promise<boolean>;
  public abstract toggleSomeoneJoinedNotification(): Promise<boolean>;
  public abstract toggleFoodieAcceptedInviteNotification(): Promise<boolean>;
  public abstract toggleAnnouncementNotification(): Promise<boolean>;
  public abstract emailReceipt(paymentRecord: PaymentRecord): Promise<boolean>;
  public abstract SubmitHelpEmail(receiptId: number, message: string): Promise<
    boolean>;
  public abstract deleteAccount(password: string): Promise<User>;
  public abstract deactivateAccount(): Promise<boolean>;
}
