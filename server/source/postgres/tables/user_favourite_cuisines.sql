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
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20),
(21, 21),
(1, 22),
(2, 23),
(3, 24),
(4, 25),
(5, 26),
(6, 27),
(7, 28),
(8, 29),
(9, 30),
(10, 31),
(11, 32),
(12, 33),
(13, 34),
(14, 35),
(15, 22),
(16, 23),
(17, 24),
(18, 25),
(19, 26),
(20, 27),
(21, 28
);
