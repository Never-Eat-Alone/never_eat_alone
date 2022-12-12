import { PaymentCard, PaymentRecord, SocialAccount, User
} from '../../definitions';

export abstract class SettingsPageModel {
  public abstract load(): Promise<void>;
  public abstract get displayName(): string;
  public abstract get linkedSocialAccounts(): SocialAccount[];
  public abstract get profileId(): number;
  public abstract get email(): string;
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
    year: number, securityCode: number, zipcode: string): Promise<PaymentCard>;
  public abstract updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
    ): Promise<PaymentCard>;
  public abstract deleteCard(cardId: number): Promise<void>;
  // Notification tab related methods
  public abstract toggleNewEventsNotification(): Promise<void>;
  public abstract toggleEventJoinedNotification(): Promise<void>;
  public abstract toggleEventRemindersNotification(): Promise<void>;
  public abstract toggleChangesNotification(): Promise<void>;
  public abstract toggleSomeoneJoinedNotification(): Promise<void>;
  public abstract toggleFoodieAcceptedInviteNotification(): Promise<void>;
  public abstract toggleAnnouncementNotification(): Promise<void>;
  public abstract emailReceipt(paymentRecord: PaymentRecord): Promise<void>;
  public abstract SubmitHelpEmail(receiptId: number, message: string): Promise<
    void>;
  public abstract deleteAccount(account: User, password: string): Promise<User>;
  public abstract deactivateAccount(accountId: number): Promise<void>;
}
