import { arrayToJson, DiningEvent, EventCardSummary
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
    app.get('/api/dining_events/:eventId', this.getDiningEventById);
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

  private getDiningEventById = async (request, response) => {
    const eventId = parseInt(request.params.eventId);
    let diningEvent: DiningEvent;
    try {
      diningEvent = null;
    } catch (error) {
      response.status(400).json({
        error: 'Bad Request: Please provide valid data.'
      });
      return;
    }
    response.status(200);
  }

  private diningEventDatabase: DiningEventDatabase;
}
