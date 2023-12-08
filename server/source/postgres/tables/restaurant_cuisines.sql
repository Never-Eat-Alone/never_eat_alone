CREATE TABLE IF NOT EXISTS restaurant_cuisines (
  restaurant_id INTEGER NOT NULL,
  cuisine_id    INTEGER NOT NULL,
  PRIMARY KEY (restaurant_id, cuisine_id)
);

ALTER TABLE restaurant_cuisines
  ADD CONSTRAINT fk_restaurant_cuisines_cuisines
  FOREIGN KEY (cuisine_id)
  REFERENCES cuisines (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE restaurant_cuisines
  ADD CONSTRAINT fk_restaurant_cuisines_restaurants
  FOREIGN KEY (restaurant_id)
  REFERENCES restaurants (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO restaurant_cuisines (
  restaurant_id,
  cuisine_id
)
VALUES
(40, 1),
(40, 2),
(40, 3),
(39, 4),
(38, 2),
(38, 5),
(38, 6),
(38, 7),
(38, 8),
(37, 1),
(37, 9),
(36, 10),
(36, 11),
(35, 10),
(35, 6),
(35, 7),
(35, 8),
(34, 11),
(34, 1),
(34, 12),
(33, 9),
(32, 12),
(32, 13),
(31, 14),
(31, 15),
(30, 16),
(29, 14),
(29, 2),
(28, 14),
(28, 18),
(20, 14),
(20, 11);
