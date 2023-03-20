CREATE TABLE IF NOT EXISTS user_confirmation_tokens (
  token_id   VARCHAR   PRIMARY KEY,
  expires_at TIMESTAMP NOT NULL,
  user_id    INTEGER   NOT NULL
);

ALTER TABLE user_confirmation_tokens
  ADD CONSTRAINT fk_user_confirmation_tokens_users
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO user_confirmation_tokens (
  token_id,
  expires_at,
  user_id
) VALUES
('4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8',
  '2021-01-14 10:35', 1),
('6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918',
  '2021-01-15 12:55', 2),
('3fdba35f04dc8c462986c992bcf875546257113072a909c162f7e470e581e278',
  '2021-02-14 12:01:28', 3),
('8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61',
  '2020-02-14 12:35:22', 4),
('e629fa6598d732768f7c726b4b621285f9c3b85303900aa912017db7617d8bdb',
  '2021-01-10 12:35', 5
);
