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
  id,
  name,
  location_id,
  description,
  how_to_find,
  phone_number,
  price_range,
  website
) VALUES
(1, 'Darbar', 1, 'This wood-floored restaurant serves a menu of Persian 
  specialties in an elegant dining room.', null, '(416) 519-4545', 'EXPENSIVE',
  'https://www.darbarpersiangrill.com/'),
(2, 'Alobar Downtown', 2, 'Alobar Downtown is nestled in the heart of 
  Toronto''s bustling Financial District. Alobar Downtown offers revelry in the 
  bar and lounge and warmth in the dining room, both featuring menus from 
  Michelin-starred chefs Patrick Kriss & Rebekah Bruce. World class wines are 
  displayed as a centrepiece to pair with choice seafood, grilled fish and 
  prime chops. All served with genuine hospitality.

  Walk-ins are welcome from lunch hour, all through the day, and late into the 
  evening.', 'Located inside the building.', '(647) 368-6981', 
  'MODERATELY_PRICED', 'https://thealobar.com/alobar-downtown/'),
(3, 'JaBistro', 3, 'Artfully prepared sushi & cocktails served in an upmarket, 
  stylish Japanese restaurant.', 'Easily accessible in the downtown 
  area with black windows and door.', '(647) 748-0222', 'VERY_EXPENSIVE',
  'https://www.jabistro.com/'),
