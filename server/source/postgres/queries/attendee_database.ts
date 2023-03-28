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
      'SELECT ', []);
    if (!result || result.rows.length === 0) {
      return [];
    }
    const eventTagList: EventTag[] = [];
    for (const row of result.rows) {
      let tempResult = await this.pool.query('SELECT cu.* FROM cuisines AS cu \
        JOIN restaurant_cuisines AS re ON re.cuisine_id = cu.id WHERE \
        re.restaurant_id = $1 limit 10', [row.re_id]);
      
      const eventTag = new EventTag();
      eventTagList.push(eventTag);
    }
    return eventTagList;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
