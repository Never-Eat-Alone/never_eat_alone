import { Pool } from 'pg';
import { AccountDeletedSurvey } from
  '../../../../client/library/source/definitions';

/** Delete Account Survey related database manipulations class. */
export class DeleteAccountSurveyDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public saveSurvey = async (survey: AccountDeletedSurvey): Promise<void> => {
    await this.pool.query(
      'INSERT INTO delete_account_survey (user_id, question_1, question_2, \
      question_3, question_4, question_5, question_6, message) \
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [survey.userId, survey.a1,
      survey.a2, survey.a3, survey.a4, survey.a5, survey.a6, survey.message]);
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
