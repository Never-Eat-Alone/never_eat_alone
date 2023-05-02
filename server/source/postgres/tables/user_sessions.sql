CREATE TABLE IF NOT EXISTS user_sessions (
    sid         VARCHAR       NOT NULL COLLATE "default",
    user_id     INTEGER       ,
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

CREATE INDEX IDX_session_expire ON user_sessions ("expire");
