import { PaymentCard, PaymentRecord, SocialAccount } from '../../definitions';

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
  public abstract get otherPaymentCards(): PaymentCard[];
  public abstract get paymentRecords(): PaymentRecord[];
  
}
