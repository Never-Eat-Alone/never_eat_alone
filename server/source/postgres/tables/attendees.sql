CREATE TABLE IF NOT EXISTS attendees (
  user_id           INTEGER              NOT NULL                 ,
  event_id          INTEGER              NOT NULL                 ,
  name              VARCHAR(255)         NOT NULL                 ,
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
  status,
  profile_image_src
)
VALUES
  (16, 1, 'Rob Smith', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (16, 14, 'Rob Smith', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (16, 3, 'Rob Smith', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (16, 10, 'Rob Smith', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-4.svg'),
  (10, 1, 'John', 'GOING', '/resources/images/profileguy10.jpeg'),
  (10, 7, 'John', 'GOING', '/resources/images/profileguy10.jpeg'),
  (10, 8, 'John', 'GOING', '/resources/images/profileguy10.jpeg'),
  (10, 12, 'John', 'GOING', '/resources/images/profileguy10.jpeg'),
  (3, 1, 'Alexa', 'NOT_GOING', '/resources/images/profile3.jpeg'),
  (4, 1, 'Elena', 'GOING', '/resources/images/profile4.jpeg'),
  (5, 1, 'Mike', 'GOING', '/resources/images/profileguy5.jpeg'),
  (11, 2, 'Ken', 'NOT_GOING', '/resources/images/profileguy1.jpeg'),
  (11, 17, 'Ken', 'GOING', '/resources/images/profileguy1.jpeg'),
  (11, 5, 'Ken', 'NO_SHOW', '/resources/images/profileguy1.jpeg'),
  (6, 3, 'Sofia', 'GOING', '/resources/images/profile6.jpeg'),
  (6, 2, 'Sofia', 'GOING', '/resources/images/profile6.jpeg'),
  (6, 1, 'Sofia', 'GOING', '/resources/images/profile6.jpeg'),
  (6, 4, 'Sofia', 'GOING', '/resources/images/profile6.jpeg'),
  (6, 8, 'Sofia', 'GOING', '/resources/images/profile6.jpeg'),
  (18, 4, 'Anna', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-6.svg'),
  (18, 15, 'Anna', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-6.svg'),
  (8, 4, 'Sara', 'GOING', '/resources/images/profile8.jpeg'),
  (8, 10, 'Sara', 'GOING', '/resources/images/profile8.jpeg'),
  (7, 5, 'Alexa', 'WAITLIST', '/resources/images/profile7.jpeg'),
  (19, 5, 'Alexandra Richardson', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-7.svg'),
  (19, 11, 'Alexandra Richardson', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-7.svg'),
  (14, 5, 'Mary Miller', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-2.svg'),
  (14, 1, 'Mary Miller', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-2.svg'),
  (9, 6, 'Lena', 'GOING', '/resources/images/profile9.jpeg'),
  (9, 7, 'Lena', 'GOING', '/resources/images/profile9.jpeg'),
  (9, 9, 'Lena', 'GOING', '/resources/images/profile9.jpeg'),
  (12, 9, 'Maria', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 11, 'Maria', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 5, 'Maria', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 6, 'Maria', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (12, 18, 'Maria', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-0.svg'),
  (15, 12, 'Jess', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-3.svg'),
  (15, 13, 'Jess', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-3.svg'),
  (17, 16, 'Bobby MacDonald', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-5.svg'),
  (13, 4, 'Anna', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-1.svg'),
  (13, 3, 'Anna', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-1.svg'),
  (13, 19, 'Anna', 'GOING',
  '/resources/profile_set_up_page/icons/profile-image-1.svg'
  );
