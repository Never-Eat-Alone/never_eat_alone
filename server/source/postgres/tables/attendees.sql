CREATE TABLE IF NOT EXISTS attendees (
  user_id           INTEGER              NOT NULL                 ,
  event_id          INTEGER              NOT NULL                 ,
  name              VARCHAR(255)         NOT NULL                 ,
  guest_count       INTEGER                          DEFAULT 0    ,
  status            attendee_status_enum NOT NULL                 ,
  profile_image_src TEXT                                          ,
  updated_at        TIMESTAMP NOT NULL               DEFAULT NOW(),
  PRIMARY KEY (user_id , event_id)
);

ALTER TABLE attendees
  ADD CONSTRAINT fk_attendees_users
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE attendees
  ADD CONSTRAINT fk_attendees_dining_events
  FOREIGN KEY (event_id)
  REFERENCES dining_events (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO attendees (
  user_id,
  event_id,
  name,
  guest_count,
  status,
  profile_image_src
)
VALUES
  (16, 1, 'Rob Smith', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (16, 14, 'Rob Smith', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (16, 3, 'Rob Smith', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (16, 10, 'Rob Smith', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (10, 1, 'John', 2, 'GOING', '/resources/images/profileguy10.jpeg'),
  (10, 7, 'John', 0, 'GOING', '/resources/images/profileguy10.jpeg'),
  (10, 8, 'John', 0, 'GOING', '/resources/images/profileguy10.jpeg'),
  (10, 12, 'John', 0, 'GOING', '/resources/images/profileguy10.jpeg'),
  (3, 1, 'Alexa', 0, 'NOT_GOING', '/resources/images/profile3.jpeg'),
  (4, 1, 'Elena', 1, 'GOING', '/resources/images/profile4.jpeg'),
  (5, 1, 'Mike', 0, 'GOING', '/resources/images/profileguy5.jpeg'),
  (11, 2, 'Ken', 1, 'NOT_GOING', '/resources/images/profileguy1.jpeg'),
  (11, 17, 'Ken', 0, 'GOING', '/resources/images/profileguy1.jpeg'),
  (11, 5, 'Ken', 1, 'NO_SHOW', '/resources/images/profileguy1.jpeg'),
  (6, 3, 4, 'GOING', '/resources/images/profile6.jpeg'),
  (6, 2, 0, 'GOING', '/resources/images/profile6.jpeg'),
  (6, 2, 'Sofia', 0, 'GOING', '/resources/images/profile6.jpeg'),
  (6, 4, 'Sofia', 0, 'GOING', '/resources/images/profile6.jpeg'),
  (6, 8, 'Sofia', 0, 'GOING', '/resources/images/profile6.jpeg'),
  (18, 4, 'Anna', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-6.svg'),
  (18, 15, 'Anna', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-6.svg'),
  (8, 4, 'Sara', 0, 'GOING', '/resources/images/profile8.jpeg'),
  (8, 10, 'Sara', 0, 'GOING', '/resources/images/profile8.jpeg'),
  (7, 5, 'Alexa', 0, 'WAITLIST', '/resources/images/profile7.jpeg'),
  (19, 5, 'Alexandra Richardson', 1, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-7.svg'),
  (19, 11, 'Alexandra Richardson', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-7.svg'),
  (14, 5, 'Mary Miller', 2, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-2.svg'),
  (14, 1, 'Mary Miller', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-2.svg'),
  (9, 6, 'Lena', 0, 'GOING', '/resources/images/profile9.jpeg'),
  (9, 7, 'Lena', 0, 'GOING', '/resources/images/profile9.jpeg'),
  (9, 9, 'Lena', 0, 'GOING', '/resources/images/profile9.jpeg'),
  (12, 9, 'Maria', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 11, 'Maria', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 5, 'Maria', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 6, 'Maria', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 18, 'Maria', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (15, 12, 'Jess', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-3.svg'),
  (15, 13, 'Jess', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-3.svg'),
  (17, 16, 'Bobby MacDonald', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-5.svg'),
  (13, 4, 'Anna', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-1.svg'),
  (13, 3, 'Anna', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-1.svg'),
  (13, 19, 'Anna', 0, 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-1.svg'
  );
