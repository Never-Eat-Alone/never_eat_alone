CREATE TABLE IF NOT EXISTS user_invitation_codes (
  invite_code   VARCHAR(20)   UNIQUE NOT NULL,
  user_id       INTEGER              NOT NULL,
  created_at    TIMESTAMP                      DEFAULT NOW(),
  updated_at    TIMESTAMP                      DEFAULT NOW(),
  PRIMARY KEY (user_id)
);

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE
      conname = 'fk_user_invitation_codes_users') THEN
        ALTER TABLE user_invitation_codes
          ADD CONSTRAINT fk_user_invitation_codes_users
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE;
    END IF;
END $$;

INSERT INTO user_invitation_codes (
  invite_code,
  user_id
) VALUES
('J91RTB2N', 1),
('D83QWT9E', 2),
('F15KVG6Z', 3),
('T56YXS4P', 4),
('L47BHN8F', 5),
('R20MZC1A', 6),
('V65UDL0W', 7),
('S72EKP3J', 8),
('G34JXT9N', 9),
('Y62QMW8F', 10),
('A05TZC1E', 11),
('P49KLD6R', 12),
('S28HVB7P', 13),
('E67WYN5M', 14),
('R12GKF3S', 15),
('B94VXP0D', 16),
('N09LTX7W', 17),
('J57PYQ3H', 18),
('K31SBE4R', 19),
('X16GUF8D', 20)
ON CONFLICT (user_id)
DO UPDATE SET invite_code = excluded.invite_code, updated_at = NOW();
