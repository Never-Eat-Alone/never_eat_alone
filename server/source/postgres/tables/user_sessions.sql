CREATE TABLE IF NOT EXISTS user_sessions (
    sid         VARCHAR                       NOT NULL COLLATE "default",
    sess        JSON                          NOT NULL                  ,
    expire      TIMESTAMP(6) WITH TIME ZONE   NOT NULL                  
)
WITH(OIDS=FALSE);

ALTER TABLE user_sessions
    ADD CONSTRAINT session_pkey
        PRIMARY KEY (sid)
NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expire ON user_sessions ("expire");
