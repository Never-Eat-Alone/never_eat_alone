CREATE TABLE IF NOT EXISTS user_cover_images (
  user_id       INTEGER                        NOT NULL UNIQUE,
  src           TEXT                           NOT NULL,
  created_at    TIMESTAMP                      DEFAULT NOW(),
  updated_at    TIMESTAMP                      DEFAULT NOW()
);

ALTER TABLE user_cover_images
  ADD CONSTRAINT fk_user_cover_images_users
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO user_cover_images (
  user_id,
  src
) VALUES
(1, '/resources/profile_page/images/default_banner_1.png'),
(2, '/resources/profile_page/images/default_banner_1.png'),
(3, '/resources/profile_page/images/default_banner_1.png'),
(4, '/resources/profile_page/images/default_banner_1.png'),
(5, '/resources/profile_page/images/default_banner_1.png'),
(6, '/resources/profile_page/images/default_banner_1.png'),
(7, '/resources/profile_page/images/default_banner_1.png'),
(8, '/resources/profile_page/images/default_banner_1.png'),
(9, '/resources/profile_page/images/default_banner_1.png'),
(10, '/resources/profile_page/images/default_banner_1.png'),
(11, '/resources/profile_page/images/default_banner_1.png'),
(12, '/resources/profile_page/images/default_banner_3.jpg'),
(13, '/resources/profile_page/images/default_banner_2.png'),
(14, '/resources/profile_page/images/default_banner_3.jpg'),
(15, '/resources/profile_page/images/default_banner_4.jpg'),
(16, '/resources/profile_page/images/default_banner_5.jpg'),
(17, '/resources/profile_page/images/default_banner_3.jpg'),
(18, '/resources/profile_page/images/default_banner_2.png'),
(19, '/resources/profile_page/images/default_banner_4.jpg'),
(20, '/resources/profile_page/images/default_banner_2.png'),
(21, '/resources/profile_page/images/default_banner_2.png'
);
