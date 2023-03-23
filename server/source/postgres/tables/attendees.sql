CREATE TABLE IF NOT EXISTS attendees (
  user_id           INTEGER              NOT NULL                 ,
  event_id          INTEGER              NOT NULL                 ,
  name              VARCHAR()            NOT NULL                 ,
  guest_count       INTEGER                          DEFAULT 0    ,
  status            attendee_status_enum NOT NULL                 ,
  profile_image_src TEXT                                          ,
  updated_at        TIMESTAMP NOT NULL               DEFAULT NOW(),
  PRIMARY KEY (user_id , event_id)
);

ALTER TABLE attendees
  ADD CONSTRAINT fk_attendees_users
  FOREIGN KEY (user_id )
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE attendees
  ADD CONSTRAINT fk_attendees_dining_events
  FOREIGN KEY (event_id )
  REFERENCES dining_events (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO attendees (
  user_id,
  event_id,
  guest_count,
  status
)
VALUES
  (16, 1, 0, 'GOING'),
  (10, 1, 2, 'GOING'),
  (3, 1, 0, 'NOT_GOING'),
  (4, 1, 1, 'GOING'),
  (5, 1, 0, 'GOING'),
  (11, 2, 1, 'NOT_GOING'),
  (6, 3, 4, 'GOING'),
  (16, 3, 0, 'GOING'),
  (18, 4, 0, 'GOING'),
  (8, 4, 0, 'GOING'),
  (13, 4, 0, 'GOING'),
  (11, 5, 1, 'NO_SHOW'),
  (7, 5, 0, 'WAITLIST'),
  (19, 5, 1, 'GOING'),
  (14, 5, 2, 'GOING'),
  (6, 2, 0, 'GOING'),
  (9, 6, 0, 'GOING'),
  (10, 7, 0, 'GOING'),
  (10, 8, 0, 'GOING'),
  (12, 9, 0, 'GOING'),
  (16, 10, 0, 'GOING'),
  (12, 11, 0, 'GOING'),
  (15, 12, 0, 'GOING'),
  (14, 1, 0, 'GOING'),
  (6, 2, 0, 'GOING'),
  (13, 3, 0, 'GOING'),
  (6, 4, 0, 'GOING'),
  (12, 5, 0, 'GOING'),
  (12, 6, 0, 'GOING'),
  (9, 7, 0, 'GOING'),
  (6, 8, 0, 'GOING'),
  (9, 9, 0, 'GOING'),
  (8, 10, 0, 'GOING'),
  (19, 11, 0, 'GOING'),
  (10, 12, 0, 'GOING'),
  (15, 13, 0, 'GOING'),
  (16, 14, 0, 'GOING'),
  (18, 15, 0, 'GOING'),
  (17, 16, 0, 'GOING'),
  (11, 17, 0, 'GOING'),
  (12, 18, 0, 'GOING'),
  (13, 19, 0, 'GOING'
  );
