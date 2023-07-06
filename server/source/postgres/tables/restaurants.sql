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
(1, 'Darbar', 1, `Darbar offers a rich and authentic experience of traditional 
  Persian cuisine in a modern setting.`, 'Located in the heart of downtown.',
  '(123) 456-7890', 'MEDIUM', 'http://www.darbar.com'),
(2, 'Alobar', 2, `Alobar serves contemporary dishes with a focus on seasonal 
  and local ingredients.', 'Located in a trendy neighborhood.`,
  '(123) 456-7891', 'MEDIUM', 'http://www.alobar.com'),
(3, 'JaBistro', 3, `JaBistro is a popular sushi restaurant offering both 
  traditional and innovative dishes.`, `Easily accessible in the downtown 
  area.`, '(123) 456-7892', 'HIGH', 'http://www.jabistro.com'),
(4, 'Sassafraz', 4, `Sassafraz is known for its French-inspired Canadian 
  cuisine in a sophisticated setting.`, 'Located in the historic district.',
  '(123) 456-7893', 'HIGH', 'http://www.sassafraz.com'),
(5, 'Jacob''s Steakhouse', 5, `Jacob's Steakhouse is renowned for its 
  high-quality steaks and excellent service.`, 'Located in the city center.',
  '(123) 456-7894', 'HIGH', 'http://www.jacobssteakhouse.com'),
(6, 'Shunoko', 6, `Shunoko offers a unique take on Japanese cuisine, focusing 
  on fresh, local seafood.`, 'Near the waterfront.', '(123) 456-7895', 'HIGH',
  'http://www.shunoko.com'),
(7, 'Grazie', 7, `Grazie offers traditional Italian dishes in a warm and 
  friendly environment.`, 'Just off the main square.', '(123) 456-7896',
  'MEDIUM', 'http://www.grazie.com'),
(8, 'Cafe Boulud', 8, `Cafe Boulud is a destination for French cuisine with an 
  international twist.`, 'Located in the Four Seasons Hotel.', '(123) 456-7897',
  'HIGH', 'http://www.cafeboulud.com'),
(9, 'Miku', 9, `Miku is known for its Aburi sushi and contemporary Japanese 
  cuisine.`, 'Near the waterfront.', '(123) 456-7898', 'HIGH',
  'http://www.mikutoronto.com'),
(10, 'Bar Raval', 10, `Bar Raval is a Spanish tapas bar with a unique 
  architectural design.`, 'Located in the hip Palmerston area.',
  '(123) 456-7899', 'MEDIUM', 'http://www.barraval.com'),
(11, 'Richmond Station', 11, `Richmond Station is a bustling, rustic-chic 
  restaurant with a seasonally inspired menu.`, `Close to the theater 
  district.`, '(123) 456-7800', 'MEDIUM', 'http://www.richmondstation.com'),
(12, 'Buca Yorkville', 12, `Buca Yorkville is an upscale Italian restaurant 
  offering traditional dishes in a chic environment.`, `Located in the 
  Yorkville neighbourhood.`, '(123) 456-7801', 'HIGH', 'http://www.buca.com'),
(13, 'Kaiseki Yu-Zen Hashimoto', 13, `Kaiseki Yu-Zen Hashimoto serves Japanese 
  haute cuisine in an elegant setting.`, `Found within the Japanese Canadian 
  Cultural Centre.`, '(123) 456-7802', 'HIGH', 'http://www.kaiseki.ca'),
(14, 'Byblos', 14, `Byblos represents a marriage of Eastern Mediterranean 
  cuisine with strong influences from both traditional and local ingredients.`,
  'Close to the Entertainment district.', '(123) 456-7803', 'HIGH',
  'http://www.byblostoronto.com'),
(15, 'Canis', 15, `Canis serves inspired Canadian cuisine in a minimalist, 
  modern space.`, 'Located in the West Queen West neighbourhood.',
  '(123) 456-7804', 'MEDIUM', 'http://www.canisrestaurant.com'),
(16, 'Edulis', 16, `Edulis is renowned for its seafood and 
  Spanish/French-inspired dishes.`, `Located near the Little Portugal 
  neighborhood.`, '(123) 456-7805', 'HIGH', 'http://www.edulisrestaurant.com'),
(17, 'Piano Piano', 17, `Piano Piano serves up reimagined Italian classics in a 
  fun, vibrant setting.`, 'Close to the museum district.', '(123) 456-7806',
  'MEDIUM', 'http://www.pianopiano.com'),
