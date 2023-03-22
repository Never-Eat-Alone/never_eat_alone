CREATE TABLE IF NOT EXISTS user_profile_images (
  id            SERIAL       PRIMARY KEY,
  user_id       INTEGER      NOT NULL,
  src           TEXT         NOT NULL,
  created_at    TIMESTAMP                      DEFAULT NOW(),
  updated_at    TIMESTAMP                      DEFAULT NOW()
);

ALTER TABLE user_profile_images
  ADD CONSTRAINT fk_user_profile_images_users
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO user_profile_images (
  user_id,
  src
) VALUES
(1, '/resources/images/profile1.jpeg'),
(2, '/resources/images/profile2.jpeg'),
(3, '/resources/images/profile3.jpeg'),
(4, '/resources/images/profile4.jpeg'),
(5, '/resources/images/profileguy5.jpeg'),
(6, '/resources/images/profile6.jpeg'),
(7, '/resources/images/profile7.jpeg'),
(8, '/resources/images/profile8.jpeg'),
(9, '/resources/images/profile9.jpeg'),
(10, '/resources/images/profileguy10.jpeg'),
(11, '/resources/images/profileguy1.jpeg');
