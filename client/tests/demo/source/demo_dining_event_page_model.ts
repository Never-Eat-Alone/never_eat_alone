import * as NeverEatAlone from 'never_eat_alone';

export class DemoDiningEventPageModel extends
    NeverEatAlone.DiningEventPageModel {
  constructor(diningEvent: NeverEatAlone.DiningEvent, isGoing: boolean) {
    super();
    this._isLoaded = false;
    this._diningEvent = diningEvent;
    this._isGoing = isGoing;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): NeverEatAlone.DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public get isGoing(): boolean {
    this.ensureIsLoaded();
    return this._isGoing;
  }

  public async joinEvent(account: NeverEatAlone.User, profileImageSrc: string
      ): Promise<boolean> {
    const index = this._diningEvent.attendeeList.findIndex(a => a.userId ===
      account.id);
    if (index !== -1) {
      if (this._diningEvent.attendeeList[index].status ===
          NeverEatAlone.AttendeeStatus.GOING) {
        return false;
      }
      this._diningEvent.attendeeList.splice(index, 1);
    }
    this._diningEvent.attendeeList.push(new NeverEatAlone.Attendee(account.id,
      this._diningEvent.id, account.name, 0, NeverEatAlone.AttendeeStatus.GOING,
      profileImageSrc, new Date()));
    return true;
  }

  public async removeSeat(account: NeverEatAlone.User): Promise<boolean> {
    const index = this._diningEvent.attendeeList.findIndex(a => a.userId ===
      account.id);
    if (index !== -1) {
      this._diningEvent.attendeeList.splice(index, 1);
      return true;
    }
    return false;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: NeverEatAlone.DiningEvent;
  private _isGoing: boolean;
}
