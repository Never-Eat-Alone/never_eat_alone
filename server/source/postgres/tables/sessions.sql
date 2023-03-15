CREATE TABLE IF NOT EXISTS sessions (
  sid     TEXT    PRIMARY KEY,
  user_id INTEGER
);

INSERT INTO sessions
(
  sid,
  user_id
)
VALUES
('a97f6205-4691-4b85-a990-49b3bdc1e4c6', 1),
('ecb87340-8745-49c9-a55e-663d243f1b93', 2),
('302bd0fd-e701-4022-8bce-ce7a94cf8d20', 6);
