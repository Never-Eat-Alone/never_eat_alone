export class NotificationSettings {
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

  private _settings: { [key: string]: boolean };
}
