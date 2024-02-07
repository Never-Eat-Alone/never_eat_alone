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
          (user_id, is_new_events_notification_on,
          is_event_joined_notification_on, is_event_reminders_notification_on,
          is_changes_notification_on, is_someone_joined_notification_on,
          is_foodie_accepted_invite_notification_on,
          is_announcement_notification_on)
        VALUES ($1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)`, [userId]);
      return new NotificationSettings(userId, true, true, true, true, true,
        true, true);
    }
    const row = result.rows[0];
    return new NotificationSettings(
      row.user_id,
      row.is_new_events_notification_on,
      row.is_event_joined_notification_on,
      row.is_event_reminders_notification_on,
      row.is_changes_notification_on,
      row.is_someone_joined_notification_on,
      row.is_foodie_accepted_invite_notification_on,
      row.is_announcement_notification_on
    );
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
