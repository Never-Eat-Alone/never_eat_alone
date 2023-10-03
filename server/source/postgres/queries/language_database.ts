import { Pool } from 'pg';
import { Language } from '../../../../client/library/source/definitions';

/** Language related database manipulations class. */
export class LanguageDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns all the languages. */
  public loadLanguageList = async (): Promise<Language[]> => {
    const result = await this.pool.query('SELECT * FROM languages');
    if (!result?.rows?.length) {
      return [];
    }
    const languageList: Language[] = [];
    for (const row of result.rows) {
      languageList.push(new Language(parseInt(row.id), row.code, row.name));
    }
    return languageList;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
