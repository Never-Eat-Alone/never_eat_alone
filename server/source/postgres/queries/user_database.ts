import * as Hash from 'hash.js';
import { LoginTicket } from 'google-auth-library';
import { Pool } from 'pg';
import { User, UserStatus
} from '../../../../client/library/source/definitions';

/** User related database manipulations class. */
export class UserDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /**
   * Assigns the userId to a sessionId and records the pair in the sessions
   * table.
   * @param sid: - Session id.
   * @param userId - User id.
   */
  public assignUserIdToSid = async (sid: string, userId: number):
      Promise<void> => {
    await this.pool.query(
      'INSERT INTO sessions (sid, user_id) VALUES ($1, $2) ON CONFLICT (sid) \
      DO UPDATE SET user_id = $2', [sid, userId]);
  }

  /** Returns a user based on the given email address.
   * @param email - User email.
   */
  public loadUserByEmail = async (email: string): Promise<User> => {
    const result =
      await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return User.makeGuest();
    }
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      UserStatus[result.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(result.rows[0].created_at)));
  }

  /** Returns a user with the given user id.
   * @param id - User id.
   */
  public loadUserById = async (id: number): Promise<User> => {
    const result = await this.pool.query('SELECT * from users WHERE id = $1',
      [id]);
    if (result.rows.length === 0) {
      return User.makeGuest();
    }
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      UserStatus[result.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(result.rows[0].created_at)));
  }

  /** Returns the user associated with the given session id.
   * @param id - Session id.
   */
  public loadUserBySessionId = async (id: string): Promise<User> => {
    const userIdResult = await this.pool.query(
      'SELECT (user_id) from sessions WHERE sid = $1', [id]);
    const guest = User.makeGuest();
    if (userIdResult.rows.length === 0 || !userIdResult.rows[0].user_id) {
      await this.assignUserIdToSid(id, guest.id);
      return guest;
    }
    const userResult = await this.pool.query(
      'SELECT * from users WHERE id = $1', [userIdResult.rows[0].user_id]);
    if (userResult.rows.length === 0) {
      await this.assignUserIdToSid(id, guest.id);
      return guest;
    }
    const user = new User(parseInt(userResult.rows[0].id),
      userResult.rows[0].name, userResult.rows[0].email,
      userResult.rows[0].user_name,
      UserStatus[userResult.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(userResult.rows[0].created_at)));
    await this.assignUserIdToSid(id, user.id);
    return user;
  }

  /** Returns the user google credentials based on the given user id.
   * @param userId - User id.
   */
  public loadGoogleCredentials = async (userId: number): Promise<string> => {
    const result = await this.pool.query(
      'SELECT * FROM google_user_credentials WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) {
      return '';
    }
    return result.rows[0].google_id;
  }

  /**
   * Determines if a password is valid or not for a user login.
   * @param userId - User id.
   * @param password - User password.
   */
  public validatePassword =
      async (userId: number, password: string): Promise<boolean> => {
    const hashedEnteredPass =
      Hash.sha256().update(password + userId).digest('hex');
    const result = await this.pool.query(
      'SELECT * from user_credentials WHERE user_id = $1', [userId]);
    if (result.rows.length === 0 ||
        hashedEnteredPass !== result.rows[0].hashed_pass) {
      return false;
    }
    return true;
  }

  /** Add a new user signed up with google account.
   * @param name - User name.
   * @param email - User email.
   * @param ticket - Google login ticket.
   */
  public addGoogleUser = async (name: string, email: string,
      ticket: LoginTicket): Promise<User> => {
    const result = await this.pool.query(
      'INSERT INTO users (name, email, user_status, created_at) VALUES \
      ($1, $2, DEFAULT, DEFAULT) RETURNING *', [name, email]);
    if (result.rows.length === 0) {
      return User.makeGuest();
    }
    await this.pool.query(
      'INSERT INTO google_user_credentials (user_id, id_token) VALUES ($1, $2)',
      [result.rows[0].id, ticket.getPayload()['sub']]);
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, '',
      UserStatus[result.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(result.rows[0].created_at)));
  }

  /** Add the new user.
   * @param name - User name.
   * @param email - User email.
   * @param referralCode - User referral code.
   */
  public addGuestUserRequest = async (name, email, referralCode
      ): Promise<User> => {
    const result = await this.pool.query(
      'INSERT INTO users (name, email, user_status, created_at, referral_code) \
      VALUES ($1, $2, DEFAULT, DEFAULT, $3) RETURNING *', [name, email,
        referralCode]);
    if (result.rows.length === 0) {
      return User.makeGuest();
    }
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      UserStatus[result.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(result.rows[0].created_at)));
  }

  /** Add the new user.
   * @param name - User name.
   * @param email - User email.
   * @param password - User password.
   */
  public addGuestUser = async (name: string, email: string, userName: string,
      password: string): Promise<User> => {
    const result = await this.pool.query(
      'INSERT INTO users (name, email, user_name, user_status, created_at) \
      VALUES ($1, $2, $3, DEFAULT, DEFAULT) RETURNING *', [name, email,
      userName]);
    if (result.rows.length === 0) {
      return User.makeGuest();
    }
    const hashedPass = 
      Hash.sha256().update(password + result.rows[0].id).digest('hex');
    await this.pool.query(
      'INSERT INTO user_credentials (user_id, hashed_pass) VALUES ($1, $2)',
      [result.rows[0].id, hashedPass]);
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      UserStatus[result.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(result.rows[0].created_at)));
  }

  /** Add the confirmation token to the database.
   * @param tokenId - Confirmation token id.
   * @param expiresAt - Token expiration date.
   * @param userId - User id.
   */
  public addConfirmationToken = async (tokenId: string, expiresAt: Date,
      userId: number): Promise<void> => {
    await this.pool.query(
      'INSERT INTO user_confirmation_tokens (token_id, expires_at, user_id) \
      VALUES ($1, $2, $3)', [tokenId, expiresAt, userId]);
  }

  /**
   * Indicates whether the email alreay exist in the users database or not.
   * @param email - User email.
   */
  public isDuplicateEmail = async (email: string): Promise<boolean> => {
    const result = await this.pool.query('SELECT * FROM users WHERE email = $1',
      [email]);
    return result.rows.length !== 0;
  }

  public isDuplicateUserName = async (userName: string): Promise<boolean> => {
    const result = await this.pool.query('SELECT * FROM users WHERE \
      user_name = $1', [userName]);
    return result.rows.length !== 0;
  }

  /**
   * Update the user status based on the validity of the give confirmation
   * token.
   * @param token - Confirmation token.
   */
  public updateUserStatusByConfirmationToken =
      async (token: string): Promise<number> => {
    const result = await this.pool.query(
      'SELECT * from user_confirmation_tokens WHERE token_id = $1', [token]);
    if (result.rows.length === 0) {
      return -1;
    }
    await this.pool.query(
      "UPDATE users SET user_status = 'ACTIVE' WHERE id = $1",
      [result.rows[0].user_id]);
    await this.pool.query(
      'DELETE from user_confirmation_tokens WHERE token_id = $1', [token]);
    return parseInt(result.rows[0].user_id);
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
