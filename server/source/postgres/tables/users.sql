CREATE TABLE IF NOT EXISTS users (
  id              SERIAL                         PRIMARY KEY              ,
  name            VARCHAR(255)                                            ,
  email           VARCHAR(255)                   UNIQUE                   ,
  user_name       VARCHAR(255)                                            ,
  user_status     user_status_enum               DEFAULT 'PENDING'        ,
  created_at      TIMESTAMP WITH TIME ZONE       DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP WITH TIME ZONE       DEFAULT CURRENT_TIMESTAMP,
  referral_code   VARCHAR(255)                                            ,
  biography       TEXT                                                    ,
  is_bio_private  BOOLEAN                        DEFAULT TRUE             ,
  profile_address TEXT                                                    ,
  is_profile_address_private BOOLEAN              DEFAULT TRUE,
  is_upcoming_events_private BOOLEAN             DEFAULT TRUE,
  is_past_events_private BOOLEAN                 DEFAULT TRUE,
  is_language_private BOOLEAN                    DEFAULT TRUE,
  is_cuisine_private BOOLEAN                     DEFAULT TRUE
);

INSERT INTO users (
  name,
  email,
  user_name,
  user_status,
  created_at,
  referral_code,
  biography,
  profile_address
)
VALUES
('Shahrzad', 'shmn942@gmail.com', 'shahrzad', 'PENDING', '2020-01-01T14:35:00Z',
  '', '', 'Yorkville, Toronto, ON'),
('Aurora', 'amazing.aurora84@gmail.com', 'amazing_aurora', 'BANNED',
  '2020-01-02T10:35:00Z', 'Arthur', '', 'Milton, ON'),
('Alexa', 'info@nevereatalone.net', 'Queen', 'DELETED', '2020-01-01T11:55:00Z',
  'Sheryl', '', 'Toronto, ON, CA'),
('Elena', 'nevereatalonetoronto@gmail.com', 'travel_queen', 'ACTIVE',
  '2020-03-01T09:30:00Z', '@shahrzad', 'Work in progress', 'London, England'),
('Sheryl', 'shahrzad@nevereatalone.net', 'mk3622', 'ACTIVE',
  '2020-03-01T23:14:00Z', 'meetup', 'Wow', 'Downtown Toronto'),
('Sofia', 'shahrzadmasoumnia@gmail.com', '', 'PENDING', '2020-04-15T04:47:23Z',
  '', '', 'Midtown Toronto'),
('Alexa', 'shahrzad@spiretrading.com', 'foodie98', 'PENDING',
  '2020-05-14T14:24:00Z', '', '', 'Scarborough, ON'),
('Sara', 'shahrzad_masoumnia@yahoo.com', 'peddington', 'DEACTIVE',
  '2020-09-14T03:15:00Z', '', '', 'Mississauga'),
('Lena', 'shahrzad+1@nevereatalone.net', 'lena_palma', 'ACTIVE',
  '2021-04-10T02:47:23Z', '', 'Coffee, Tea, and Chocolate', 'North York, ON'),
('John', 'shahrzad+2@nevereatalone.net', 'jk_fitness', 'ACTIVE',
  '2020-12-12T04:25:13Z', '',
'I''m John and looking to go for drinks after work on Bay St.', 'Etobicoke'),
('Ken', 'shahrzad+3@nevereatalone.net', 'applejuice', 'ACTIVE',
  '2020-03-01T02:47:23Z', '', 'Too many place to eat, too little time',
  'Richmond hill'),
('Maria', 'shahrzad+4@nevereatalone.net', 'coffeeLover', 'ACTIVE',
  '2020-04-15T04:47:23Z', '', 'New to the city. Show me around please.',
  'Bradford, ON'),
('Anna', 'shahrzad+5@nevereatalone.net', 'free2020', 'ACTIVE',
  '2020-03-09T04:02:23Z', '', '', 'Toronto, CA'),
('Mary Miller', 'shahrzad+6@nevereatalone.net', 'van_mill', 'ACTIVE',
  '2020-03-09T04:02:23Z', '', 'I like afternoon tea.', 'Toronto, CA'),
('Jess', 'shahrzad+7@nevereatalone.net', 'j12445', 'ACTIVE',
  '2020-03-09T04:02:23Z', '', 'Hi', 'Montreal, QC'),
('Rob Smith', 'shahrzad+8@nevereatalone.net', 'rob', 'ACTIVE',
  '2020-03-09T04:02:23Z', '',
  'St Clair West resident, looking to try the pubs in the area.',
  'Toronto, ON'),
('Bobby MacDonald', 'shahrzad+9@nevereatalone.net', '', 'ACTIVE',
  '2020-03-09T04:02:23Z', '',
  'Hello NEA friends! I''m new here and love to explore the city.',
  'Toronto, ON'),
('Anna', 'shahrzad+10@nevereatalone.net', 'hiking_buddy', 'ACTIVE',
  '2020-03-09T04:02:23Z', '', 'Anyone down to try sushi places? :)',
  'Toronto, ON'),
('Alexandra Richardson', 'shahrzad+11@nevereatalone.net', 'chefAlex', 'ACTIVE',
  '2020-03-09T04:02:23Z', '', 'Meetup Memebr, Ski Lover', 'Toronto, ON'),
('Patrick Hernández', 'shahrzad+12@nevereatalone.net', '', 'PENDING',
  '2020-03-09T04:02:23Z', '', 'Meetup Memebr', 'Toronto, ON'),
('Kranar', 'kamal@spiretrading.com', 'Kranar', 'ACTIVE', '2021-03-09T04:02:23Z',
  'Sheryl', 'Meetup Memebr, Cheesecake for life!', 'Toronto, ON'
);
