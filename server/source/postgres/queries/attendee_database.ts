import { Pool } from 'pg';
import { EventCardSummary, EventTag, PriceRange
} from '../../../../client/library/source/definitions';

/** Attendee related database manipulations class. */
export class AttendeeDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns all the user's attended event tags in the current month. */
  public loadHomePageEventTagList = async (userId: number): Promise<
      EventTag[]> => {
    const result = await this.pool.query(
      "SELECT att.event_id, de.color_code, de.title FROM attendees AS att \
      JOIN dining_events AS de ON att.event_id = de.id WHERE att.user_id = $1 \
      AND att.status = 'GOING' AND de.start_at < NOW() AND \
      date_trunc('month', de.start_at) = date_trunc('month', CURRENT_DATE) \
      ORDER BY de.start_at ASC", [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const eventTagList: EventTag[] = [];
    for (const row of result.rows) {
      const eventTag = new EventTag(parseInt(row.event_id), row.title,
        row.color_code);
      eventTagList.push(eventTag);
    }
    return eventTagList;
  }

  public loadUserUpcomingEventsByUserId = async (userId: number): Promise<
      EventCardSummary[]> => {
    const result = await this.pool.query(`
      SELECT re.id AS re_id, de.id AS de_id, de.title AS de_title, \
      de.start_at, de.end_at, de.cover_image_src, re.name AS re_name, \
      re.price_range AS re_price_range, de.total_capacity, de.color_code AS \
      de_color_code FROM dining_events AS de JOIN restaurants AS re ON \
      de.restaurant_id = re.id ORDER BY start_at ASC JOIN attendees AS att ON  
    `, [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const cuisines = (() => {
      return [];
    })();
    const numberOfAttendees = 0;
    const futureEventCards: EventCardSummary[] = result.rows.map((row) => {
      const eventCard = new EventCardSummary(parseInt(row.de_id), row.de_title,
        new Date(Date.parse(row.start_at)), new Date(Date.parse(row.end_at)),
        row.re_name, PriceRange[row.re_price_range as keyof typeof PriceRange],
        cuisines, row.cover_image_src, numberOfAttendees,
        parseInt(row.total_capacity), true, row.de_color_code);
      return eventCard;
    });
    return futureEventCards;
  }

  public loadUserPastEventsByUserId = async (userId: number): Promise<
      EventCardSummary[]> => {
    const result = await this.pool.query(``, [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const cuisines = (() => {
      return [];
    })();
    const pastEventCards: EventCardSummary[] = result.rows.map((row) => {
      const eventCard = new EventCardSummary(parseInt(row.de_id), row.de_title,
        new Date(Date.parse(row.start_at)), new Date(Date.parse(row.end_at)),
        row.re_name, PriceRange[row.re_price_range as keyof typeof PriceRange],
        cuisines, row.cover_image_src, numberOfAttendees, numberOfSeats, true,
        row.de_color_code);
      return eventCard;
    });
    return pastEventCards;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
