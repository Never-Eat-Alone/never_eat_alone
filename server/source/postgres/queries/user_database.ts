import * as Hash from 'hash.js';
import { Pool } from 'pg';
import { Avatar, User, UserStatus
} from '../../../../client/library/source/definitions';
import * as Crypto from 'crypto';

/** Generates a unique invitation code. */
function generateInvitationCode() {
  const length = 8;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Crypto.randomInt(chars.length);
    code += chars[randomIndex];
  }
  return code;
}

/** User related database manipulations class. */
export class UserDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public assingInvitationCodeToUserId = async (userId: number): Promise<
      void> => {
    const inviteCode = generateInvitationCode();
    await this.pool.query(`
      INSERT INTO user_invitation_codes (invite_code, user_id, created_at,
      updated_at)
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT (user_id) DO UPDATE SET invite_code = $1, updated_at = NOW()
    `, [inviteCode, userId]);
  }

  public loadUserInvitationCode = async (userId: number): Promise<string> => {
    const result = await this.pool.query(`
      SELECT invite_code FROM user_invitation_codes WHERE user_id = $1`,
      [userId]);
    if (!result || result.rows.length === 0) {
      return '';
    }
    return result.rows[0].invite_code;
  }

  public loadAvatars = async (): Promise<Avatar[]> => {
    const result = await this.pool.query('SELECT * FROM avatars');
    const avatars: Avatar[] = [];
    if (result && result.rows && result.rows.length > 0) {
      for (const row of result.rows) {
        avatars.push(new Avatar(parseInt(row.id), row.src));
      }
    }
    return avatars;
  }

  /**
   * Assigns the userId to a sessionId and records the pair in the user_sessions
   * table.
   * @param sid: - Session id.
   * @param userId - User id.
   * @param sess - Session object.
   * @param expire - Expiration date.
   */
  public assignUserIdToSid = async (sid: string, userId: number, sess: object,
        expire: Date): Promise<void> => {
    await this.pool.query(`
      INSERT INTO user_sessions (sid, user_id, sess, expire)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (sid) DO UPDATE SET user_id = $2
    `, [sid, userId, sess, expire]);
  }

  /** Returns a user based on the given email address.
   * @param email - User email.
   */
  public loadUserByEmail = async (email: string): Promise<User> => {
    const result =
      await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!result || result.rows.length === 0) {
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
      'SELECT (user_id) from user_sessions WHERE sid = $1', [id]);
    const guest = User.makeGuest();
    if (!!userIdResult.rows || userIdResult.rows.length === 0 ||
        !userIdResult.rows[0].user_id) {
      await this.assignUserIdToSid(id, guest.id, {}, new Date(Date.now() +
        24 * 60 * 60 * 1000));
      return guest;
    }
    const userResult = await this.pool.query(
      'SELECT * from users WHERE id = $1', [userIdResult.rows[0].user_id]);
    if (!userResult.rows || userResult.rows.length === 0) {
      await this.assignUserIdToSid(id, guest.id, {}, new Date(Date.now() +
        24 * 60 * 60 * 1000));
      return guest;
    }
    const user = new User(parseInt(userResult.rows[0].id),
      userResult.rows[0].name, userResult.rows[0].email,
      userResult.rows[0].user_name,
      UserStatus[userResult.rows[0].user_status as keyof typeof UserStatus],
      new Date(Date.parse(userResult.rows[0].created_at)));
    await this.assignUserIdToSid(id, user.id, {}, new Date(Date.now() +
      24 * 60 * 60 * 1000));
    return user;
  }

  /**
   * Determines if a password is valid or not for a user login.
   * @param userId - User id.
   * @param password - User password.
   */
  public validatePassword = async (userId: number, password: string): Promise<
      boolean> => {
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

  /** Add the new user.
   * @param name - User name.
   * @param email - User email.
   * @param referralCode - User referral code.
   */
  public addGuestUserRequest = async (name, email, referralCode
      ): Promise<User> => {
    const result = await this.pool.query(`
      INSERT INTO users (name, email, user_status, created_at, referral_code)
      VALUES ($1, $2, DEFAULT, DEFAULT, $3)
      RETURNING *
    `, [name, email, referralCode]);
    if (result.rows.length === 0) {
      return User.makeGuest();
    }
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
    await this.pool.query(`
      INSERT INTO user_confirmation_tokens (token_id, expires_at, user_id)
      VALUES ($1, $2, $3)`, [tokenId, expiresAt, userId]);
  }

  /**
   * Add the user credentials.
   * @param userId - User id.
   * @param password - User password.
   */
  public addUserCredentials = async (userId: number, password: string): Promise<
      void> => {
    const hashedEnteredPass =
      Hash.sha256().update(password + userId).digest('hex');
    // Check if the user ID already exists in the table
    const result = await this.pool.query(`
      SELECT user_id FROM user_credentials WHERE user_id = $1`, [userId]);
    if (result.rows.length > 0) {
      // If the user ID already exists, update the password
      await this.pool.query(`
        UPDATE user_credentials SET hashed_pass = $1 WHERE user_id = $2`,
        [hashedEnteredPass, userId]);
    } else {
      // If the user ID doesn't exist, insert the new credentials
      await this.pool.query(`
        INSERT INTO user_credentials (user_id, hashed_pass) VALUES ($1, $2)`,
        [userId, hashedEnteredPass]);
    }
    const tempResult = await this.pool.query(`
      SELECT * from user_profile_images WHERE user_id = $1`, [userId]);
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
    const result = await this.pool.query(`
      SELECT * FROM users WHERE user_name = $1`, [userName]);
    return result.rows.length !== 0;
  }

  /**
   * Indicates whether the give confirmation token is valid or not.
   * @param token - Confirmation token.
   */
  public isTokenValid = async (token: string): Promise<boolean> => {
    const result = await this.pool.query(`
      SELECT * from user_confirmation_tokens
      WHERE token_id = $1 AND expires_at > NOW()
    `, [token]);
    if (!result.rows || result.rows.length === 0) {
      return false;
    }
    return true;
  }

  public getUserIdByToken = async (token: string): Promise<number> => {
    const result = await this.pool.query(`
      SELECT user_id from user_confirmation_tokens WHERE token_id = $1`,
      [token]);
    if (!result.rows || result.rows.length === 0) {
      return -1;
    }
    return parseInt(result.rows[0].user_id);
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
    // Creates the default profile image for the new confirmed user.
    const defaultImageSrc = '/resources/avatars/profile-image-0.svg';
    await this.pool.query(`
      INSERT INTO user_profile_images (user_id, src)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET src = EXCLUDED.src, updated_at = NOW()
    `, [parseInt(result.rows[0].id), defaultImageSrc]);
    // Assigns the user invitation code to the database.
    await this.assingInvitationCodeToUserId(parseInt(result.rows[0].id));

    return parseInt(result.rows[0].user_id);
  }

  public hasCredentials = async (userId: number): Promise<boolean> => {
    const result = await this.pool.query(`
      SELECT * from user_credentials WHERE user_id = $1`, [userId]);
    if (!result.rows || result.rows.length === 0) {
      return false;
    }
    return true;
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
