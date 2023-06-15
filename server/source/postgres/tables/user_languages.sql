CREATE TABLE IF NOT EXISTS user_languages (
  user_id      INTEGER NOT NULL,
  language_id  INTEGER NOT NULL,
  PRIMARY KEY  (user_id, language_id),
  FOREIGN KEY  (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY  (language_id) REFERENCES languages (id) ON DELETE CASCADE
);

INSERT INTO user_languages (
  user_id,
  language_id
) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 1),
(6, 4),
(7, 2),
(8, 1),
(9, 3),
(10, 1),
(11, 5),
(12, 6),
(13, 1),
(14, 2),
(15, 3),
(16, 1),
(17, 4),
(18, 2),
(19, 1),
(19, 3),
(20, 2),
(20, 5),
(21, 1),
(21, 4
);
