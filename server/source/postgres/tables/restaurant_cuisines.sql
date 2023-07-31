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
(1, 38),
(2, 5),
(3, 57),
(4, 38),
(5, 89),
(6, 55),
(7, 74),
(8, 54),
(9, 5),
(10, 5),
(11, 54),
(1, 3),
(2, 15),
(3, 50),
(4, 11),
(5, 9),
(6, 54),
(7, 70),
(8, 1),
(9, 41),
(10, 20),
(11, 19),
(12, 1),
(12, 27),
(12, 16),
(2, 14),
(3, 14),
(4, 13),
(12, 2),
(12, 6),
(12, 40),
(12, 42),
(34, 120);
