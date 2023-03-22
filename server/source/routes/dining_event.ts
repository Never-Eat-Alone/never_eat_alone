import { arrayToJson, EventCardSummary
} from '../../../client/library/source/definitions';
import { DiningEventDatabase } from '../postgres/queries';

/** DiningEvent Routes class. */
export class DiningEventRoutes {
  /**
   * @param app - Express app.
   * @param diningEventDatabase - The dining events related table manipulation
   * class instance.
   */
  constructor(app: any, diningEventDatabase: DiningEventDatabase) {
    /** Route to get the dining event card summaries on homepage. */
    app.get('/api/home_page/dining_event_card_summaries',
      this.getHomePageDiningEventCardSummaries);

    this.diningEventDatabase = diningEventDatabase;
  }

  private getHomePageDiningEventCardSummaries = async (request, response) => {
    let diningEventCardSummaryList: EventCardSummary[];
    try {
      diningEventCardSummaryList =
        await this.diningEventDatabase.loadHomePageDiningEventCardSummaries();
    } catch (error) {
      response.status(400).json({
        diningEventCardSummaryList: [],
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({
      diningEventCardSummaryList: arrayToJson(diningEventCardSummaryList)
    });
  }

  private diningEventDatabase: DiningEventDatabase;
}
