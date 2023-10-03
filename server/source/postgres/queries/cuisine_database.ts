import { Pool } from 'pg';
import { Cuisine } from '../../../../client/library/source/definitions';

/** Cuisine related database manipulations class. */
export class CuisineDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns all the cuisines. */
  public loadCuisineList = async (): Promise<Cuisine[]> => {
    const result = await this.pool.query('SELECT * FROM cuisines');
    if (!result?.rows?.length) {
      return [];
    }
    const cuisineList: Cuisine[] = [];
    for (const row of result.rows) {
      cuisineList.push(new Cuisine(
        parseInt(row.id), row.label, row.color_code));
    }
    return cuisineList;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
