import { EventCardSummary, EventTag, SocialMediaImage
} from '../../definitions';
import { HomePageModel } from './home_page_model';

export class LocalHomePageModel extends HomePageModel {
  constructor(imageList: SocialMediaImage[], eventList: EventCardSummary[],
      eventTagList: EventTag[], userFutureEventList: EventCardSummary[],
      totalEventsThisMonth: number) {
    super();
    this._imageList = imageList;
    this._eventList = eventList;
    this._eventTagList = eventTagList;
    this._userFutureEventList = userFutureEventList;
    this._totalEventsThisMonth = totalEventsThisMonth;
  }

  public async load(): Promise<void> {
    return;
  }

  public getImageList(): SocialMediaImage[] {
    return this._imageList;
  }

  public getEventList(): EventCardSummary[] {
    return this._eventList;
  }

  public getEventTagList(): EventTag[] {
    return this._eventTagList;
  }

  public getUserFutureEventList(): EventCardSummary[] {
    return this._userFutureEventList;
  }

  public getTotalEventsThisMonth(): number {
    return this._totalEventsThisMonth;
  }

  private _imageList: SocialMediaImage[];
  private _eventList: EventCardSummary[];
  private _eventTagList: EventTag[];
  private _userFutureEventList: EventCardSummary[];
  private _totalEventsThisMonth: number;
}
