CREATE TABLE IF NOT EXISTS user_profile_social_accounts (
  id         SERIAL                    PRIMARY KEY,
  user_id    INTEGER                   NOT NULL,
  platform   social_account_type_enum  NOT NULL,
  link       VARCHAR(255)              NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO user_profile_images (
  user_id,
  platform,
  link
) VALUES
  (1, 'FACEBOOK'),
  (1, 'GOOGLE'),
  (1, 'INSTAGRAM'),
  (1, 'TWITTER');
