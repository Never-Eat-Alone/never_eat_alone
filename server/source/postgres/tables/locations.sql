CREATE TABLE IF NOT EXISTS locations (
  id               SERIAL        PRIMARY KEY,
  address_line_one VARCHAR(400)             ,
  address_line_two VARCHAR(3000)            ,
  city             VARCHAR(100)             ,
  province         VARCHAR(100)             ,
  country          VARCHAR(100)             ,
  postal_code      VARCHAR(100)             ,
  neighbourhood    VARCHAR(100)
);

INSERT INTO locations (
  address_line_one,
  address_line_two,
  city,
  province,
  country,
  postal_code,
  neighbourhood
)
VALUES
('642 King St W', 'Suite 102', 'Toronto', 'ON', 'Canada', 'M5V 1M7',
'Downtown'),
('12 Brant St', '', 'Toronto', 'ON', 'Canada', 'M5V 2M1',
'Financial District'),
('10 Bay St ', 'Suite 105', 'Toronto', 'ON', 'Canada', 'M5J 2R8',
'Financial District'),
('100 Cumberland St', '', 'Toronto', 'ON', 'Canada', 'M5R 1A6', 'Yorkville'),
('2015 Avenue Rd', '', 'North York', 'ON', 'Canada', 'M5M 4A5', 'Nortown'),
('2373 Yonge St', '', 'Toronto', 'ON', 'Canada', 'M4P 2C8', 'Midtown'),
('2009 Yonge St', '', 'Toronto', 'ON', 'Canada', 'M4S 1Z8',
'MT Pleasant West'),
('75 Portland St', '', 'Toronto', 'ON', 'Canada', 'M5V 2M9',
'Fashion District'),
('4 Avenue Rd', '', 'Toronto', 'ON', 'Canada', 'M5R 2E8', 'Yorkville'),
('265 Broadview Ave', '', 'Toronto', 'ON', 'Canada', 'M4M 2G8',
'East Chinatown'),
('99 Yorkville Ave', '', 'Toronto', 'ON', 'Canada', 'M5R 1C1', 'Yorkville'),
('93A Ossington Ave', '', 'Toronto', 'ON', 'Canada', 'M6J 2Z2', 'Queen West'),
('2015 Yonge st', '', 'North York', 'ON', 'Canada', 'M9M 4A5', 'North York'),
('3000 Bathurst St', '', 'Markham', 'ON', 'Canada', 'M9Y 8A5', ''),
('36 Bernard St', '', 'Scarborough', 'ON', 'Canada', 'M4Y 8B9', ''),
('182 Locke St S', '', 'Hamilton', 'ON', 'Canada', 'L8P 4B3', ''),
('1550 Upper James St', '#20', 'Hamilton', 'ON', 'Canada','L9B 2L6', ''),
('526 Lake St', '', 'St. Catharines', 'ON', 'Canada', 'L2N 2C3', ''),
('199 Wentworth St W', '', 'Oshawa', 'ON', 'Canada', 'L1J 6P4', ''),
('56 Water St', '', 'Port Perry', 'ON', 'Canada', 'L9L 1J2', ''
);
