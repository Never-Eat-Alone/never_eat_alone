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
();
