import { EventCardSummary, EventTag, SocialMediaImage
} from '../../definitions';
import { HomePageModel } from './home_page_model';

export class LocalHomePageModel extends HomePageModel {
  public async load(): Promise<void> {
    return;
  }

  public getImageList(): SocialMediaImage[] {
    return [];
  }

  public getEventList(): EventCardSummary[] {
    return [];
  }

  public getEventTagList(): EventTag[] {
    return [];
  }

  public getUserFutureEventList(): EventCardSummary[] {
    return [];
  }

  public getTotalEventsThisMonth(): number {
    return 2;
  }
}
