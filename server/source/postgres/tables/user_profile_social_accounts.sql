CREATE TABLE IF NOT EXISTS user_profile_social_accounts (
  id         SERIAL                    PRIMARY KEY,
  user_id    INTEGER                   NOT NULL,
  platform   social_account_type_enum  NOT NULL,
  link       VARCHAR(255)              NOT NULL,
  is_private BOOLEAN                   DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  UNIQUE(user_id, platform)
);

INSERT INTO user_profile_social_accounts (
  user_id,
  platform,
  link,
  is_private
) VALUES
(1, 'FACEBOOK', 'https://www.facebook.com/google', true),
(2, 'INSTAGRAM', 'https://www.instagram.com/google', false),
(3, 'INSTAGRAM', 'https://www.instagram.com/apple', true),
(4, 'TWITTER', 'https://twitter.com/microsoft', true),
(5, 'FACEBOOK', 'https://www.facebook.com/amazon', true),
(5, 'INSTAGRAM', 'https://www.instagram.com/amazon', true),
(5, 'TWITTER', 'https://www.twitter.com/amazon', true),
(6, 'INSTAGRAM', 'https://instagram.com/+Amazon', false),
(7, 'INSTAGRAM', 'https://www.instagram.com/microsoft', false),
(8, 'TWITTER', 'https://twitter.com/apple', true),
(9, 'FACEBOOK', 'https://www.facebook.com/microsoft', true),
(10, 'INSTAGRAM', 'https://instagram.com/microsoft', true),
(11, 'INSTAGRAM', 'https://www.instagram.com/airbnb', true),
(12, 'TWITTER', 'https://twitter.com/amazon', true),
(13, 'FACEBOOK', 'https://www.facebook.com/apple', true),
(14, 'FACEBOOK', 'https://facebook.com/apple', true),
(15, 'INSTAGRAM', 'https://www.instagram.com/amazon', true),
(16, 'TWITTER', 'https://twitter.com/google', false),
(17, 'FACEBOOK', 'https://www.facebook.com/twitter', true),
(18, 'TWITTER', 'https://twitter.com/twitter', false),
(19, 'INSTAGRAM', 'https://www.instagram.com/twitter', false),
(20, 'TWITTER', 'https://twitter.com/instagram', false),
(21, 'FACEBOOK', 'https://www.facebook.com/instagram', true
);
