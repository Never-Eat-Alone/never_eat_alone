export enum DressCode {
  CASUAL = 'CASUAL',
  BUSINESS_CASUAL = 'BUSINESS_CASUAL',
  FORMAL = 'FORMAL',
  BLACK_TIE = 'BLACK_TIE'
}

export function getDressCodeIconSrc(dressCode: DressCode) {
  if (dressCode === DressCode.CASUAL) {
    return 'resources/icons/casual.svg';
  } else if (dressCode === DressCode.FORMAL) {
    return 'resources/icons/formal.svg';
  } else if (dressCode === DressCode.BLACK_TIE) {
    return 'resources/icons/black_tie.svg';
  }
  else {
    return 'resources/icons/business_casual.svg';
  }
}

export function getDressCodeName(dressCode: DressCode) {
  if (dressCode === DressCode.CASUAL) {
    return 'Casual';
  } else if (dressCode === DressCode.FORMAL) {
    return 'Formal';
  } else if (dressCode === DressCode.BLACK_TIE) {
    return 'Black Tie';
  } else {
    return 'Business Casual';
  }
}
