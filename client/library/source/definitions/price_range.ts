/** The possible price ranges per meal per person. */
export enum PriceRange {
  /** Represents the $ price range. */
  INEXPENSIVE = 'INEXPENSIVE',

  /** Represents the $$ price range. */
  MODERATELY_PRICED = 'MODERATELY_PRICED',

  /** Represents $$$ price range. */
  EXPENSIVE = 'EXPENSIVE',

  /** Represents $$$$ price range. */
  VERY_EXPENSIVE = 'VERY_EXPENSIVE',

  /** Represents the price range is not known. */
  UNKNOWN = 'UNKNOWN'
}

/** Converts the Price range value to the equivalent dollar signs symbol. */
export function toDollarSigns(value: PriceRange): string {
  console.log('toDollarSigns value', value, typeof value);
  switch (value) {
    case PriceRange.INEXPENSIVE:
      return '$';
    case PriceRange.MODERATELY_PRICED:
      return '$$';
    case PriceRange.EXPENSIVE:
      return '$$$';
    case PriceRange.VERY_EXPENSIVE:
      return '$$$$';
    default:
      return '';
  }
}
