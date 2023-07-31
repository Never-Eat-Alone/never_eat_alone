CREATE TABLE IF NOT EXISTS cuisines (
  id             SERIAL       PRIMARY KEY,
  label          VARCHAR(100) NOT NULL,
  color_code     VARCHAR(100)
);

INSERT INTO cuisines (
  id,
  label,
  color_code
)
VALUES
(1, 'American', 'hsla(237, 100%, 93%, 1)'),
(2, 'Steak', 'hsl(43, 100%, 94%)'),
(3, 'Cocktail Bar', 'hsl(275, 100%, 90%)'),
(4, 'Brazilian', 'hsl(129, 100%, 87%)'),
(5, 'Seafood', 'hsl(91, 100%, 97%)'),
(6, 'Bar', 'hsl(53, 100%, 92%)'),
(7, 'Lounge', 'hsl(110, 100%, 94%)'),
(8, 'Bottle Service', 'hsl(320, 100%, 91%)'),
(9, 'Mediterranean', 'hsla(101, 100%, 92%, 1)'),
(10, 'Italian', 'hsla(14, 100%, 92%, 1)'),
(11, 'Contemporary', 'hsl(12, 100%, 88%)'),
(12, 'Canadian', 'hsla(0, 100%, 87%, 1)'),
(13, 'Farm-to-table', 'hsl(296, 100%, 94%)'),
(14, 'French', 'hsla(72, 100%, 90%, 1)'),
(15, 'Bistro', 'hsl(60, 100%, 92%)'),
(16, 'Cantonese', 'hsl(194, 100%, 90%)'),
(17, 'Raw Bar', 'hsl(210, 100%, 93%)'),
(18, 'Modern', 'hsl(140, 100%, 90%)');
