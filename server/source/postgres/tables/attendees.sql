CREATE TABLE IF NOT EXISTS attendees (
  user_id           INTEGER                          NOT NULL                 ,
  event_id          INTEGER                          NOT NULL                 ,
  status            attendee_status_enum             NOT NULL                 ,
  guest_count       INTEGER                          DEFAULT 0                ,
  updated_at        TIMESTAMP WITH TIME ZONE         DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, event_id)
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
  status
)
VALUES
(1, 1, 'GOING'),
(1, 2, 'NOT_GOING'),
(1, 3, 'WAITLIST'),
(2, 1, 'NO_SHOW'),
(2, 2, 'GOING'),
(2, 3, 'NOT_GOING'),
(2, 4, 'WAITLIST'),
(3, 1, 'WAITLIST'),
(3, 2, 'NO_SHOW'),
(3, 3, 'GOING'),
(3, 4, 'NOT_GOING'),
(3, 5, 'WAITLIST'),
(4, 1, 'NO_SHOW'),
(4, 2, 'GOING'),
(4, 3, 'NOT_GOING'),
(4, 4, 'WAITLIST'),
(4, 5, 'NO_SHOW'),
(4, 6, 'GOING'),
(5, 1, 'WAITLIST'),
(5, 2, 'GOING'),
(5, 3, 'GOING'),
(5, 4, 'NOT_GOING'),
(5, 5, 'GOING'),
(5, 6, 'GOING'),
(5, 7, 'GOING'),
(5, 8, 'GOING'),
(5, 9, 'GOING'),
(5, 10, 'GOING'),
(5, 12, 'NO_SHOW'),
(5, 15, 'WAITLIST'),
(5, 16, 'NO_SHOW'),
(6, 6, 'NOT_GOING'),
(7, 7, 'WAITLIST'),
(8, 8, 'NO_SHOW'),
(9, 9, 'GOING'),
(10, 10, 'NOT_GOING'),
(11, 11, 'WAITLIST'),
(12, 12, 'NO_SHOW'),
(13, 1, 'GOING'),
(14, 2, 'NOT_GOING'),
(15, 3, 'WAITLIST'),
(16, 4, 'NO_SHOW'),
(17, 5, 'GOING'),
(18, 6, 'NOT_GOING'),
(19, 7, 'WAITLIST'),
(20, 8, 'NO_SHOW'),
(21, 13, 'NOT_GOING'),
(21, 14, 'WAITLIST'),
(21, 15, 'NO_SHOW'
);
