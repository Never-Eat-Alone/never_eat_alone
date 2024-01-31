CREATE TABLE IF NOT EXISTS user_notification_settings (
  user_id          INTEGER                        NOT NULL PRIMARY KEY     ,
  new_events       BOOLEAN                        DEFAULT TRUE             ,
  event_joined     BOOLEAN                        DEFAULT TRUE             ,
  event_reminders  BOOLEAN                        DEFAULT TRUE             ,
  change_to_events_attending  BOOLEAN             DEFAULT TRUE             ,
  someone_joins_events_attending BOOLEAN          DEFAULT TRUE             ,
  foodie_accepts_your_invite BOOLEAN              DEFAULT TRUE             ,
  announcement     BOOLEAN                        DEFAULT TRUE             ,
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
