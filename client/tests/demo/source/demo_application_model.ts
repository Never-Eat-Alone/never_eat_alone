import * as NeverEatAlone from 'never_eat_alone';

/** Implements the ApplicationModel for demo purposes. */
export class DemoApplicationModel extends NeverEatAlone.ApplicationModel {
  public load(): Promise<void> {
    this._headerModel = new NeverEatAlone.LocalHeaderModel();
    this._account = NeverEatAlone.User.makeGuest();
    const imageList: NeverEatAlone.SocialMediaImage[] = [];
    const eventList: NeverEatAlone.EventCardSummary[] = [];
    const eventTagList: NeverEatAlone.EventTag[] = [];
    const userFutureEventList: NeverEatAlone.EventCardSummary[] = [];
    const totalEventsThisMonth: number = 0;
    this._homePageModel = new NeverEatAlone.LocalHomePageModel(imageList,
      eventList, eventTagList, userFutureEventList, totalEventsThisMonth);
    return;
  }

  public getAccount(): NeverEatAlone.User {
    return this._account;
  }

  public getHeaderModel(): NeverEatAlone.HeaderModel {
    return this._headerModel;
  }

  public getHomePageModel(): NeverEatAlone.HomePageModel {
    return this._homePageModel;
  }

  _headerModel: NeverEatAlone.HeaderModel;
  _account: NeverEatAlone.User;
  _homePageModel: NeverEatAlone.HomePageModel;
}
