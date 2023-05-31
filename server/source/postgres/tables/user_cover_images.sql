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
(12, '/resources/profile_page/images/default_banner_3.png'),
(13, '/resources/profile_page/images/default_banner_2.png'),
(14, '/resources/profile_page/images/default_banner_3.png'),
(15, '/resources/profile_page/images/default_banner_4.png'),
(16, '/resources/profile_page/images/default_banner_5.png'),
(17, '/resources/profile_page/images/default_banner_3.png'),
(18, '/resources/profile_page/images/default_banner_2.png'),
(19, '/resources/profile_page/images/default_banner_4.png'),
(20, '/resources/profile_page/images/default_banner_2.png'),
(21, '/resources/profile_page/images/default_banner_2.png'),
(22, '/resources/profile_page/images/default_banner_2.png'),
(23, '/resources/profile_page/images/default_banner_3.png'),
(24, '/resources/profile_page/images/default_banner_3.png'),
(25, '/resources/profile_page/images/default_banner_3.png'),
(26, '/resources/profile_page/images/default_banner_4.png'),
(27, '/resources/profile_page/images/default_banner_4.png'),
(28, '/resources/profile_page/images/default_banner_4.png'),
(29, '/resources/profile_page/images/default_banner_5.png'),
(30, '/resources/profile_page/images/default_banner_5.png'),
(31, '/resources/profile_page/images/default_banner_4.png'),
(32, '/resources/profile_page/images/default_banner_2.png'),
(33, '/resources/profile_page/images/default_banner_3.png'),
(34, '/resources/profile_page/images/default_banner_4.png'),
(35, '/resources/profile_page/images/default_banner_5.png'),
(36, '/resources/profile_page/images/default_banner_2.png'),
(37, '/resources/profile_page/images/default_banner_1.png'),
(38, '/resources/profile_page/images/default_banner_1.png'),
(39, '/resources/profile_page/images/default_banner_2.png'),
(40, '/resources/profile_page/images/default_banner_3.png'),
(41, '/resources/profile_page/images/default_banner_3.png'),
(42, '/resources/profile_page/images/default_banner_5.png'),
(43, '/resources/profile_page/images/default_banner_5.png'),
(44, '/resources/profile_page/images/default_banner_5.png'),
(45, '/resources/profile_page/images/default_banner_1.png'),
(46, '/resources/profile_page/images/default_banner_2.png'),
(47, '/resources/profile_page/images/default_banner_3.png');
