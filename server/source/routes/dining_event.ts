import { arrayToJson, Attendee, CoverImage, DressCode, EventCardSummary,
  Location, Seating } from '../../../client/library/source/definitions';
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
    app.get('/api/home_page/event_list/:userId',
      this.getHomePageDiningEventCardSummaries);
    app.get('/api/home_page/user_future_events/:userId',
      this.getUserFutureDiningEventCardSummaries);
    app.get('/api/dining_events/:eventId', this.getDiningEventPage);
    this.diningEventDatabase = diningEventDatabase;
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
    let eventColor = '';
    let eventFee = 5.00;
    let coverImageSrc = CoverImage.default().src;
    let title = '';
    let restaurant = null;
    let dressCode = DressCode.CASUAL;
    let seating = Seating.STANDARD;
    let location = Location.empty();
    let reservationName = 'NeverEatAlone Social Group';
    let startTime = new Date();
    let endTime = new Date();
    const attendeeList: Attendee[] = [];
    let totalCapacity = 0;
    let description = '';
    let isGoing = false;
    let isRSVPOpen = false;
    response.status(200).json({
      eventColor: eventColor,
      eventFee: eventFee,
      coverImageSrc: coverImageSrc,
      title: title,
      restaurant: restaurant.toJson(),
      dressCode: dressCode,
      seating: seating,
      location: location.toJson(),
      reservationName: reservationName,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      attendeeList: arrayToJson(attendeeList),
      totalCapacity: totalCapacity,
      description: description,
      isGoing: isGoing,
      isRSVPOpen: isRSVPOpen
    });
  }

  private diningEventDatabase: DiningEventDatabase;
}
