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
(1, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(2, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(3, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(4, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(5, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(6, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(7, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(8, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(9, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(10, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(11, '/resources/profile_page/images/userProfile.pattern.1-desktop.png'),
(12, '/resources/profile_page/images/userProfile.pattern.3-desktop.png'),
(13, '/resources/profile_page/images/userProfile.pattern.2-desktop.png'),
(14, '/resources/profile_page/images/userProfile.pattern.3-desktop.png'),
(15, '/resources/profile_page/images/userProfile.pattern.4-desktop.png'),
(16, '/resources/profile_page/images/userProfile.pattern.5-desktop.png'),
(17, '/resources/profile_page/images/userProfile.pattern.3-desktop.png'),
(18, '/resources/profile_page/images/userProfile.pattern.2-desktop.png'),
(19, '/resources/profile_page/images/userProfile.pattern.4-desktop.png'),
(20, '/resources/profile_page/images/userProfile.pattern.2-desktop.png'),
(21, '/resources/profile_page/images/userProfile.pattern.2-desktop.png');