(18, 'Dandylion', 18, `Dandylion is a small, modern restaurant offering 
  innovative, plant-focused meals.`, 'Found in the heart of Queen Street West.',
  '(123) 456-7807', 'MEDIUM', 'http://www.dandylion.com'),
(19, 'Alo', 19, `Alo is a sophisticated restaurant offering a contemporary 
  French tasting menu.`, 'Located in the downtown core.', '(123) 456-7808',
  'HIGH', 'http://www.alo.com'),
(20, 'Skippa', 20, `Skippa offers a changing menu of seasonal, sustainable 
  sushi and small plates.`, 'Situated in the Harbord Village.',
  '(123) 456-7809', 'HIGH', 'http://www.skippa.com'),
(21, 'Grey Gardens', 21, `Grey Gardens is a wine bar and restaurant offering 
  diverse, eclectic dishes.`, 'Located in Kensington Market.', '(123) 456-7810',
  'MEDIUM', 'http://www.greygardens.com'),
(22, 'Chantecler', 22, `Chantecler serves innovative French-Asian fusion dishes 
  in a stylish setting.`, 'Located in Parkdale.', '(123) 456-7811', 'MEDIUM',
  'http://www.chantecler.com'),
(23, 'Sushi Kaji', 23, `Sushi Kaji offers traditional Edomae sushi in a 
  minimalist, tranquil environment.`, 'Located on the Queensway.',
  '(123) 456-7812', 'HIGH', 'http://www.sushikaji.com'),
(24, 'Atlas', 24, `Atlas serves unique, flavorful dishes inspired by Moroccan 
  cuisine.`, 'Found in the heart of the city.', '(123) 456-7813', 'MEDIUM',
  'http://www.atlasrestaurant.com'),
(25, 'George', 25, `George offers a variety of creative, delectable dishes in a 
  stunning, sophisticated environment.`, `Located in a charming old town 
  district.`, '(123) 456-7814', 'HIGH', 'http://www.georgerestaurant.com'),
(26, 'Antler', 26, `Antler celebrates regional ingredients and their natural 
  surroundings, serving Canadian cuisine.`, 'Located on Dundas West.',
  '(123) 456-7815', 'MEDIUM', 'http://www.antlerkitchenbar.com'),
(27, 'Gusto 101', 27, `Gusto 101 serves Italian classics with a modern twist in 
  a chic industrial space.`, 'In the heart of the Fashion District.',
  '(123) 456-7816', 'MEDIUM', 'http://www.gusto101.com'),
(28, 'Scaramouche', 28, `Scaramouche is known for its elegant dining experience 
  and panoramic city views.`, 'Located on a high rise in the Midtown.',
  '(123) 456-7817', 'HIGH', 'http://www.scaramoucherestaurant.com'),
(29, 'La Banane', 29, `La Banane offers an eclectic range of modern French 
  dishes in a vibrant, sophisticated setting.`, 'Located on Ossington Avenue.',
  '(123) 456-7818', 'HIGH', 'http://www.labanane.com'),
(30, 'Estiatorio Volos', 30, `Estiatorio Volos offers modern twists on 
  traditional Greek recipes and flavours.`, `In the heart of the Financial 
  District.`, '(123) 456-7819', 'MEDIUM', 'http://www.volos.ca'),
(31, 'Aloette', 31, `Aloette is a modern diner from the team behind Alo. The 
  restaurant offers a high-end dining experience with a menu that blends 
  classic and contemporary flavours.`, `Located in the heart of downtown 
  Toronto.`, '(123) 456-7820', 'MEDIUM', 'http://www.aloetterestaurant.com'),
(32, 'Actinolite', 32, `Actinolite is a charming, upscale restaurant located in 
  Toronto. It offers a seasonal menu that showcases creativity, with a strong 
  emphasis on local and sustainable ingredients.`, `Located in a cozy 
  neighborhood of Toronto.`, '(123) 456-7821', 'HIGH',
  'http://www.actinoliterestaurant.com'),
(33, 'Toronto Beach Club', 33, `Located right by the water, Toronto Beach Club 
  offers a stunning view along with an exciting blend of Mediterranean and 
  Californian cuisine. Their menu is inspired by the coast and features fresh 
  seafood.`, 'Located right by the Toronto Beach.', '(123) 456-7822', 'MEDIUM',
  'http://www.torontobeachclub.com');
