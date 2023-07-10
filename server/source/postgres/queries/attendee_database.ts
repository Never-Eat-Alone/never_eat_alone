import { Pool } from 'pg';
import { Cuisine, EventCardSummary, EventTag, PriceRange } from
  '../../../../client/library/source/definitions';

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
    const eventTagList: EventTag[] = result.rows.map((row) => {
      const eventTag = new EventTag(parseInt(row.event_id), row.title,
        row.color_code);
      return eventTag;
    });
    return eventTagList;
  }

  public loadUserUpcomingEventsByUserId = async (userId: number): Promise<
      EventCardSummary[]> => {
    if (!userId || userId === -1) {
      return [];
    }
    const query = `
    SELECT
      re.id AS re_id,
      de.id AS de_id,
      de.title AS de_title,
      de.start_at,
      de.end_at,
      de.cover_image_src,
      re.name AS re_name,
      re.price_range AS re_price_range,
      de.total_capacity,
      de.color_code AS de_color_code
    FROM
      dining_events AS de
    JOIN
      restaurants AS re ON de.restaurant_id = re.id
    JOIN
      attendees AS att ON de.id = att.event_id
    WHERE
      de.start_at > NOW() AT TIME ZONE 'UTC' AND
      de.status = 'ACTIVE' AND
      att.user_id = $1 AND att.status = 'GOING'
    ORDER BY
      de.start_at ASC
    `;
    const result = await this.pool.query(query, [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const futureEventCards: EventCardSummary[] = [];
    for (const row of result.rows) {
      const cuisinesResult = await this.pool.query(
        `SELECT cu.*
        FROM cuisines AS cu
        JOIN restaurant_cuisines AS rc ON rc.cuisine_id = cu.id
        WHERE rc.restaurant_id = $1
        LIMIT 10`, [parseInt(row.re_id)]);
      const cuisines = cuisinesResult.rows.map(cuisineRow => {
        return new Cuisine(parseInt(cuisineRow.id), cuisineRow.label,
          cuisineRow.color_code);
      });
      const attendeesResult = await this.pool.query(
        `SELECT COUNT(event_id) AS total
        FROM attendees
        WHERE event_id = $1 AND status = 'GOING'`, [parseInt(row.de_id)]);
      const numberOfAttendees = parseInt(attendeesResult.rows[0].total);
      const eventCard = new EventCardSummary(parseInt(row.de_id), row.de_title,
        new Date(Date.parse(row.start_at)), new Date(Date.parse(row.end_at)),
        row.re_name, PriceRange[row.re_price_range as keyof typeof PriceRange],
        cuisines, row.cover_image_src, numberOfAttendees,
        parseInt(row.total_capacity), true, row.de_color_code);
      futureEventCards.push(eventCard);
    }
    return futureEventCards;
  }

  public loadUserPastEventsByUserId = async (userId: number): Promise<
      EventCardSummary[]> => {
    const result = await this.pool.query(
      `SELECT de.id AS de_id, de.title AS de_title, de.start_at, de.end_at,
      de.cover_image_src, re.id AS re_id, re.name AS re_name, re.price_range AS
      re_price_range, de.total_capacity, de.color_code AS de_color_code,
      SUM(att.guest_count + 1) AS total,
      ARRAY_AGG(c.id) AS cuisine_ids, ARRAY_AGG(c.label) AS cuisine_labels,
      ARRAY_AGG(c.color_code) AS cuisine_colors
      FROM dining_events AS de
      JOIN attendees AS att ON de.id = att.event_id
      JOIN restaurants AS re ON de.restaurant_id = re.id
      JOIN restaurant_cuisines AS r_c ON re.id = r_c.restaurant_id
      JOIN cuisines AS c ON r_c.cuisine_id = c.id
      WHERE att.user_id = $1 AND att.status = 'GOING' AND
      de.end_at <= NOW() AT TIME ZONE 'UTC'
      GROUP BY de.id, re.id
      ORDER BY de.start_at ASC`, 
      [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const pastEventCards: EventCardSummary[] = [];
    for (const row of result.rows) {
      const cuisines: Cuisine[] = row.cuisine_labels.map((label: string,
          index: number) => {
        return new Cuisine(parseInt(row.cuisine_ids[index]), label,
          row.cuisine_colors[index]);
      });
      const eventCard = new EventCardSummary(parseInt(row.de_id), row.de_title,
        new Date(Date.parse(row.start_at)), new Date(Date.parse(row.end_at)),
        row.re_name, PriceRange[row.re_price_range as keyof typeof PriceRange],
        cuisines, row.cover_image_src, parseInt(row.total),
        parseInt(row.total_capacity), true, row.de_color_code);
      pastEventCards.push(eventCard);
    }
    return pastEventCards;
  }

  public isUserGoingByEventId = async (userId: number, eventId: number):
      Promise<boolean> => {
    const result = await this.pool.query(`SELECT * FROM attendees WHERE user_id
      = $1 AND event_id = $2 AND status = 'GOING'`, [userId, eventId]);
    if (result.rows?.length === 1) {
      return true;
    }
    return false;
  }

  public joinEvent = async (userId: number, eventId: number): Promise<void> => {
    await this.pool.query(`INSERT INTO attendees (user_id, event_id, status,
      guest_count) VALUES ($1, $2, 'GOING', 0) ON CONFLICT (user_id, event_id)
      DO UPDATE SET status = 'GOING', updated_at = NOW()`, [userId, eventId]);
  }

  public removeSeat = async (userId: number, eventId: number): Promise<
      void> => {
    await this.pool.query(`UPDATE attendees SET status = 'NOT_GOING', updated_at
      = NOW() WHERE user_id = $1 AND event_id = $2`, [userId, eventId]);
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
