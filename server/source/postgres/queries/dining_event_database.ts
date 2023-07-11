import { Pool } from 'pg';
import { Attendee, AttendeeStatus, Cuisine, DiningEvent, DressCode,
  EventCardSummary, EventStatus, EventType, Location, PriceRange, Restaurant,
  Seating } from '../../../../client/library/source/definitions';

/** SocialMediaImage related database manipulations class. */
export class DiningEventDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public loadHomePageDiningEventCardSummaries = async (userId: number): Promise<
      { exploreEventList: EventCardSummary[], userUpcomingEventList:
        EventCardSummary[] }> => {
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
      WHERE
        de.start_at > NOW() AT TIME ZONE 'UTC' AND de.status = 'ACTIVE' AND
        de.type = 'PUBLIC'
      ORDER BY
        de.start_at ASC
    `;
    const result = await this.pool.query(query);
    if (result.rows?.length === 0) {
      return { exploreEventList: [], userUpcomingEventList: [] };
    }
    const exploreEventList: EventCardSummary[] = [];
    const userUpcomingEventList: EventCardSummary[] = [];
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
      let isAttending = false;
      if (userId !== -1) {
        const attendingResult = await this.pool.query(
          `SELECT * FROM attendees
          WHERE event_id = $1 AND user_id = $2 AND status = 'GOING'`,
          [row.de_id, userId]);
        if (attendingResult.rows?.length !== 0) {
          isAttending = true;
          userUpcomingEventList.push(
            new EventCardSummary(
              parseInt(row.de_id),
              row.de_title,
              new Date(row.start_at),
              new Date(row.end_at),
              row.re_name,
              PriceRange[row.re_price_range as keyof typeof PriceRange],
              cuisines,
              row.cover_image_src,
              numberOfAttendees,
              parseInt(row.total_capacity),
              isAttending,
              row.de_color_code
            )
          );
        } else {
          exploreEventList.push(
            new EventCardSummary(
              parseInt(row.de_id),
              row.de_title,
              new Date(row.start_at),
              new Date(row.end_at),
              row.re_name,
              PriceRange[row.re_price_range as keyof typeof PriceRange],
              cuisines,
              row.cover_image_src,
              numberOfAttendees,
              parseInt(row.total_capacity),
              isAttending,
              row.de_color_code
            )
          );
        }
      } else {
        exploreEventList.push(
          new EventCardSummary(
            parseInt(row.de_id),
            row.de_title,
            new Date(row.start_at),
            new Date(row.end_at),
            row.re_name,
            PriceRange[row.re_price_range as keyof typeof PriceRange],
            cuisines,
            row.cover_image_src,
            numberOfAttendees,
            parseInt(row.total_capacity),
            isAttending,
            row.de_color_code
          )
        );
      }
    }
    return {
      exploreEventList: exploreEventList,
      userUpcomingEventList: userUpcomingEventList
    };
  }

  public loadDiningEventById = async (id: number): Promise<DiningEvent> => {
    const result = await this.pool.query(`SELECT de.*, re.name AS re_name,
      re.created_at AS re_created_at, re.location_id AS re_location_id,
      re.description AS re_description, re.how_to_find AS re_how_to_find,
      re.phone_number AS re_phone_number, re.price_range AS re_price_range,
      re.website AS re_website, lo.* FROM dining_events AS de JOIN restaurants
      AS re ON de.restaurant_id = re.id JOIN locations AS lo ON de.location_id =
      lo.id WHERE de.id = $1`, [id]);
    if (result.rows?.length === 0) {
      return DiningEvent.empty();
    }
    const row = result.rows[0];
    const location = new Location(parseInt(row.location_id),
      row.address_line_one, row.address_line_two, row.city, row.province,
      row.country, row.postal_code, row.neighbourhood);
    const cuisineResult = await this.pool.query(`SELECT cu.* FROM cuisines AS cu
      JOIN restaurant_cuisines AS rc ON rc.cuisine_id = cu.id WHERE
      rc.restaurant_id = $1`, [parseInt(row.restaurant_id)]);
    const cuisineList = cuisineResult.rows.map(cuisineRow => {
      return new Cuisine(parseInt(cuisineRow.id), cuisineRow.label,
        cuisineRow.color_code);
    });
    const restaurant = new Restaurant(parseInt(row.restaurant_id), row.re_name,
      new Date(Date.parse(row.re_created_at)), parseInt(row.re_location_id),
      row.re_description, row.re_how_to_find, row.re_phone_number, PriceRange[
      row.re_price_range as keyof typeof PriceRange], cuisineList,
      row.re_website);
    const attendeesResult = await this.pool.query(`SELECT att.*, u.name, upi.src
      FROM attendees AS att JOIN users AS u ON att.user_id = u.id JOIN
      user_profile_images AS upi ON u.id = upi.user_id WHERE event_id = $1`,
      [id]);
    const attendees = attendeesResult.rows.map(attendeeRow => new Attendee(
      parseInt(attendeeRow.user_id), parseInt(attendeeRow.event_id),
      attendeeRow.name, parseInt(attendeeRow.guest_count), AttendeeStatus[
      attendeeRow.status as keyof typeof AttendeeStatus], attendeeRow.src,
      new Date(Date.parse(attendeeRow.updated_at))
    ));
    return new DiningEvent(parseInt(row.id), row.color_code, parseFloat(
      row.fee), row.cover_image_src, row.title, restaurant, DressCode[
      row.dress_code as keyof typeof DressCode], Seating[row.seating as keyof
      typeof Seating], location, row.reservation_name, new Date(Date.parse(
      row.start_at)), new Date(Date.parse(row.end_at)), attendees, parseInt(
      row.total_capacity), row.description, new Date(Date.parse(
      row.rsvp_open_at)), new Date(Date.parse(row.rsvp_close_at)), EventStatus[
      row.status as keyof typeof EventStatus], EventType[row.type as keyof
      typeof EventType], new Date(Date.parse(row.created_at)), new Date(
      Date.parse(row.updated_at)));
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