(4, 'Sassafraz', 4, 'Fashionable corner dining room with a popular patio, 
  serving French-inspired Canadian cuisine.', 'Located in the historic 
  district.', '(123) 456-7893', 'EXPENSIVE', 'http://www.sassafraz.com'),
(5, 'Jacob''s Steakhouse', 5, 'Jacob''s Steakhouse is renowned for its 
  high-quality steaks and excellent service.', 'Located in the city center.',
  '(123) 456-7894', 'VERY_EXPENSIVE', 'http://www.jacobssteakhouse.com'),
(6, 'Shunoko', 6, 'Shunoko is a sushi bar headed up by the same person behind 
  the now-shuttered Sushi Nomi in Roncesvalles, Jun Kim.
  Much of the fish here is imported from Tokyo''s famous Tsukiji Market. Though 
  the main focus here is still on sushi, they now have the capacity to offer 
  hot mains and other dishes on their expanded menu in this larger space.',
  '', '+16477487288', 'VERY_EXPENSIVE', 'https://www.shunoko.ca/'),
(7, 'Grazie', 7, 'It''s all about Italian traditions at Grazie in Toronto. With 
  over 15 years in business, the restaurant has become a measure of quality and 
  consistency in the area. Chef Joe Brancatella has customized the Grazie menu 
  full of Italian favorites with a few unexpected twists thrown into the mix. 
  You can find a variety of antipasti, zuppa and pasta dishes on the menu, but 
  you can also find pizza with unique toppings, like eggplant, zucchini and 
  sopressata. The customer experience is extremely important at Grazie. It 
  starts with an electric ambiance and buzzing excitement that makes visitors 
  feel like they''re on the streets of Italy. No matter what it is you order 
  from the menu, you can expect high-quality service that goes above and beyond 
  to anticipate your needs.', 'Just off the main square.', '+14164880822',
  'MODERATELY_PRICED', 'http://www.grazie.ca/'),
(8, 'Cafe Boulud', 8, 'Daniel Boulud''s retooled French brasserie boasts a 
  vintage feel & dishes like rotisserie chicken.', 'Located on the second floor 
  of Four Seasons Hotel.', '(416) 963-6000', 'EXPENSIVE',
  'https://www.cafeboulud.com/toronto/'),
(9, 'Miku', 9, 'Flame-seared sushi is the specialty at this Japanese 
  fine-dining destination with soaring ceilings.', 'Near the waterfront.',
  '(647) 347-7347', 'VERY_EXPENSIVE', 'http://www.mikutoronto.com'),
(10, 'Bar Raval', 10, 'Grant van Gameron''s Spanish pinxtos bar features 
  Gaudi-esque wood panels & a Barcelona feel.', '', '', 'EXPENSIVE',
  'https://www.thisisbarraval.com/'),
(11, 'Richmond Station', 11, 'Co-owned by a "Top Chef Canada" winner, this 
  bustling spot offers a weekly menu of seasonal cuisine.', 'Close to the theater 
  district.', '(647) 748-1444', 'EXPENSIVE',
  'https://richmondstation.ca/'),
(12, 'Buca Yorkville', 12, 'Buca Yorkville is an upscale Italian restaurant 
  offering traditional dishes in a chic environment.', 'Located in the 
  Yorkville neighbourhood.', '(123) 456-7801', 'VERY_EXPENSIVE',
  'http://www.buca.com'),
(13, 'Kaiseki Yu-Zen Hashimoto', 13, 'Kaiseki Yu-Zen Hashimoto serves Japanese 
  haute cuisine in an elegant setting.', 'Found within the Japanese Canadian 
  Cultural Centre.', '(123) 456-7802', 'VERY_EXPENSIVE',
  'http://www.kaiseki.ca'),
(14, 'Byblos', 14, 'Byblos represents a marriage of Eastern Mediterranean 
  cuisine with strong influences from both traditional and local ingredients.',
  'Close to the Entertainment district.', '(123) 456-7803', 'VERY_EXPENSIVE',
  'http://www.byblostoronto.com'),
(15, 'Canis', 15, 'Canis serves inspired Canadian cuisine in a minimalist, 
  modern space.', 'Located in the West Queen West neighbourhood.',
  '(123) 456-7804', 'MODERATELY_PRICED', 'http://www.canisrestaurant.com'),
(16, 'Edulis', 16, 'Edulis is renowned for its seafood and 
  Spanish/French-inspired dishes.', 'Located near the Little Portugal 
  neighborhood.', '(123) 456-7805', 'VERY_EXPENSIVE',
  'http://www.edulisrestaurant.com'),
(17, 'Piano Piano', 17, 'Piano Piano serves up reimagined Italian classics in a 
  fun, vibrant setting.', 'Close to the museum district.', '(123) 456-7806',
  'MODERATELY_PRICED', 'http://www.pianopiano.com'),
(18, 'Dandylion', 18, 'Dandylion is a small, modern restaurant offering 
  innovative, plant-focused meals.', 'Found in the heart of Queen Street West.',
  '(123) 456-7807', 'MODERATELY_PRICED', 'http://www.dandylion.com'),
(19, 'Alo', 19, 'Alo is a sophisticated restaurant offering a contemporary 
  French tasting menu.', 'Located in the downtown core.', '(123) 456-7808',
  'VERY_EXPENSIVE', 'http://www.alo.com'),
(20, 'Skippa', 20, 'Skippa offers a changing menu of seasonal, sustainable 
  sushi and small plates.', 'Situated in the Harbord Village.',
  '(123) 456-7809', 'VERY_EXPENSIVE', 'http://www.skippa.com'),
(21, 'Grey Gardens', 21, 'Grey Gardens is a wine bar and restaurant offering 
  diverse, eclectic dishes.', 'Located in Kensington Market.', '(123) 456-7810',
  'MODERATELY_PRICED', 'http://www.greygardens.com'),
(22, 'Chantecler', 22, 'Chantecler serves innovative French-Asian fusion dishes 
  in a stylish setting.', 'Located in Parkdale.', '(123) 456-7811',
  'MODERATELY_PRICED', 'http://www.chantecler.com'),
(23, 'Sushi Kaji', 23, 'Sushi Kaji offers traditional Edomae sushi in a 
  minimalist, tranquil environment.', 'Located on the Queensway.',
  '(123) 456-7812', 'VERY_EXPENSIVE', 'http://www.sushikaji.com'),
(24, 'Atlas', 24, 'Atlas serves unique, flavorful dishes inspired by Moroccan 
  cuisine.', 'Found in the heart of the city.', '(123) 456-7813',
  'MODERATELY_PRICED', 'http://www.atlasrestaurant.com'),
(25, 'George', 25, 'George offers a variety of creative, delectable dishes in a 
  stunning, sophisticated environment.', 'Located in a charming old town 
  district.', '(123) 456-7814', 'VERY_EXPENSIVE',
  'http://www.georgerestaurant.com'),
(26, 'Antler', 26, 'Antler celebrates regional ingredients and their natural 
  surroundings, serving Canadian cuisine.', 'Located on Dundas West.',
  '(123) 456-7815', 'MODERATELY_PRICED', 'http://www.antlerkitchenbar.com'),
(27, 'Gusto 101', 27, 'Gusto 101 serves Italian classics with a modern twist in 
  a chic industrial space.', 'In the heart of the Fashion District.',
  '(123) 456-7816', 'MODERATELY_PRICED', 'http://www.gusto101.com'),
(28, 'Scaramouche', 28, 'Scaramouche is known for its elegant dining experience 
  and panoramic city views.', 'Located on a high rise in the Midtown.',
  '(416) 961-8011', 'VERY_EXPENSIVE', 'https://www.scaramoucherestaurant.com/'),
(29, 'La Banane', 29, 'Stylish, brass-accented eatery with a raw bar serving 
  inventive, French-influenced cuisine.', 'Located on Ossington Avenue.',
  '+14165516263', 'EXPENSIVE', 'https://www.labanane.ca/'),
(30, 'Moon Palace Cantonese Cuisine', 30, 'Moon Palace is a Chinese restaurant 
  in The Atrium serving all the Cantonese cravings, from dim sum to stir-fried 
  noodles. Our specialty is seafood sourced from leading suppliers for 
  sea-to-table goodness.
  
  Our team of authentically trained chefs skillfully prepares each dish with 
  passion and precision. Discover signature dishes like lobster, scallops, 
  shrimp, and all of your favourite Cantonese dishes, from ribs to vegetarian 
  options.

  Lobsters are their specialty. Their steamed lobster dumplings are adorably 
  pink and a definite must-try. Another wise option is the Hong-Kong Style 
  Lobster; it''s juicy and flavoured.

  Other menu goods include Singapore Noodles with stir-fried vermicelli noodles,
  fresh prawns and hearty BBQ pork in a delicious blend of curry. The Cantonese 
  Chow Mein is made with fried egg noodles accompanied by a mix of pork, beef, 
  and assorted seafood. For groups, there are several combo options that make 
  it easier to share.', 'In the heart of the Financial District.', '',
  '(416) 551-5666', 'MODERATELY_PRICED', 'https://moon-palace.ca/'),
(31, 'Aloette', 31, 'The neighbourhood bistro as imagined by the Alo Food 
  Group. Set along Spadina Avenue like a passenger train''s dining car, Aloette 
  is where a taste for haute cuisine meets cravings for cheeseburgers and lemon 
  meringue.', 'Located in the heart of downtown Toronto.', '+14162603444',
  'MODERATELY_PRICED', 'https://aloetterestaurant.com/'),
(32, 'Actinolite', 32, 'Sleek eatery offering fixed-price & chef''s menus of 
  thoughtfully sourced New Canadian fare & drinks.', '', '(416) 962-8943',
  'VERY_EXPENSIVE', 'https://www.actinoliterestaurant.com/'),
(33, 'Toronto Beach Club', 33, 'Welcome to Toronto Beach Club, where the 
  effortless sophistication of the Mediterranean meets Toronto''s freshwater 
  shores at Woodbine Beach. Traversing many cultural and culinary borders, our 
  menu is a sensory journey offering a bounty of the freshest daily fish, juicy 
  seafood, premium meats, mezze and more', 'Located right by the Toronto 
  Woodbine Beach.', '+14166948844', 'MODERATELY_PRICED',
  'https://thetorontobeachclub.com/'),
(34, 'Judaline', 34, 'Judaline offers a brand new dining experience located at 
  Danforth and Broaview. A chef-inspired menu highlighting seasonal cuisine, 
  fresh ingredients, and paying homage to the best of local and international 
  beverages. The space features an all-season private patio, and a warm, 
  inviting dining room.', 'On Danforth Ave with street parking.',
  '(416) 792-8088', 'MODERATELY_PRICED', 'https://www.judaline.ca'),
(35, 'Ristorante Sociale', 35, 'Ristorante Sociale will welcome guests into 
  an upbeat, upscale setting for an elevated dining experience that doubles 
  as a celebration with plenty of Italian flair. Roman flavours meet Tuscan 
  influences on the menu, with fresh pasta, seafood & steaks in a white 
  tablecloth setting.

  ###### The food
  “We couldn''t open a Sociale without cacio e pepe,” says Rindinella, who''s 
  carried a handful of the restaurant''s greatest hits down to King Street. 
  Expect to see a few familiar dishes (chicken liver mousse, arancini, 
  focaccia and gnocchi) alongside steakhouse-inspired plates reimagined by an 
  Italophile. This means that the half-dozen steaks on offer are cooked the 
  way a nonno would: salt, hard sear, a lashing of olive oil and a final 
  sprinkle of finishing salt. Even the caesar salad gets an Italian zhuzh, 
  with romaine swapped out for radicchio and bacon improved upon with 
  prosciutto.

  ###### The drinks
  Whereas Enoteca''s wine list is 98 per cent Italian, this 50-bottle card is 
  more international, with over a third of the list populated with wines from 
  beyond the boot, including a bunch from France and Niagara. Guests can 
  expect intriguing Italian bottles like a blend of red (Sangiovese) and 
  white (Trebbiano) grapes from Fattoria di Sammontana, a small winery just 
  outside of Florence. Alongside lesser-known grape varietals and 
  unconventional blends, you''ll see heavy-hitter wines (barolo, amarone, 
  chianti) all of which are made by small-scale producers you won''t find in 
  the LCBO.

  Dinner Menu:
  https://sociale.ca/ristorante-sociale/',
  'Look for the sign on King St that directs you to the alley entrance.',
  '(647) 352-1205',
  'EXPENSIVE',
  'https://sociale.ca/ristorante-sociale/'),
(36, 'Don Alfonso 1890', 36, 'The City''s most internationally acclaimed 
  restaurant, Don Alfonso 1890 Toronto, has been awarded a Michelin Star in the 
  inaugural Michelin Guide – Toronto 2022.

  Created in partnership with hospitality icon Nick Di Donato of the Liberty 
  Entertainment Group, Don Alfonso 1890 Toronto is the only North American 
  location of world-renowned Michelin Star Chefs Alfonso and Ernesto 
  Iaccarino''s Don Alfonso 1890.

  Sitting atop the iconic Westin Harbour Castle on the edge of Lake Ontario, 
  the spacious new location on the 38th floor offers stunning views of the city 
  skyline and Toronto''s harbour.

  Showcasing the incredible cuisine of Michelin Star Chefs Ernesto & Alfonso 
  Iaccarino and the wonderful fresh flavours of the Amalfi coast, Don Alfonso 
  1890''s cuisine is characterized by its modernity, Mediterranean flare and 
  the exceptional quality of the raw materials used.

  Dinner Menu:
  https://www.donalfonsotoronto.com/menus/a-la-carte',
  '38th Floor of The Westin Harbour Castle Hotel', '(416) 214-5888',
  'VERY_EXPENSIVE', 'https://www.donalfonsotoronto.com/'),
(37, 'Alder', 37, 'Alder is a celebration of simplicity and warmth, serving 
  seasonal fare from award-winning Chef Patrick Kriss (Alo / Aloette / Alobar). 
  The kitchen menu, centered around a wood-fired grill, features ingredients 
  selected at their flavourful peak and delicately enhanced with smoke, flame 
  and a deft touch. There''s also a full bar pouring classically inspired 
  cocktails, craft beers and an eclectic selection of wines.

  Alder is located at Ace Hotel Toronto, in the heart of the Garment District, 
  between King and Queen Streets, just blocks from the TIFF Bell Lightbox and 
  the Toronto Music Garden.', 'Lower level of the Ace Hotel', '+14166373737',
  'EXPENSIVE', 'https://www.aldertoronto.com/'),
(38, 'Black + Blue', 38, 'Black + Blue Steakhouse is Toronto''s new luxurious 
  multi-level destination to find top cuts of meat, towering seafood platters, 
  and curated cocktails.

  The Vancouver-based steakhouse just opened its first Ontario location in the 
  financial district, taking over the location previously occupied by the 
  Toronto Stock Exchange.

  The menu features meat-and-potato steakhouse staples with glorified upgrades, 
  but also sushi, sashimi and seafood towers. Old-school service means a 
  handful of the dishes—caesar salad, steak tartare, crêpes suzette—are 
  prepared tableside.

  Naturally, the stars of this show are the premium cuts of steak, all of which 
  are housed in a Himalayan salt–lined aging-room-slash-shrine. Nearly 1,000 
  custom-cut salt blocks were imported for the purpose of accelerating the 
  aging process. “We break down everything in-house, wet-age cuts for 28 days 
  and then dry-age for another 28 to 45 days,” says Bellis. He and his team 
  have curated a menu of heritage and coveted breeds, including Kobe and 
  Japanese A5 Wagyu (including the ultra-rare Miyazaki Wagyu) alongside 
  Canadian and USDA Prime beef.

  Cutting back on red meat? There''s also wild mushroom risotto, roasted Haida 
  Gwaii halibut, coq au vin and lobster carbonara.

  The cocktail menu is made up of classics with a contemporary tweak or two. 
  The Black or Blue?, for example, is a play on a Penicillin that blends 
  Johnnie Walker Black with lime, ginger and pandan kocha tea umeshu; finished 
  with a toasted sesame mist. And a list of house martinis includes one made 
  with ocean brine.

  It wouldn''t be a steakhouse without wine, though. While the list here is 
  expansive and global, there''s a focus on bottles from the west coast, like 
  special varietals from Mission Hill Winery and Martin Lane Boutique.',
  'Inside the Toronto Stock Exchange building', '+16473688283',
  'VERY_EXPENSIVE', 'https://blackandbluesteakhouse.ca/'),
(39, 'Rio 40', 39, , 'Rio 40 serves traditional Brazilian like grilled meats 
  and caipirinhas in a high-ceilinged environment.
  Named for one of Brazil''s main cities and the degree the temperature often 
  rises to there, the restaurant has been open since 2004.', '', '+14166546363',
  'MODERATELY_PRICED', 'https://rio40restaurant.com/'),
(40, 'Daphne', 40, 'Daphne is a modern American style restaurant, lounge, and 
  garden terrace in the heart of Toronto''s Financial District. Daphne offers 
  American cuisine with a contemporary twist, skillfully curated by Executive 
  Chef John Chee. The menu showcases seasonal American classics, complemented 
  by an array of small bites, handcrafted cocktails, and an extensive wine 
  list, all presented within an elegant and modern ambiance.

  At the heart of the culinary offerings are two authentic wood-fired grills, 
  infusing a distinct flavor into each dish. Locally sourced ingredients, along 
  with local and imported seafood, are expertly grilled over live coals, 
  ensuring a tantalizing dining experience.

  Each dish is thoughtfully enhanced with the addition of seasonal produce, 
  while the bakery crafts artisanal breads by hand.', '', '+14162031414',
  'MODERATELY_PRICED', 'https://daphnetoronto.com/');
