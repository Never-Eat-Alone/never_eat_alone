CREATE TABLE IF NOT EXISTS stripe_products (
  event_id INTEGER NOT NULL,
  stripe_price_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (event_id, stripe_price_id),
  FOREIGN KEY (event_id) REFERENCES dining_events(id) ON DELETE CASCADE
);

INSERT INTO stripe_products (
  event_id,
  stripe_price_id
)
VALUES
(29, 'price_1OCnRXKaHeyRq5c0CtEoQUoD'),
(20, 'price_1OIeV5KaHeyRq5c0EDfwCASU'),
(30, 'price_1OIeWeKaHeyRq5c0i3q4EYpD');
