/** The possible credit card types. */
export enum CreditCardType {
  VISA,
  MASTERCARD,
  AMEX,
  OTHER
}

export function getCreditCardTypeName(cardType: CreditCardType): string {
  switch (cardType) {
    case 0:
      return 'Visa';
    case 1:
      return 'Mastercard';
    case 2:
      return 'Amex';
    default:
      return 'Other';
  }
}
