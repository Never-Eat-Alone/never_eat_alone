CREATE TABLE IF NOT EXISTS social_media_images (
  id            SERIAL       PRIMARY KEY,
  src           TEXT         NOT NULL,
  created_at    TIMESTAMP                      DEFAULT NOW(),
  updated_at    TIMESTAMP                      DEFAULT NOW()
);

INSERT INTO social_media_images (
  src,
  created_at
) VALUES
('/resources/images/1.jpg', '2020-01-02 10:35'),
('/resources/images/2.jpg', '2021-01-02 10:35'),
('/resources/images/3.jpg', '2022-01-02 10:35'),
('/resources/images/4.jpg', '2022-01-03 10:35'),
('/resources/images/5.jpg', '2020-01-02 10:36'),
('/resources/images/6.jpg', '2022-02-02 10:35'),
('/resources/images/7.jpg', '2023-01-02 9:35'),
('/resources/images/8.jpg', '2023-01-05 10:35'),
('/resources/images/9.jpg', '2023-01-06 11:35'),
('/resources/images/10.jpg', '2023-01-07 11:36'),
('/resources/images/11.jpg', '2021-01-01 10:35'
);
