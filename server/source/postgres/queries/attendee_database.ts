import { Pool } from 'pg';
import { EventTag } from '../../../../client/library/source/definitions';

/** Attendee related database manipulations class. */
export class AttendeeDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public loadHomePageEventTagList = async (userId: number): Promise<
      EventTag[]> => {
    const result = await this.pool.query(
      "SELECT att.event_id, de.color_code, de.title FROM attendees AS att \
      JOIN dining_events AS de on att.event_id = de.id WHERE att.user_id = $1 \
      AND att.status = 'GOING' AND de.start_at >= NOW() - INTERVAL '1 month' \
      order by de.start_at ASC", [userId]);
    if (!result || result.rows.length === 0) {
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

  /** The postgress pool connection. */
  private pool: Pool;
}
