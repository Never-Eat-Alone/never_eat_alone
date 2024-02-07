export class NotificationSettings {
  public static fromJson(value: any): NotificationSettings {
    return new NotificationSettings(
      value.userId,
      value.isNewEventsNotificationOn,
      value.isEventJoinedNotificationOn,
      value.isEventRemindersNotificationOn,
      value.isChangesNotificationOn,
      value.isSomeoneJoinedNotificationOn,
      value.isFoodieAcceptedInviteNotificationOn,
      value.isAnnouncementNotificationOn);
  }

  constructor(userId: number, isNewEventsNotificationOn: boolean,
      isEventJoinedNotificationOn: boolean, isEventRemindersNotificationOn:
      boolean, isChangesNotificationOn: boolean, isSomeoneJoinedNotificationOn:
      boolean, isFoodieAcceptedInviteNotificationOn: boolean,
      isAnnouncementNotificationOn: boolean) {
    this._userId = userId;
    this._settings = {
      isNewEventsNotificationOn,
      isEventJoinedNotificationOn,
      isEventRemindersNotificationOn,
      isChangesNotificationOn,
      isSomeoneJoinedNotificationOn,
      isFoodieAcceptedInviteNotificationOn,
      isAnnouncementNotificationOn
    };
  }

  public get userId(): number {
    return this._userId;
  }

  public getSetting(setting: string): boolean {
    return this._settings[setting];
  }

  public toggleSetting(setting: string): void {
    if (this._settings.hasOwnProperty(setting)) {
      this._settings[setting] = !this._settings[setting];
    } else {
      throw new Error(`Invalid setting: ${setting}`);
    }
  }

  public toJson(): any {
    return { ...this._settings, userId: this.userId };
  }

  private _userId: number;
  private _settings: { [key: string]: boolean };
}
