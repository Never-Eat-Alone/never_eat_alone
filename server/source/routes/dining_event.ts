import { arrayToJson, DiningEvent, EventTag, PaymentCard, User,
  UserProfileImage } from '../../../client/library/source/definitions';
import { AttendeeDatabase } from '../postgres/queries/attendee_database';
import { DiningEventDatabase } from '../postgres/queries/dining_event_database';
import { UserDatabase } from '../postgres/queries/user_database';
import { UserProfileImageDatabase } from
  '../postgres/queries/user_profile_image_database';

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
      UserDatabase, attendeeDatabase: AttendeeDatabase,
      userProfileImageDatabase: UserProfileImageDatabase) {
    /** Route to get the dining event card summaries on homepage. */
    app.get('/api/home_page/event_list/:userId',
      this.getHomePageDiningEventCardSummaries);
    app.get('/api/home_page/event_tag_list/:userId',
      this.getHomePageEventTagList);
    app.get('/api/dining_events/:eventId', this.getDiningEventPage);
    app.post('/api/dining_events/:eventId/join', this.joinEvent);
    app.post('/api/dining_events/:eventId/remove_seat', this.removeSeat);
    app.get('/api/checkout_dining_event/:eventId',
      this.getDiningEventCheckoutModal);

    this.diningEventDatabase = diningEventDatabase;
    this.userDatabase = userDatabase;
    this.attendeeDatabase = attendeeDatabase;
    this.userProfileImageDatabase = userProfileImageDatabase;
  }

  /** Responds with all future events that the user has not joined yet. */
  private getHomePageDiningEventCardSummaries = async (request, response) => {
    const userId = parseInt(request.params.userId);
    try {
      const { exploreEventList, userUpcomingEventList } =
        await this.diningEventDatabase.loadHomePageDiningEventCardSummaries(
          userId);
      const pastEventList = 
        await this.diningEventDatabase.loadHomePagePastEventList(userId);
      response.status(200).json({
        exploreEventList: arrayToJson(exploreEventList),
        pastEventList: arrayToJson(pastEventList),
        userUpcomingEventList: arrayToJson(userUpcomingEventList)
      });
    } catch (error) {
      console.error('Failed at loadHomePageDiningEventCardSummaries', error);
      response.status(500).json({
        diningEventCardSummaryList: [],
        message: 'DATABASE_ERROR'
      });
    }
  }

  private getHomePageEventTagList = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let eventTagList: EventTag[];
    try {
      eventTagList = await this.attendeeDatabase.loadHomePageEventTagList(
        userId);
    } catch (error) {
      console.error('Failed at loadHomePageEventTagList', error);
      response.status(500).json({
        eventTagList: [],
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({ eventTagList: arrayToJson(eventTagList) });
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
    if (request.session?.user_id && request.session.user_id !== -1) {
      try {
        const user = await this.userDatabase.loadUserById(
          request.session.user_id);
        isGoing = await this.attendeeDatabase.isUserGoingByEventId(user.id,
          eventId);
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
      }
    }
    response.status(200).json({
      diningEvent: diningEvent.toJson(),
      isGoing: isGoing
    });
  }

  private joinEvent = async (request, response) => {
    const eventId = parseInt(request.params.eventId);
    let user = User.makeGuest();
    if (request.session?.user_id) {
      try {
        user = await this.userDatabase.loadUserById(request.session.user_id);
        if (user.id === -1) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    let imageSrc = UserProfileImage.default(user.id).src;
    try {
      imageSrc = (await this.userProfileImageDatabase.loadProfileImageByUserId(
        user.id)).src;
    } catch (error) {
      console.error('Failed at loadProfileImageByUserId', error);
    }
    try {
      await this.attendeeDatabase.joinEvent(user.id, eventId);
      response.status(200).json({
        accountId: user.id,
        accountName: user.name,
        profileImageSrc: imageSrc
      });
    } catch (error) {
      console.error('Failed at joinEvent', error);
      response.status(500).send();
      return;
    }
  }

  private removeSeat = async (request, response) => {
    const eventId = parseInt(request.params.eventId);
    let user = User.makeGuest();
    if (request.session?.user_id) {
      try {
        user = await this.userDatabase.loadUserById(request.session.user_id);
        if (user.id === -1) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    let imageSrc = UserProfileImage.default(user.id).src;
    try {
      imageSrc = (await this.userProfileImageDatabase.loadProfileImageByUserId(
        user.id)).src;
    } catch (error) {
      console.error('Failed at loadProfileImageByUserId', error);
    }
    try {
      await this.attendeeDatabase.removeSeat(user.id, eventId);
      response.status(200).json({
        accountId: user.id,
        accountName: user.name,
        profileImageSrc: imageSrc
      });
    } catch (error) {
      console.error('Failed at removeSeat', error);
      response.status(500).send();
      return;
    }
  }

  private getDiningEventCheckoutModal = async (request, response) => {
    const eventId = parseInt(request.params.eventId);
    let user = User.makeGuest();
    if (request.session?.user_id) {
      try {
        user = await this.userDatabase.loadUserById(request.session.user_id);
        if (user.id === -1) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    let diningEvent: DiningEvent;
    try {
      diningEvent = await this.diningEventDatabase.loadDiningEventById(eventId);
    } catch (error) {
      console.error('Failed at loadDiningEventById', error);
      response.status(500).send();
      return;
    }
    let paymentCardList: PaymentCard[] = [];

    let defaultPaymentCard: PaymentCard = PaymentCard.noCard();

    response.status(200).json({
      diningEvent: diningEvent.toJson(),
      paymentCardList: arrayToJson(paymentCardList),
      defaultPaymentCard: defaultPaymentCard.toJson()
    });
  }

  private diningEventDatabase: DiningEventDatabase;
  private userDatabase: UserDatabase;
  private attendeeDatabase: AttendeeDatabase;
  private userProfileImageDatabase: UserProfileImageDatabase;
}
