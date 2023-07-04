import * as NeverEatAlone from 'never_eat_alone';

export class DemoDiningEventPageModel extends
    NeverEatAlone.DiningEventPageModel {
  constructor(account: NeverEatAlone.User, profileImageSrc: string, diningEvent:
      NeverEatAlone.DiningEvent) {
    super();
    this._isLoaded = false;
    this._account = account;
    this._profileImageSrc = profileImageSrc;
    this._diningEvent = diningEvent;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get diningEvent(): NeverEatAlone.DiningEvent {
    this.ensureIsLoaded();
    return this._diningEvent;
  }

  public async joinEvent(): Promise<void> {
    this.ensureIsLoaded();
    this.diningEvent.joinEvent(this._account.id, this._account.name,
      this._profileImageSrc);
  }

  public async removeSeat(): Promise<void> {
    this.ensureIsLoaded();
    this._diningEvent.removeSeat(this._account.id, this._account.userName,
      this._profileImageSrc);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('DiningEventPageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _account: NeverEatAlone.User;
  private _profileImageSrc: string;
  private _diningEvent: NeverEatAlone.DiningEvent;
}
