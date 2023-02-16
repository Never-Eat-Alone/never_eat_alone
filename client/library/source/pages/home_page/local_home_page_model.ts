import { EventCardSummary, EventTag, SocialMediaImage
} from '../../definitions';
import { HomePageModel } from './home_page_model';

export class LocalHomePageModel extends HomePageModel {
  constructor(imageList: SocialMediaImage[], eventList: EventCardSummary[],
      userEventTagList: EventTag[], userFutureEventList: EventCardSummary[],
      userTotalEventsThisMonth: number) {
    super();
    this._imageList = imageList;
    this._eventList = eventList;
    this._userEventTagList = userEventTagList;
    this._userFutureEventList = userFutureEventList;
    this._userTotalEventsThisMonth = userTotalEventsThisMonth;
  }

  public async load(): Promise<void> {}

  public get imageList(): SocialMediaImage[] {
    return this._imageList;
  }

  public get eventList(): EventCardSummary[] {
    return this._eventList;
  }

  public get userEventTagList(): EventTag[] {
    return this._userEventTagList;
  }

  public get userFutureEventList(): EventCardSummary[] {
    return this._userFutureEventList;
  }

  public get userTotalEventsThisMonth(): number {
    return this._userTotalEventsThisMonth;
  }

  private _imageList: SocialMediaImage[];
  private _eventList: EventCardSummary[];
  private _userEventTagList: EventTag[];
  private _userFutureEventList: EventCardSummary[];
  private _userTotalEventsThisMonth: number;
}
