import { Pool } from 'pg';
import { NotificationSettings } from
  '../../../../client/library/source/definitions';

export class UserNotificationSettingsDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns the user linked social credentials based on the user id.
   * @param userId - User id.
   */
  public loadUserNotificationSettingsByUserId = async (userId: number):
      Promise<NotificationSettings> => {
    let userNotificationSettings: NotificationSettings;
    const result = await this.pool.query(`
      SELECT *
      FROM user_notification_settings
      WHERE user_id = $1`, [userId]);
    if (result.rows.length > 0) {
      const row = result.rows[0];
      return new NotificationSettings(
        row.user_id,
        row.new_events,
        row.event_joined,
        row.event_reminders,
        row.change_to_events_attending,
        row.someone_joins_events_attending,
        row.foodie_accepts_your_invite,
        row.announcement
      );
    }
    return null;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
