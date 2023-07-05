export class NotificationSettings {
  public static fromJson(value: any): NotificationSettings {
    return new NotificationSettings(
      value.isNewEventsNotificationOn,
      value.isEventJoinedNotificationOn,
      value.isEventRemindersNotificationOn,
      value.isChangesNotificationOn,
      value.isSomeoneJoinedNotificationOn,
      value.isFoodieAcceptedInviteNotificationOn,
      value.isAnnouncementNotificationOn);
  }

  constructor(isNewEventsNotificationOn: boolean, isEventJoinedNotificationOn:
      boolean, isEventRemindersNotificationOn: boolean, isChangesNotificationOn:
      boolean, isSomeoneJoinedNotificationOn: boolean,
      isFoodieAcceptedInviteNotificationOn: boolean,
      isAnnouncementNotificationOn: boolean) {
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
    return this._settings;
  }

  private _settings: { [key: string]: boolean };
}
