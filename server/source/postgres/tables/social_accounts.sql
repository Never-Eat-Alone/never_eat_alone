CREATE TABLE IF NOT EXISTS social_accounts (
  id                SERIAL         PRIMARY KEY,
  user_id           INTEGER        NOT NULL,
  provider          VARCHAR(255)   NOT NULL,
  provider_user_id  VARCHAR(255)   NOT NULL,
  access_token      VARCHAR(255)   NOT NULL,
  refresh_token     VARCHAR(255),
  token_expiry      TIMESTAMP
);

ALTER TABLE social_accounts
  ADD CONSTRAINT fk_social_accounts_users
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO social_accounts (
  user_id,
  provider,
  provider_user_id,
  access_token,
  refresh_token,
  token_expiry
) VALUES
(5, 'google', '1a', '115752112592661828220', '115752112592661828220r',
  '1799902800000'),
(5, 'facebook', '2c', '115752112592661828221', '115752112592661828220r',
  '1768366800000'),
(6, 'google', '2a', '106113142816146188846', '115752112592661828220r',
  '1763096400000'),
(7, 'google', '3a', '116946907435204765428', '115752112592661828220r',
  '1763096400000'),
(1, 'google', '4a', '109290310120720085227', '115752112592661828220r',
  '1763096400000');
