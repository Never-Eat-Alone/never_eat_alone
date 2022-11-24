import * as NeverEatAlone from 'never_eat_alone';

export class DemoDiningEventPageModel extends
    NeverEatAlone.DiningEventPageModel {
  constructor(eventId: number, eventColor: string, eventFee: number,
      coverImageSrc: string, title: string, restaurant:
      NeverEatAlone.Restaurant, dressCode: NeverEatAlone.DressCode,
      seating: NeverEatAlone.Seating, location: NeverEatAlone.Location,
      reservationName: string, startTime: Date, endTime: Date, attendeeList:
      NeverEatAlone.Attendee[], totalCapacity: number, description: string,
      isGoing: boolean, isRSVPOpen: boolean) {
    super();
    this._eventId = eventId;
    this._eventColor = eventColor;
    this._eventFee = eventFee;
    this._coverImageSrc = coverImageSrc;
    this._title = title;
    this._restaurant = restaurant;
    this._dressCode = dressCode;
    this._seating = seating;
    this._location = location;
    this._reservationName = reservationName;
    this._startTime = startTime;
    this._endTime = endTime;
    this._attendeeList = attendeeList;
    this._totalCapacity = totalCapacity;
    this._description = description;
    this._isGoing = isGoing;
    this._isRSVPOpen = isRSVPOpen;
  }

  public async load(): Promise<void> {
    return;
  }

  public get eventId(): number {
    return this._eventId;
  }

  public get eventColor(): string {
    return this._eventColor;
  }

  public get eventFee(): number {
    return this._eventFee;
  }

  public get coverImageSrc(): string {
    return this._coverImageSrc;
  }

  public get title(): string {
    return this._title;
  }

  public get restaurant(): NeverEatAlone.Restaurant {
    return this._restaurant;
  }

  public get dressCode(): NeverEatAlone.DressCode {
    return this._dressCode;
  }

  public get seating(): NeverEatAlone.Seating {
    return this._seating;
  }

  public get location(): NeverEatAlone.Location {
    return this._location;
  }

  public get reservationName(): string {
    return this._reservationName;
  }

  public get startTime(): Date {
    return this._startTime;
  }

  public get endTime(): Date {
    return this._endTime;
  }

  public get attendeeList(): NeverEatAlone.Attendee[] {
    return this._attendeeList;
  }

  public get totalCapacity(): number {
    return this._totalCapacity;
  }

  public get description(): string {
    return this._description;
  }

  public get isGoing(): boolean {
    return this._isGoing;
  }

  public get isRSVPOpen(): boolean {
    return this._isRSVPOpen;
  }

  public async joinEvent(account: NeverEatAlone.User, profileImageSrc: string
      ): Promise<void> {
    const index = this._attendeeList.findIndex((a) => a.userId === account.id);
    if (index !== -1) {
      if (this._attendeeList[index].status ===
          NeverEatAlone.AttendeeStatus.GOING) {
        return;
      }
      this._attendeeList.splice(index, 1);
    }
    this._attendeeList.push(new NeverEatAlone.Attendee(account.id,
      this._eventId, account.name, 0, NeverEatAlone.AttendeeStatus.GOING,
      profileImageSrc, new Date()));
    return;
  }

  public async removeSeat(account: NeverEatAlone.User): Promise<void> {
    const index = this._attendeeList.findIndex((a) => a.userId === account.id);
    if (index !== -1) {
      this._attendeeList.splice(index, 1);
    }
    return;
  }

  private _eventId: number;
  private _eventColor: string;
  private _eventFee: number;
  private _coverImageSrc: string;
  private _title: string;
  private _restaurant: NeverEatAlone.Restaurant;
  private _dressCode: NeverEatAlone.DressCode;
  private _seating: NeverEatAlone.Seating;
  private _location: NeverEatAlone.Location;
  private _reservationName: string;
  private _startTime: Date;
  private _endTime: Date;
  private _attendeeList: NeverEatAlone.Attendee[];
  private _totalCapacity: number;
  private _description: string;
  private _isGoing: boolean;
  private _isRSVPOpen: boolean;
}
