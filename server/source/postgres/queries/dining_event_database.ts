import { Pool } from 'pg';
import { Cuisine, EventCardSummary, PriceRange
} from '../../../../client/library/source/definitions';

/** SocialMediaImage related database manipulations class. */
export class DiningEventDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public loadHomePageDiningEventCardSummaries = async (userId: number): Promise<
      EventCardSummary[]> => {
    const result = await this.pool.query(
      'SELECT re.id AS re_id, de.id AS de_id, de.title AS de_title, \
      de.start_at, de.end_at, de.cover_image_src, re.name AS re_name, \
      re.price_range AS re_price_range, de.total_capacity, de.color_code AS \
      de_color_code FROM dining_events AS de JOIN restaurants AS re ON \
      de.restaurant_id = re.id ORDER BY start_at DESC LIMIT $1', [7]);
    if (result.rows?.length === 0) {
      return [];
    }
    const events: EventCardSummary[] = [];
    for (const row of result.rows) {
      let tempResult = await this.pool.query('SELECT cu.* FROM cuisines AS cu \
        JOIN restaurant_cuisines AS re ON re.cuisine_id = cu.id WHERE \
        re.restaurant_id = $1 LIMIT 10', [row.re_id]);
      const cuisines = tempResult.rows.map(row => {
        return new Cuisine(parseInt(row.id), row.label, row.color_code);
      });
      let numberOfAttendees = 0;
      let numberOfSeatsAvailable = parseInt(row.total_capacity);
      tempResult = await this.pool.query(
        "SELECT COUNT (event_id) AS total FROM attendees WHERE event_id = $1 \
        AND status = 'GOING'", [row.de_id]);
      if (tempResult.rows?.length !== 0) {
        numberOfAttendees = parseInt(tempResult.rows[0].total);
        numberOfSeatsAvailable -= numberOfAttendees;
      }
      let isAttending: boolean = false;
      if (userId !== -1) {
        tempResult = await this.pool.query("SELECT * FROM attendees WHERE \
        event_id = $1 AND user_id = $2 AND status = 'GOING'", [row.de_id,
        userId]);
        if (tempResult.rows?.length !== 0) {
          isAttending = true;
        }
      }
      const event = new EventCardSummary(parseInt(row.de_id), row.de_title,
        new Date(Date.parse(row.start_at)), new Date(Date.parse(row.end_at)),
        row.re_name, PriceRange[row.re_price_range as keyof typeof PriceRange],
        cuisines, row.cover_image_src, numberOfAttendees,
        numberOfSeatsAvailable, isAttending, row.de_color_code);
      events.push(event);
    }
    return events;
  }

  public loadUserFutureDiningEventCardSummaries = async (
      userId: number): Promise<EventCardSummary[]> => {
    const result = await this.pool.query(
      "SELECT att.event_id, de.title, de.start_at, de.end_at, \
      de.restaurant_id, de.cover_image_src, de.total_capacity, de.color_code, \
      re.name, re.price_range FROM attendees AS att JOIN dining_events AS de \
      ON att.event_id = de.id JOIN restaurants AS re ON \
      re.id = de.restaurant_id WHERE att.user_id = $1 AND att.status = 'GOING' \
      AND de.start_at >= NOW() ORDER BY de.start_at ASC", [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const events: EventCardSummary[] = [];
    for (const row of result.rows) {
      let tempResult = await this.pool.query('SELECT cu.* FROM cuisines AS cu \
        JOIN restaurant_cuisines AS re ON re.cuisine_id = cu.id WHERE \
        re.restaurant_id = $1 LIMIT 10', [row.restaurant_id]);
      const cuisines = tempResult.rows.map(row => {
        return new Cuisine(parseInt(row.id), row.label, row.color_code);
      });
      let numberOfAttendees = 0;
      let numberOfSeatsAvailable = parseInt(row.total_capacity);
      tempResult = await this.pool.query(
        "SELECT COUNT (event_id) AS total FROM attendees WHERE event_id = $1 \
        AND status = 'GOING'", [row.event_id]);
      if (tempResult.rows?.length !== 0) {
        numberOfAttendees = parseInt(tempResult.rows[0].total);
        numberOfSeatsAvailable -= numberOfAttendees;
      }
      const event = new EventCardSummary(parseInt(row.event_id), row.title,
        new Date(Date.parse(row.start_at)), new Date(Date.parse(row.end_at)),
        row.name, PriceRange[row.price_range as keyof typeof PriceRange],
        cuisines, row.cover_image_src, numberOfAttendees,
        numberOfSeatsAvailable, true, row.color_code);
      events.push(event);
    }
    return events;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
