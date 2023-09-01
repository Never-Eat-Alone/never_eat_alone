CREATE TABLE IF NOT EXISTS avatars (
  id            SERIAL                         PRIMARY KEY,
  src           TEXT                           NOT NULL,
  created_at    TIMESTAMP WITH TIME ZONE       DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP WITH TIME ZONE       DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO avatars (
  src
) VALUES
('/resources/avatars/profile-image-0.svg'),
('/resources/avatars/profile-image-1.svg'),
('/resources/avatars/profile-image-2.svg'),
('/resources/avatars/profile-image-3.svg'),
('/resources/avatars/profile-image-4.svg'),
('/resources/avatars/profile-image-5.svg'),
('/resources/avatars/profile-image-6.svg'),
('/resources/avatars/profile-image-7.svg'),
('/resources/avatars/profile-image-8.svg'),
('/resources/avatars/profile-image-9.svg'),
('/resources/avatars/profile-image-10.svg'),
('/resources/avatars/profile-image-11.svg'),
('/resources/avatars/profile-image-12.svg'),
('/resources/avatars/profile-image-13.svg'),
('/resources/avatars/profile-image-14.svg'),
('/resources/avatars/profile-image-15.svg'),
('/resources/avatars/profile-image-16.svg'),
('/resources/avatars/profile-image-17.svg'),
('/resources/avatars/profile-image-18.svg'),
('/resources/avatars/profile-image-19.svg'
);
