import * as NeverEatAlone from 'never_eat_alone';

/** Implements the ApplicationModel for demo purposes. */
export class DemoApplicationModel extends NeverEatAlone.ApplicationModel {
  public load(): Promise<void> {
    this._headerModel = new NeverEatAlone.LocalHeaderModel();
    this._account = NeverEatAlone.User.makeGuest();
    return;
  }

  public getAccount(): NeverEatAlone.User {
    return this._account;
  }

  public getHeaderModel(): NeverEatAlone.HeaderModel {
    return this._headerModel;
  }

  _headerModel: NeverEatAlone.HeaderModel;
  _account: NeverEatAlone.User;
}