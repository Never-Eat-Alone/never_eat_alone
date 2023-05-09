CREATE TABLE IF NOT EXISTS user_sessions (
    sid         VARCHAR       NOT NULL COLLATE "default",
    user_id     INTEGER       NOT NULL,
    sess        JSON          NOT NULL,
    expire      TIMESTAMP(6)  NOT NULL
)
WITH(OIDS=FALSE);

ALTER TABLE user_sessions
    ADD CONSTRAINT session_pkey
        PRIMARY KEY (sid)
NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE user_sessions
    ADD CONSTRAINT fk_user_sessions_users
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE user_sessions
  ADD CONSTRAINT uq_user_sessions_user_id_sid UNIQUE (user_id, sid);

CREATE INDEX IDX_session_expire ON user_sessions ("expire");
