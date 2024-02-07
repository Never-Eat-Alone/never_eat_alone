CREATE TABLE IF NOT EXISTS user_notification_settings (
  user_id          INTEGER                        NOT NULL PRIMARY KEY     ,
  is_new_events_notification_on       BOOLEAN     DEFAULT TRUE             ,
  is_event_joined_notification_on     BOOLEAN     DEFAULT TRUE             ,
  is_event_reminders_notification_on  BOOLEAN     DEFAULT TRUE             ,
  is_changes_notification_on          BOOLEAN     DEFAULT TRUE             ,
  is_someone_joined_notification_on   BOOLEAN     DEFAULT TRUE             ,
  is_foodie_accepted_invite_notification_on BOOLEAN     DEFAULT TRUE       ,
  is_announcement_notification_on     BOOLEAN           DEFAULT TRUE       ,
  created_at       TIMESTAMP WITHOUT TIME ZONE    DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at       TIMESTAMP WITHOUT TIME ZONE    DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_notification_settings_user_id ON user_notification_settings(user_id);

-- Trigger to update the updated_at column on row updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP AT TIME ZONE 'UTC';
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER user_notification_settings_updated_at_modtime
BEFORE UPDATE ON user_notification_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
