import { arrayFromJson, EventCardSummary, EventTag, SocialMediaImage, User }
  from '../../definitions';
import { EmptyHomePageModel } from './empty_home_page_model';
import { HomePageModel } from './home_page_model';
import { LocalHomePageModel } from './local_home_page_model';

export class HttpHomePageModel extends HomePageModel {
  constructor(account: User) {
    super();
    this._isLoaded = false;
    this._account = account;
    this._model = new EmptyHomePageModel();
  }

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const imageList: SocialMediaImage[] = [];
    const imageListResponse = await fetch('/api/home_page/social_media_images');
    if (imageListResponse.status === 200) {
      const imageListObject = await imageListResponse.json();
      for (const image of imageListObject.socialMediaImages) {
        imageList.push(SocialMediaImage.fromJson(image));
      }
    }
    const eventListResponse = await fetch(
      `/api/home_page/event_list/${this._account.id}`);
    if (eventListResponse.status !== 200) {
      throw new Error('Failed to load future events.');
    }
    const eventListObject = await eventListResponse.json();
    const exploreEventList: EventCardSummary[] = arrayFromJson(EventCardSummary,
      eventListObject.exploreEventList);
    const userUpcomingEventList: EventCardSummary[] = arrayFromJson(
      EventCardSummary, eventListObject.userUpcomingEventList);
    const userEventTagList: EventTag[] = [];
    const eventTagListResponse = await fetch(
      `/api/home_page/event_tag_list/${this._account.id}`);
    if (eventTagListResponse.status === 200) {
      const eventTagListObject = await eventTagListResponse.json();
      for (const tag of eventTagListObject.eventTagList) {
        userEventTagList.push(EventTag.fromJson(tag));
      }
    }
    this._model = new LocalHomePageModel(imageList, exploreEventList,
      userEventTagList, userUpcomingEventList, userEventTagList.length);
    await this._model.load();
    this._isLoaded = true;
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

  private _isLoaded: boolean;
  private _account: User;
  private _model: HomePageModel;
}
