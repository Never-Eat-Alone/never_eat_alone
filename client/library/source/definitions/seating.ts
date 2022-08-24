export enum Seating {
  BAR,
  PATIO,
  STANDARD,
  PRIVATE_ROOM,
  HIGH_TABLE
}

export function getSeatingIconSrc(seating: Seating) {
  if (seating === Seating.BAR) {
    return 'resources/icons/bar.svg';
  } else if (seating === Seating.PATIO) {
    return 'resources/icons/patio.svg';
  } else if (seating === Seating.PRIVATE_ROOM) {
    return 'resources/icons/private_room.svg';
  } else if (seating === Seating.HIGH_TABLE) {
    return 'resources/icons/high_table.svg';
  } else {
    return 'resources/icons/standard.svg';
  }
}

export function getSeatingName(seating: Seating) {
  if (seating === Seating.BAR) {
    return 'Bar';
  } else if (seating === Seating.PATIO) {
    return 'Patio';
  } else if (seating === Seating.PRIVATE_ROOM) {
    return 'Private Room';
  } else if (seating === Seating.HIGH_TABLE) {
    return 'High Table';
  } else {
    return 'Standard';
  }
}
