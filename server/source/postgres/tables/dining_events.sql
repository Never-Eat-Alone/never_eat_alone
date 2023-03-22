CREATE TABLE IF NOT EXISTS dining_events (
  id            SERIAL       PRIMARY KEY,
  title         
  created_at    TIMESTAMP                      DEFAULT NOW(),
  updated_at    TIMESTAMP                      DEFAULT NOW()
);

INSERT INTO dining_events (
  title,
  created_at,
  updated_at
) VALUES
('', '2020-01-02 10:35'),
('', '2021-01-02 10:35'),
('', '2022-01-02 10:35'),
('', '2022-01-03 10:35'),
('', '2020-01-02 10:36'),
('', '2022-02-02 10:35'),
('', '2023-01-02 9:35'),
('', '2023-01-05 10:35'),
('', '2023-01-06 11:35'),
('', '2023-01-07 11:36'),
('', '2021-01-01 10:35'
);
