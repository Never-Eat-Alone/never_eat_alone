import { arrayToJson, EventTag
} from '../../../client/library/source/definitions';
import { AttendeeDatabase } from '../postgres/queries';

/** Attendee Routes class. */
export class AttendeeRoutes {
  /**
   * @param app - Express app.
   * @param attendeeDatabase - The attendee related table manipulation
   * class instance.
   */
  constructor(app: any, attendeeDatabase: AttendeeDatabase) {
    /** Route to get the user's event tag list on homepage. */
    app.get('/api/home_page/event_tag_list/:userId',
      this.getHomePageEventTagList);
    this.attendeeDatabase = attendeeDatabase;
  }

  private getHomePageEventTagList = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let eventTagList: EventTag[];
    try {
      eventTagList = await this.attendeeDatabase.loadHomePageEventTagList(
        userId);
    } catch (error) {
      console.log('Failed at loadHomePageEventTagList', error);
      response.status(500).json({
        eventTagList: [],
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({ eventTagList: arrayToJson(eventTagList) });
  }

  private attendeeDatabase: AttendeeDatabase;
}
