/** The possible price ranges per meal per person. */
export enum PriceRange {
  // Represents the $ price range.
  INEXPENSIVE,

  // Represents the $$ price range.
  MODERATELY_PRICED,

  // Represents $$$ price range.
  EXPENSIVE,

  // Represents $$$$ price range.
  VERY_EXPENSIVE,

  // Represents the price range is not known.
  UNKNOWN
}

/** Converts the Price range value to the equivalent dollar signs symbol. */
export function toDollarSigns(value: PriceRange): string {
  if (value === PriceRange.INEXPENSIVE) {
    return '$';
  }
  if (value === PriceRange.MODERATELY_PRICED) {
    return '$$';
  }
  if (value === PriceRange.EXPENSIVE) {
    return '$$$';
  }
  if (value === PriceRange.VERY_EXPENSIVE) {
    return '$$$$';
  }
  return '';
}
