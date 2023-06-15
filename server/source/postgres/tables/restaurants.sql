CREATE TABLE IF NOT EXISTS restaurants (
  id            SERIAL           PRIMARY KEY,
  name          VARCHAR(100)     NOT NULL,
  created_at    TIMESTAMP        DEFAULT NOW(),
  location_id   INTEGER                       ,
  description   VARCHAR(3000)                 ,
  how_to_find   VARCHAR(3000)                 ,
  phone_number  VARCHAR(255)                  ,
  price_range   price_range_enum              ,
  website       VARCHAR(2048)                 ,
  updated_at    TIMESTAMP        DEFAULT NOW()
);

ALTER TABLE restaurants
  ADD CONSTRAINT fk_restaurants_locations
  FOREIGN KEY (location_id)
  REFERENCES locations (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO restaurants (
  name,
  created_at,
  location_id,
  description,
  how_to_find,
  phone_number,
  price_range,
  website
) VALUES
('Lapinu', '2020-02-14 12:35', 1,
'Modern french restaurant at the heart of downtown Toronto.',
'Just right on King street and you should be able to see our sign.',
'+14164794414', 'EXPENSIVE', 'https://www.lapinoubistro.com/'),
('Jacob''s Steakhouse & Co.', '2020-01-02 10:35', 2,
'High end steakhouse with beef from Japan, Australia and USA in downtown 
Toronto.', 'Grey building with a wide wooden door next to the Citizen bar.',
'+14163660200', 'VERY_EXPENSIVE', 'https://jacobssteakhouse.com/'),
('Miku', '2020-01-01 11:55', 3,
'One of the best Sushi restaurants in Canada with branches in Toronto and 
Vancouver.', 'Inside the RBC waterfront building at the first floor.',
'+16473477347', 'MODERATELY_PRICED', 'https://mikutoronto.com/'),
('Sassafraz', '2020-03-01 09:30', 4,
'One of the oldest French restaurants in Toronto and a favorite romantic 
spot in Yorkville.',
'At the intersection of Cumberland St. and Blair St. with the white exterior.',
'+14169642222', 'INEXPENSIVE', 'https://www.sassafraz.ca/'),
('Darbar', '2020-03-01 23:14', 5, 'Best Persian grill restaurant in Toronto.',
'Located at the Avenue street with street parkings available to the customers.',
'+16473514272', 'EXPENSIVE', 'https://darbarrestaurant.ca/'),
('Grazie', '2020-03-01 23:14', 6, 'Neighbourhood''s favorite.',
'Two floors restaurants location on the north side of Yonge and Eglinton.',
'+16473513642', 'EXPENSIVE', 'http://www.grazie.ca/'),
('Tabule', '2020-01-14 20:9:2', 7,
'A family restaurant focued on the Middle eastern cuisine.', 'On Yonge street.',
'+16473484242', 'MODERATELY_PRICED', 'https://tabuleyonge.com/'),
('Bar Buca', '2020-11-08 9:17', 8,
'Farm to table concept with traditional italian food.',
'On the second floor of the four seasons hotel.', '+16473591242',
'MODERATELY_PRICED', 'http://buca.ca/'),
('Morton''s', '2020-06-20 20:10', 9, 'Luxury steakhouse.', 'In the basement.',
'+16473517842', 'VERY_EXPENSIVE', 'https://www.mortons.com/'),
('Lady Marmalade', '2020-04-21 10:12:58', 10,
'Top brunch place based on BlogTo.', '', '+16473514245', 'INEXPENSIVE',
'http://ladymarmalade.ca/'),
('Sofia', '2021-01-01 13:14', 11, 'Italian cuisine at its best.',
'Located at the heart of Yorkville.', '+16473514297', 'VERY_EXPENSIVE',
'https://www.sofiayorkville.com/'),
('Panthean', '2021-01-01 13:14', 12, 'Greek cuisine', 'Located at Danforth.',
'+16473514587', 'MODERATELY_PRICED', 'https://www.pantheondanforth.ca/'),
('Zen', '2021-01-01 13:14', 13, '', '', '+16473514587', 'VERY_EXPENSIVE',
'https://zenjapaneserestaurant.com/'),
('Pomegranet', '2021-01-01 13:14', 14, 'Persian cuisine', '', '+16473514587',
'MODERATELY_PRICED', 'https://pomegranatetoronto.com/'),
('Monkey Sushi', '2021-01-01 13:14', 15, 'Japanese cuisine', '', '+16473514587',
'INEXPENSIVE', 'http://www.monkeysushi.ca/'
);
