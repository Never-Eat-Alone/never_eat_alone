import { Pool } from 'pg';
import { Location } from '../../../../client/library/source/definitions';

/** Location related database manipulations class. */
export class LocationDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns the location based on the id.
   * @param id - Location id number.
   */
  public loadLocationById = async (id: number): Promise<Location> => {
    const result = await this.pool.query(
      'SELECT * FROM locations WHERE id = $1', [id]);
    if (!result?.rows?.length) {
      return Location.empty();
    }
    return new Location(parseInt(result.rows[0].id),
      result.rows[0].address_line_one, result.rows[0].address_line_two,
      result.rows[0].city, result.rows[0].province, result.rows[0].country,
      result.rows[0].postal_code, result.rows[0].neighbourhood);
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
