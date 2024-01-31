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

    if (!result.rows.length) {
      await this.pool.query(`
        INSERT INTO user_notification_settings 
        (user_id, new_events, event_joined, event_reminders,
        change_to_events_attending, someone_joins_events_attending,
        foodie_accepts_your_invite, announcement)
        VALUES ($1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)`, [userId]);
      return new NotificationSettings(userId, true, true, true, true, true,
        true, true);
    }
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

  /** The postgress pool connection. */
  private pool: Pool;
}
