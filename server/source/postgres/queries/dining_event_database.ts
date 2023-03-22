import { Pool } from 'pg';
import { EventCardSummary
} from '../../../../client/library/source/definitions';

/** SocialMediaImage related database manipulations class. */
export class DiningEventDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public loadHomePageDiningEventCardSummaries = async (): Promise<
      EventCardSummary[]> => {
    const result = await this.pool.query('SELECT * FROM dining_events \
      order by start_at DESC');
    if (!result || result.rows.length === 0) {
      return [];
    }
    const eventCardSummaryList: EventCardSummary[] = [];
    for (const row of result.rows) {
      eventCardSummaryList.push(new EventCardSummary(parseInt(row.id), row.src));
    }
    return eventCardSummaryList;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
