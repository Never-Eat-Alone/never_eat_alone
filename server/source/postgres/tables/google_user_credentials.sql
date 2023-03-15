CREATE TABLE IF NOT EXISTS google_user_credentials (
  id          SERIAL    PRIMARY KEY,
  user_id     INTEGER   NOT NULL,
  id_token    TEXT      NOT NULL
);

INSERT INTO google_user_credentials (
  user_id,
  id_token
) VALUES
(5, '115752112592661828220'),
(6, '106113142816146188846'),
(7, '116946907435204765428'),
(1, '109290310120720085227'
);
