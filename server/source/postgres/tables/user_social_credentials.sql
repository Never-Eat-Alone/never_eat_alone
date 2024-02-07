CREATE TABLE IF NOT EXISTS user_social_credentials (
  user_id         INTEGER                        NOT NULL                 ,
  provider        social_account_type_enum       NOT NULL                 ,
  access_token    VARCHAR(255)                   NOT NULL                 ,
  token_expiry    TIMESTAMP WITH TIME ZONE                                ,
  email           VARCHAR(255)                   NOT NULL                 ,
  updated_at      TIMESTAMP WITH TIME ZONE       DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, provider, email),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
