import { EventCardSummary, EventTag, SocialMediaImage } from
  '../../definitions';
import { HomePageModel } from './home_page_model';

/** Implements the HomePageModel in memory. */
export class LocalHomePageModel extends HomePageModel {
  constructor(imageList: SocialMediaImage[], eventList: EventCardSummary[],
      userEventTagList: EventTag[], userFutureEventList: EventCardSummary[],
      userTotalEventsThisMonth: number) {
    super();
    this._isLoaded = false;
    this._imageList = imageList;
    this._eventList = eventList;
    this._userEventTagList = userEventTagList;
    this._userFutureEventList = userFutureEventList;
    this._userTotalEventsThisMonth = userTotalEventsThisMonth;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public async updateEventLists(): Promise<void> {
    await this.load();
  }

  public get imageList(): SocialMediaImage[] {
    this.ensureIsLoaded();
    return this._imageList;
  }

  public get eventList(): EventCardSummary[] {
    this.ensureIsLoaded();
    return this._eventList;
  }

  public get userEventTagList(): EventTag[] {
    this.ensureIsLoaded();
    return this._userEventTagList;
  }

  public get userFutureEventList(): EventCardSummary[] {
    this.ensureIsLoaded();
    return this._userFutureEventList;
  }

  public get userTotalEventsThisMonth(): number {
    this.ensureIsLoaded();
    return this._userTotalEventsThisMonth;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('HomePageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _imageList: SocialMediaImage[];
  private _eventList: EventCardSummary[];
  private _userEventTagList: EventTag[];
  private _userFutureEventList: EventCardSummary[];
  private _userTotalEventsThisMonth: number;
}
