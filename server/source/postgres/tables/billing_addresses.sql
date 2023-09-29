CREATE TABLE IF NOT EXISTS billing_addresses (
  address_id      SERIAL                         PRIMARY KEY,
  user_id         INTEGER                        REFERENCES users(id),
  address_line_1  TEXT                           NOT NULL,
  address_line_2  TEXT,
  city            TEXT                           NOT NULL,
  state_province  TEXT                           NOT NULL,
  postal_code     TEXT                           NOT NULL,
  country         TEXT                           NOT NULL,
  is_default      BOOLEAN                        DEFAULT FALSE
);
