/** The possible credit card types. */
export enum CreditCardType {
  VISA,
  MASTERCARD,
  AMEX
}

export function getCreditCardTypeName(cardType: CreditCardType): string {
  switch (cardType) {
    case CreditCardType.VISA:
      return 'Visa';
    case CreditCardType.MASTERCARD:
      return 'Mastercard';
    case CreditCardType.AMEX:
      return 'Amex';
    default:
      return 'Card';
  }
}
