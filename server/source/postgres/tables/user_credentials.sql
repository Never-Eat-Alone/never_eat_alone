CREATE TABLE IF NOT EXISTS user_credentials (
  user_id     INTEGER PRIMARY KEY,
  hashed_pass TEXT    NOT NULL
);

INSERT INTO user_credentials (
  user_id,
  hashed_pass
) VALUES
(1, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(2, '6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918'),
(3, '3fdba35f04dc8c462986c992bcf875546257113072a909c162f7e470e581e278'),
(4, '8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61'),
(5, 'e629fa6598d732768f7c726b4b621285f9c3b85303900aa912017db7617d8bdb'
);
