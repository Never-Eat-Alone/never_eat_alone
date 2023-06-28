export enum Seating {
  BAR = 'BAR',
  PATIO = 'PATIO',
  STANDARD = 'STANDARD',
  PRIVATE_ROOM = 'PRIVATE_ROOM',
  HIGH_TABLE = 'HIGH_TABLE',
  LOUNGE = 'LOUNGE'
}

export function getSeatingIconSrc(seating: Seating) {
  switch (seating) {
    case Seating.BAR:
      return 'resources/icons/bar.svg';
    case Seating.PATIO:
      return 'resources/icons/patio.svg';
    case Seating.PRIVATE_ROOM:
      return 'resources/icons/private_room.svg';
    case Seating.HIGH_TABLE:
      return 'resources/icons/high_table.svg';
    case Seating.LOUNGE:
      return 'resources/icons/lounge.svg';
    default:
      return 'resources/icons/standard.svg';
  }
}

export function getSeatingName(seating: Seating) {
  switch (seating) {
    case Seating.BAR:
      return 'Bar';
    case Seating.PATIO:
      return 'Patio';
    case Seating.PRIVATE_ROOM:
      return 'Private Room';
    case Seating.HIGH_TABLE:
      return 'High Table';
    case Seating.LOUNGE:
      return 'Lounge';
    default:
      return 'Standard';
  }
}
