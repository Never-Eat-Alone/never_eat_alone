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
  (1, 'FACEBOOK', 'https://www.facebook.com/google'),
  (2, 'INSTAGRAM', 'https://www.instagram.com/google'),
  (3, 'INSTAGRAM', 'https://www.instagram.com/apple'),
  (4, 'TWITTER', 'https://twitter.com/microsoft'),
  (5, 'FACEBOOK', 'https://www.facebook.com/amazon'),
  (6, 'INSTAGRAM', 'https://instagram.com/+Amazon'),
  (7, 'INSTAGRAM', 'https://www.instagram.com/microsoft'),
  (8, 'TWITTER', 'https://twitter.com/apple'),
  (9, 'FACEBOOK', 'https://www.facebook.com/microsoft'),
  (10, 'INSTAGRAM', 'https://instagram.com/microsoft'),
  (11, 'INSTAGRAM', 'https://www.instagram.com/airbnb'),
  (12, 'TWITTER', 'https://twitter.com/amazon'),
  (13, 'FACEBOOK', 'https://www.facebook.com/apple'),
  (14, 'FACEBOOK', 'https://facebook.com/apple'),
  (15, 'INSTAGRAM', 'https://www.instagram.com/amazon'),
  (16, 'TWITTER', 'https://twitter.com/google'),
  (17, 'FACEBOOK', 'https://www.facebook.com/twitter'),
  (18, 'TWITTER', 'https://twitter.com/twitter'),
  (19, 'INSTAGRAM', 'https://www.instagram.com/twitter'),
  (20, 'TWITTER', 'https://twitter.com/instagram'),
  (21, 'FACEBOOK', 'https://www.facebook.com/instagram');
