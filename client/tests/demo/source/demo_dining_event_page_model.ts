import * as NeverEatAlone from 'never_eat_alone';

export class DemoDiningEventPageModel extends
    NeverEatAlone.DiningEventPageModel {
  constructor(diningEvent: NeverEatAlone.DiningEvent) {
    super();
    this._isLoaded = false;
    this._diningEvent = diningEvent;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): NeverEatAlone.DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public async joinEvent(accountId: number, accountName: string,
      profileImageSrc: string): Promise<void> {
    this.ensureIsLoaded();
    this.diningEvent.joinEvent(accountId, accountName, profileImageSrc);
  }

  public async removeSeat(accountId: number, accountName: string,
      profileImageSrc: string): Promise<void> {
    this.ensureIsLoaded();
    this._diningEvent.removeSeat(accountId, accountName, profileImageSrc);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _diningEvent: NeverEatAlone.DiningEvent;
}
