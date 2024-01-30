import { Pool } from 'pg';
import { SocialAccount, SocialAccountType } from
  '../../../../client/library/source/definitions';

export class UserSocialCredentialsDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns the user linked social credentials based on the user id.
   * @param userId - User id.
   */
  public loadUserSocialCredentialsByUserId = async (userId: number):
      Promise<SocialAccount[]> => {
    let userSocialCredentials: SocialAccount[] = [];
    const result = await this.pool.query(`
      SELECT *
      FROM user_social_credentials
      WHERE user_id = $1`, [userId]);
    if (!result?.rows?.length) {
      return [];
    }
    for (const row of result.rows) {
      userSocialCredentials.push(new SocialAccount(parseInt(row.user_id),
        row.provider as SocialAccountType, row.access_token, row.email));
    }
    return userSocialCredentials;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
