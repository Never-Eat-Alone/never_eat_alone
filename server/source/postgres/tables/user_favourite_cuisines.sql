CREATE TABLE IF NOT EXISTS user_favourite_cuisines (
  user_id       INTEGER                        NOT NULL,
  cuisine_id    INTEGER                        NOT NULL,
  PRIMARY KEY (user_id, cuisine_id),
  FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (cuisine_id)
    REFERENCES cuisines (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO user_favourite_cuisines (
  user_id,
  cuisine_id
) VALUES
(1, 1),
(1, 2),
(1, 13),
(1, 17),
(2, 2),
(2, 3),
(2, 10),
(3, 3),
(3, 4),
(4, 4),
(4, 5),
(5, 5),
(5, 17),
(5, 1),
(5, 13),
(5, 18),
(5, 6),
(6, 7),
(6, 6),
(7, 7),
(7, 8),
(8, 9),
(8, 8),
(9, 3),
(9, 9),
(10, 10),
(10, 3),
(11, 2),
(11, 11),
(12, 12),
(12, 3),
(13, 4),
(13, 13),
(14, 14),
(14, 5),
(15, 12),
(15, 15),
(16, 16),
(16, 13),
(17, 14),
(17, 17),
(18, 18),
(18, 15),
(19, 16),
(19, 9),
(20, 2),
(20, 17),
(21, 1),
(21, 18);
