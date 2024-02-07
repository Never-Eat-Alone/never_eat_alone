import { Pool } from 'pg';

export class UserEmailUpdateRequestsDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns pending new email, token and expiry date
   * @param userId - User id.
   */
  public loadPendingNewEmailByUserId = async (userId: number):
      Promise<{ pendingNewEmail: string, pendingEmailToken: string,
        pendingEmailTokenExpiresAt: Date }> => {

    // Delete the expired tokens.
    await this.pool.query(`
      DELETE FROM user_email_update_requests
      WHERE token_expires_at < (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`);

    const result = await this.pool.query(`
      SELECT * FROM user_email_update_requests
      WHERE user_id = $1`, [userId]);
    if (!result.rows?.length) {
      return { pendingNewEmail: '', pendingEmailToken: '',
        pendingEmailTokenExpiresAt: new Date()
      };
    }
    const { new_email, token, token_expires_at } = result.rows[0];
    return { pendingNewEmail: new_email, pendingEmailToken: token,
      pendingEmailTokenExpiresAt: new Date(token_expires_at + 'Z')
    };
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
