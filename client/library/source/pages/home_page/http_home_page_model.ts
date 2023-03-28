import { EventCardSummary, EventTag, SocialMediaImage, User
} from '../../definitions';
import { HomePageModel } from './home_page_model';
import { LocalHomePageModel } from './local_home_page_model';

export class HttpHomePageModel extends HomePageModel {
  constructor(account: User) {
    super();
    this._account = account;
  }

  public async load(): Promise<void> {
    const imageList: SocialMediaImage[] = [];
    const imageListResponse = await fetch('/api/home_page/social_media_images');
    if (imageListResponse.status === 200) {
      const imageListObject = await imageListResponse.json();
      for (const image of imageListObject.socialMediaImages) {
        imageList.push(SocialMediaImage.fromJson(image));
      }
    }
    const eventList: EventCardSummary[] = [];
    const eventListResponse = await fetch(
      `/api/home_page/event_list/${this._account.id}`);
    if (eventListResponse.status === 200) {
      const eventListObject = await eventListResponse.json();
      for (const event of eventListObject.eventList) {
        eventList.push(EventCardSummary.fromJson(event));
      }
    }
    const userEventTagList: EventTag[] = [];
    const eventTagListResponse = await fetch(
      `/api/home_page/event_tag_list/${this._account.id}`);
    if (eventTagListResponse.status === 200) {
      const eventTagListObject = await eventTagListResponse.json();
      for (const tag of eventTagListObject.eventTagList) {
        userEventTagList.push(EventTag.fromJson(tag));
      }
    }
    const totalEventsAttendedThisMonth = userEventTagList.length;
    const userFutureEventCardSummaryList: EventCardSummary[] = [];
    const userFutureEventsResponse = await fetch(
      `/api/home_page/user_future_events/${this._account.id}`);
    if (userFutureEventsResponse.status === 200) {
      const userFutureEventsObject = await userFutureEventsResponse.json();
      for (const futureEvent of
          userFutureEventsObject.userFutureEventCardSummaryList) {
        userFutureEventCardSummaryList.push(EventCardSummary.fromJson(
          futureEvent));
      }
    }
    this._model = new LocalHomePageModel(imageList, eventList, userEventTagList,
      userFutureEventCardSummaryList, totalEventsAttendedThisMonth);
    this._model.load();
  }

  public get imageList(): SocialMediaImage[] {
    return this._model.imageList;
  }

  public get eventList(): EventCardSummary[] {
    return this._model.eventList;
  }

  public get userEventTagList(): EventTag[] {
    return this._model.userEventTagList;
  }

  public get userFutureEventList(): EventCardSummary[] {
    return this._model.userFutureEventList;
  }

  public get userTotalEventsThisMonth(): number {
    return this._model.userTotalEventsThisMonth;
  }

  private _account: User;
  private _model: HomePageModel;
}
