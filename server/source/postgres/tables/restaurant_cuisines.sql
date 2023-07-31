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
(38, ),

