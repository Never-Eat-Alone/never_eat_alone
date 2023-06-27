import { arrayToJson, DiningEvent, EventCardSummary } from
  '../../../client/library/source/definitions';
import { AttendeeDatabase } from '../postgres/queries/attendee_database';
import { DiningEventDatabase } from '../postgres/queries/dining_event_database';
import { UserDatabase } from '../postgres/queries/user_database';

/** DiningEvent Routes class. */
export class DiningEventRoutes {
  /**
   * @param app - Express app.
   * @param diningEventDatabase - The dining events related table manipulation
   * class instance.
   * @param userDatabase
   * @param attendeeDatabase
   */
  constructor(app: any, diningEventDatabase: DiningEventDatabase, userDatabase:
      UserDatabase, attendeeDatabase: AttendeeDatabase) {
    /** Route to get the dining event card summaries on homepage. */
    app.get('/api/home_page/event_list/:userId',
      this.getHomePageDiningEventCardSummaries);
    app.get('/api/home_page/user_future_events/:userId',
      this.getUserFutureDiningEventCardSummaries);
    app.get('/api/dining_events/:eventId', this.getDiningEventPage);
    
    this.diningEventDatabase = diningEventDatabase;
    this.userDatabase = userDatabase;
    this.attendeeDatabase = attendeeDatabase;
  }

  private getHomePageDiningEventCardSummaries = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let diningEventCardSummaryList: EventCardSummary[] = [];
    try {
      diningEventCardSummaryList =
        await this.diningEventDatabase.loadHomePageDiningEventCardSummaries(
          userId);
    } catch (error) {
      console.error('Failed at loadHomePageDiningEventCardSummaries', error);
      response.status(500).json({
        diningEventCardSummaryList: diningEventCardSummaryList,
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({
      diningEventCardSummaryList: arrayToJson(diningEventCardSummaryList)
    });
  }

  private getUserFutureDiningEventCardSummaries = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let userFutureEventCardSummaryList: EventCardSummary[] = [];
    if (userId === -1) {
      response.status(200).json({ userFutureEventCardSummaryList: [] });
      return;
    }
    try {
      userFutureEventCardSummaryList =
        await this.diningEventDatabase.loadUserFutureDiningEventCardSummaries(
          userId);
    } catch (error) {
      response.status(500).json({
        userFutureEventCardSummaryList: [],
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({
      userFutureEventCardSummaryList: arrayToJson(
        userFutureEventCardSummaryList)
    });
  }

  private getDiningEventPage = async (request, response) => {
    const eventId = parseInt(request.params.eventId);
    let diningEvent = DiningEvent.empty();
    let isGoing = false;
    try {
      diningEvent = await this.diningEventDatabase.loadDiningEventById(eventId);
    } catch (error) {
      console.error('Failed at loadDiningEventById', error);
      response.status(500).send();
      return;
    }
    if (request.session?.user) {
      try {
        const user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (user.id !== -1) {
          isGoing = await this.attendeeDatabase.isUserGoingByEventId(user.id,
            eventId);
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
      }
    }
    response.status(200).json({
      diningEvent: diningEvent.toJson(),
      isGoing: isGoing
    });
  }

  private diningEventDatabase: DiningEventDatabase;
  private userDatabase: UserDatabase;
  private attendeeDatabase: AttendeeDatabase;
}
