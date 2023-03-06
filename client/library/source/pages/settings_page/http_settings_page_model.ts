import { CreditCardType, PaymentCard, PaymentRecord, SocialAccount, User
} from '../../definitions';
import { SettingsPageModel } from './settings_page_model';
import { LocalSettingsPageModel } from './local_settings_page_model';

export class HttpSettingsPageModel extends SettingsPageModel {
  constructor(account: User) {
    super();
    this._account = account;
  }

  public async load(): Promise<void> {
    const response = await fetch(`/api/settings/${this._account.id}`);
    const responseObject = await response.json();
    const linkedSocialAccounts: SocialAccount[] = [];
    for (const socialAccount of responseObject.linkedSocialAccounts) {
      linkedSocialAccounts.push(SocialAccount.fromJson(socialAccount));
    }
    const password = responseObject.password;
    const isNewEventsNotificationOn = responseObject.isNewEventsNotificationOn;
    const isEventJoinedNotificationOn = 
      responseObject.isEventJoinedNotificationOn;
    const isEventRemindersNotificationOn =
      responseObject.isEventRemindersNotificationOn;
    const isChangesNotificationOn = responseObject.isChangesNotificationOn;
    const isSomeoneJoinedNotificationOn =
      responseObject.isSomeoneJoinedNotificationOn;
    const isFoodieAcceptedInviteNotificationOn =
      responseObject.isFoodieAcceptedInviteNotificationOn;
    const isAnnouncementNotificationOn =
      responseObject.isAnnouncementNotificationOn;
    const defaultCard = PaymentCard.fromJson(responseObject.defaultCard);
    const paymentCards: PaymentCard[] = [];
    for (const card of responseObject.paymentCards) {
      paymentCards.push(PaymentCard.fromJson(card));
    }
    const paymentRecords: PaymentRecord[] = [];
    for (const record of responseObject.paymentRecords) {
      paymentRecords.push(PaymentRecord.fromJson(record));
    }
    this._model = new LocalSettingsPageModel(linkedSocialAccounts, password,
      isNewEventsNotificationOn, isEventJoinedNotificationOn,
      isEventRemindersNotificationOn, isChangesNotificationOn,
      isSomeoneJoinedNotificationOn, isFoodieAcceptedInviteNotificationOn,
      isAnnouncementNotificationOn, defaultCard, paymentCards, paymentRecords);
    this._model.load();
  }

  public get linkedSocialAccounts(): SocialAccount[] {
    return this._model.linkedSocialAccounts;
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
      year: number, securityCode: number, zipcode: string, creditCardType:
      CreditCardType): Promise<PaymentCard> {
    const response = await fetch('/api/add_payment_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'cardNumber': cardNumber,
        'nameOnCard': nameOnCard,
        'month': month,
        'year': year,
        'securityCode': securityCode,
        'zipcode': zipcode,
        'creditCardType': creditCardType
      })
    });
    if (response.status === 201) {
      const responseObject = await response.json();
      return PaymentCard.fromJson(responseObject.paymentCard);
    }
    return PaymentCard.noCard();
  }

  public async updateCard(newCard: PaymentCard, isMarkedAsDefault: boolean
      ): Promise<PaymentCard> {
    const response = await fetch('/api/update_payment_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'newCard': newCard.toJson(),
        'isMarkedAsDefault': isMarkedAsDefault
      })
    });
    if (response.status === 201 || response.status === 200) {
      const responseObject = await response.json();
      return PaymentCard.fromJson(responseObject.paymentCard);
    }
    return PaymentCard.noCard();
  }

  public async deleteCard(cardId: number): Promise<boolean> {
    const response = await fetch('/api/delete_payment_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'cardId': cardId
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  // Notification tab related methods
  public async toggleNewEventsNotification(): Promise<boolean> {
    const response = await fetch('/api/toggle_new_events_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async toggleEventJoinedNotification(): Promise<boolean> {
    const response = await fetch('/api/toggle_event_joined_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async toggleEventRemindersNotification(): Promise<boolean> {
    const response = await fetch('/api/toggle_event_reminders_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async toggleChangesNotification(): Promise<boolean> {
    const response = await fetch('/api/toggle_changes_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async toggleSomeoneJoinedNotification(): Promise<boolean> {
    const response = await fetch('/api/toggle_someone_joined_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async toggleFoodieAcceptedInviteNotification(): Promise<boolean> {
    const response = await fetch(
        '/api/toggle_foodie_accepted_invite_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async toggleAnnouncementNotification(): Promise<boolean> {
    const response = await fetch('/api/toggle_announcement_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async emailReceipt(paymentRecord: PaymentRecord): Promise<boolean> {
    const response = await fetch('/api/send_email_receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'paymentRecord': paymentRecord.toJson()
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async SubmitHelpEmail(receiptId: number, message: string): Promise<
      boolean> {
    const response = await fetch('/api/submit_help_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'receiptId': receiptId,
        'message': message
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  public async deleteAccount(password: string): Promise<User> {
    const response = await fetch('/api/delete_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      const responseObject = await response.json();
      return User.fromJson(responseObject.account);
    }
    return User.makeGuest();
  }

  public async deactivateAccount(): Promise<boolean> {
    const response = await fetch('/api/deactivate_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }

  private _model: SettingsPageModel;
  private _account: User;
}
