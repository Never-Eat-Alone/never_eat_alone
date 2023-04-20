CREATE TABLE IF NOT EXISTS user_credentials (
  user_id     INTEGER PRIMARY KEY,
  hashed_pass TEXT    NOT NULL
);

ALTER TABLE user_credentials
  ADD CONSTRAINT fk_user_credentials_users
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO user_credentials (
  user_id,
  hashed_pass
) VALUES
(1, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(2, '6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918'),
(3, '3fdba35f04dc8c462986c992bcf875546257113072a909c162f7e470e581e278'),
(4, '8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61'),
(5, 'e04d7b9a9a1a1a2ffea2cf6b11d6de8a6cda4f4e17a73c9ac9d3b3c31a3f1e48'),
(21, '383ca7e9b3f3e8d22b4eb29b7ce4d1ad64ec7c02f939daa6c9f6d5f6b5d6b5f2'
);
