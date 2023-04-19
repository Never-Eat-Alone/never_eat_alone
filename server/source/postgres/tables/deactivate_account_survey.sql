CREATE TABLE deactivate_account_survey (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  question_1 BOOLEAN,
  question_2 BOOLEAN,
  question_3 BOOLEAN,
  question_4 BOOLEAN,
  question_5 BOOLEAN,
  question_6 BOOLEAN,
  message    TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
