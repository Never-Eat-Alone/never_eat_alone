import * as Crypto from 'crypto';
import * as Hash from 'hash.js';
import { Pool } from 'pg';
import { Cuisine, Language, SocialAccountType, User, UserInvitationCode,
  UserStatus, UserProfileImage, UserProfilePrivacyPreference,
  UserProfileSocialAccount, ProfilePageData } from
  '../../../../client/library/source/definitions';

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

function generateResetToken() {
  const buffer = Crypto.randomBytes(32);
  return buffer.toString('hex');
}

/** Generates secure token for user email update request. */
function generateEmailUpdateToken(userId) {
  const tokenBuffer = Crypto.randomBytes(32);
  const token = tokenBuffer.toString('hex');
  const hash = Crypto.createHash('sha256').update(String(userId)).digest('hex');
  const emailUpdateToken = `${token}.${hash}`;
  return emailUpdateToken;
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
      INSERT INTO
        user_invitation_codes (invite_code, user_id, created_at, updated_at)
      VALUES
        ($1, $2, NOW(), NOW())
      ON CONFLICT
        (user_id)
      DO UPDATE SET
        invite_code = $1, updated_at = NOW()`, [inviteCode, userId]);
  }

  public assingResetTokenToUserId = async (userId: number): Promise<string> => {
    const token = generateResetToken();
    await this.pool.query(`
      INSERT INTO
        password_reset_tokens (user_id, token, created_at, expires_at)
      VALUES
        ($1, $2, NOW(), NOW() + INTERVAL '24 HOURS')
      ON CONFLICT
        (user_id)
      DO UPDATE SET
        token = $2, created_at = NOW(), expires_at = NOW() + INTERVAL '24 HOURS'
    `, [userId, token]);
    return token;
  }

  public loadUserInvitationCode = async (userId: number): Promise<
      UserInvitationCode> => {
    const result = await this.pool.query(`
      SELECT
        invite_code
      FROM
        user_invitation_codes
      WHERE
        user_id = $1`, [userId]);
    if (result.rows?.length === 0) {
      return UserInvitationCode.emptyUserInvitationCode();
    }
    return new UserInvitationCode(userId, result.rows[0].invite_code);
  }

  /**
   * Assigns the userId to a sessionId and records the pair in the user_sessions
   * table.
   * @param sid: - Session id.
   * @param userId - User id.
   * @param sess - Session object.
   * @param expire - Expiration date.
   */
  public assignUserIdToSid = async (sid: string, userId: number | null |
      undefined, sess: object, expire: Date): Promise<void> => {
    if (!userId || userId === null || userId === undefined || Number.isNaN(
        userId) || userId === -1 || !sess || !sid || !expire) {
      return;
    }
    await this.pool.query(`
      INSERT INTO
        user_sessions (sid, user_id, sess, expire)
      VALUES
        ($1, $2, $3, $4)
      ON CONFLICT (sid) DO UPDATE
        SET user_id = EXCLUDED.user_id,
            sess = EXCLUDED.sess,
            expire = EXCLUDED.expire
    `, [sid, userId, sess, expire.toISOString()]);
  }

  /**
   * Returns a user based on the given email address.
   * @param email - User email.
   */
  public loadUserByEmail = async (email: string): Promise<User> => {
    const result =
      await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows?.length === 0) {
      return User.makeGuest();
    }
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      result.rows[0].user_status as UserStatus, new Date(Date.parse(
      result.rows[0].created_at)));
  }

  /**
   * Returns a user with the given user id.
   * @param id - User id.
   */
  public loadUserById = async (id: number): Promise<User> => {
    const result = await this.pool.query('SELECT * FROM users WHERE id = $1',
      [id]);
    if (result.rows?.length === 0) {
      return User.makeGuest();
    }
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      result.rows[0].user_status as UserStatus, new Date(Date.parse(
      result.rows[0].created_at)));
  }

  /**
   * Returns the user associated with the given session id.
   * @param id - Session id.
   */
  public loadUserBySessionId = async (id: string): Promise<User> => {
    const guest = User.makeGuest();
    const result = await this.pool.query(
      'SELECT * FROM user_sessions WHERE sid = $1', [id]);
    if (result.rows?.length === 0 || !result.rows[0].user_id) {
      return guest;
    }
    const userResult = await this.pool.query(
      'SELECT * FROM users WHERE id = $1', [parseInt(result.rows[0].user_id)]);
    if (userResult.rows?.length === 0) {
      return guest;
    }
    const user = new User(
      parseInt(userResult.rows[0].id),
      userResult.rows[0].name, userResult.rows[0].email,
      userResult.rows[0].user_name,
      userResult.rows[0].user_status as UserStatus,
      new Date(Date.parse(userResult.rows[0].created_at)));
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
      'SELECT * FROM user_credentials WHERE user_id = $1', [userId]);
    if (result.rows?.length === 0 ||
        hashedEnteredPass !== result.rows[0].hashed_pass) {
      return false;
    }
    return true;
  }

  /**
   * Add the new user.
   * @param name - User name.
   * @param email - User email.
   * @param referralCode - User referral code.
   */
  public addGuestUserRequest = async (name: string, email: string,
      referralCode: string): Promise<User> => {
    const result = await this.pool.query(`
      INSERT INTO users (name, email, user_status, created_at, referral_code)
      VALUES ($1, $2, DEFAULT, DEFAULT, $3)
      RETURNING *
    `, [name, email, referralCode]);
    if (result.rows?.length === 0) {
      return User.makeGuest();
    }
    return new User(parseInt(result.rows[0].id), result.rows[0].name,
      result.rows[0].email, result.rows[0].user_name,
      result.rows[0].user_status as UserStatus,
      new Date(Date.parse(result.rows[0].created_at)));
  }

  /**
   * Add the confirmation token to the database.
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

  public addEmailUpdateRequest = async (userId: number, newEmail: string):
      Promise<number> => {
    const emailUpdateToken = generateEmailUpdateToken(userId);
    const queryResult = await this.pool.query(`
      INSERT INTO user_email_update_requests (user_id, new_email, token)
      VALUES ($1, $2, $3) RETURNING id`, [userId, newEmail, emailUpdateToken]);
    return parseInt(queryResult.rows[0].id);
  }

  public verifyEmailUpdateRequestToken = async (userId: number, token: string):
      Promise<string> => {
    let newEmail = '';
    try {
      // Delete all expired tokens.
      await this.pool.query(`
        DELETE FROM
          user_email_update_requests
        WHERE
          token_expires_at < (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`);

      // Verify the token is valid and return the new email.
      const selectResult = await this.pool.query(`
        SELECT new_email
        FROM
          user_email_update_requests
        WHERE
          user_id = $1 AND token = $2 AND
          token_expires_at >= (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`, [userId,
        token]);
      if (selectResult.rows.length > 0) {
        newEmail = selectResult.rows[0].new_email;

        // Delete the verified token so it can't be used again.
        await this.pool.query(`
          DELETE FROM
            user_email_update_requests
          WHERE
            user_id = $1 AND token = $2`, [userId, token]);
      }
      return newEmail;
    } catch (error) {
      console.error("Error validating email update token: ", error);
      throw error;
    }
  }

  /**
   * Add the user credentials.
   * @param userId - User id.
   * @param password - User password.
   */
  public addUserCredentials = async (userId: number, password: string):
      Promise<void> => {
    const hashedEnteredPass =
      Hash.sha256().update(password + userId).digest('hex');

    /** Check if the user ID already exists in the table */
    const result = await this.pool.query(`
      SELECT user_id FROM user_credentials WHERE user_id = $1`, [userId]);
    if (result.rows.length > 0) {

      /** If the user ID already exists, update the password */
      await this.pool.query(`
        UPDATE user_credentials SET hashed_pass = $1 WHERE user_id = $2`,
        [hashedEnteredPass, userId]);
    } else {

      /** If the user ID doesn't exist, insert the new credentials */
      await this.pool.query(`
        INSERT INTO user_credentials (user_id, hashed_pass) VALUES ($1, $2)`,
        [userId, hashedEnteredPass]);
    }
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

  public deleteExpiredTokens = async (): Promise<void> => {
    const query = `
      DELETE FROM user_confirmation_tokens
      WHERE expires_at < NOW();
    `;
    try {
      await this.pool.query(query);
    } catch (error) {
      console.error('Error deleting expired tokens:', error);
    }
  }

  /**
   * Indicates whether the give confirmation token is valid or not.
   * @param token - Confirmation token.
   */
  public isTokenValid = async (token: string): Promise<boolean> => {
    await this.deleteExpiredTokens();
    const result = await this.pool.query(`
      SELECT * FROM user_confirmation_tokens
      WHERE token_id = $1 AND expires_at > NOW()
    `, [token]);
    if (!result || !result.rows || result.rows.length === 0) {
      return false;
    }
    return true;
  }

  public getTokenByUserId = async (userId: number): Promise<string> => {
    const result = await this.pool.query(`
      SELECT token_id FROM user_confirmation_tokens WHERE user_id = $1`,
      [userId]);
    if (!result || !result.rows || result.rows.length === 0) {
      return '';
    }
    return result.rows[0].token_id;
  }

  public getUserIdByToken = async (token: string): Promise<number> => {
    const result = await this.pool.query(`
      SELECT user_id FROM user_confirmation_tokens WHERE token_id = $1`,
      [token]);
    if (result.rows?.length === 0) {
      return -1;
    }
    return parseInt(result.rows[0].user_id);
  }

  /**
   * Update the user status based on the validity of the give confirmation
   * token.
   * @param token - Confirmation token.
   */
  public updateUserStatusByConfirmationToken = async (token: string):
      Promise<number> => {
    const result = await this.pool.query(
      'SELECT * FROM user_confirmation_tokens WHERE token_id = $1', [token]);
    if (!result || !result.rows || result.rows.length === 0 ||
        !result.rows[0].user_id) {
      return -1;
    }
    await this.pool.query(
      "UPDATE users SET user_status = 'ACTIVE' WHERE id = $1",
      [parseInt(result.rows[0].user_id)]);
    await this.pool.query(
      'DELETE FROM user_confirmation_tokens WHERE token_id = $1', [token]);

    /** Creates the default profile image for the new confirmed user. */
    const defaultImageSrc = '/resources/avatars/profile-image-0.svg';
    await this.pool.query(`
      INSERT INTO user_profile_images (user_id, src)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET src = EXCLUDED.src, updated_at = NOW()
    `, [parseInt(result.rows[0].user_id), defaultImageSrc]);

    /** Assigns the user invitation code to the database. */
    await this.assingInvitationCodeToUserId(parseInt(result.rows[0].user_id));
    return parseInt(result.rows[0].user_id);
  }

  public hasCredentials = async (userId: number): Promise<boolean> => {
    const result = await this.pool.query(`
      SELECT * FROM user_credentials WHERE user_id = $1`, [userId]);
    if (!result || !result.rows || result.rows.length === 0) {
      return false;
    }
    return true;
  }

  public saveUserProfile = async (userId: number, imageSrc: string,
      displayName: string): Promise<{ account: User,
      accountProfileImage: UserProfileImage }> => {
    const userQueryResult = await this.pool.query(
      `UPDATE users SET name = $1 WHERE id = $2 RETURNING *`,
      [displayName, userId]);
    const userProfileImageQueryResult = await this.pool.query(`
      INSERT INTO
        user_profile_images (user_id, src)
      VALUES
        ($1, $2)
      ON CONFLICT
        (user_id)
      DO UPDATE
        SET src = EXCLUDED.src, updated_at = NOW()
      RETURNING *`, [userId, imageSrc]);
    const account = new User(
      parseInt(userQueryResult.rows[0].id), userQueryResult.rows[0].name,
      userQueryResult.rows[0].email, userQueryResult.rows[0].user_name,
      userQueryResult.rows[0].user_status as UserStatus, new Date(Date.parse(
      userQueryResult.rows[0].created_at)));
    const accountProfileImage = new UserProfileImage(parseInt(
      userProfileImageQueryResult.rows[0].user_id),
      userProfileImageQueryResult.rows[0].src);
    return {
      account: account,
      accountProfileImage: accountProfileImage
    };
  }

  /**
   * Returns a user's biography based on user id.
   * @param userId - User's id number'.
   */
  public loadBiographyByUserId = async (userId: number): Promise<string> => {
    const result =
      await this.pool.query('SELECT biography FROM users WHERE id = $1',
        [userId]);
    if (result.rows?.length === 0) {
      return '';
    }
    return result.rows[0].biography;
  }

  /**
   * Returns a user's address based on user id.
   * @param userId - User's id number'.
   */
  public loadAddressByUserId = async (userId: number): Promise<string> => {
    const result = await this.pool.query(
      'SELECT profile_address FROM users WHERE id = $1', [userId]);
    if (result.rows?.length === 0) {
      return '';
    }
    return result.rows[0].profile_address;
  }

  public loadUserLanguagesByUserId = async (userId: number): Promise<
      Language[]> => {
    const result = await this.pool.query(`
      SELECT
        l.*
      FROM
        languages AS l
      INNER JOIN
        user_languages AS ul
      ON
        l.id = ul.language_id
      WHERE
        ul.user_id = $1`, [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const languages: Language[] = [];
    for (const row of result.rows) {
      languages.push(new Language(parseInt(row.id), row.code, row.name));
    }
    return languages;
  }

  public loadUserProfileSocialAccountsByUserId = async (userId: number):
      Promise<UserProfileSocialAccount[]> => {

    /** Query the user profile social accounts table based on user_id */
    const result = await this.pool.query(`
      SELECT * FROM user_profile_social_accounts WHERE user_id = $1`, [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const userProfilesocialAccounts: UserProfileSocialAccount[] =
      result.rows.map((row) => {
        const account = new UserProfileSocialAccount(
          row.platform as SocialAccountType, row.link, row.is_private);
        return account;
    });
    return userProfilesocialAccounts;
  };

  public loadUserFavouriteCuisinesByUserId = async (userId: number): Promise<
      Cuisine[]> => {
    const result = await this.pool.query(`
      SELECT
        cu.*
      FROM
        cuisines AS cu
      JOIN
        user_favourite_cuisines AS u_cu
      ON
        u_cu.cuisine_id = cu.id
      WHERE
        u_cu.user_id = $1`, [userId]);
    if (result.rows?.length === 0) {
      return [];
    }
    const userCuisines: Cuisine[] = result.rows.map((row) => {
      const cuisine = new Cuisine(parseInt(row.id), row.label, row.color_code);
      return cuisine;
    });
    return userCuisines;
  }

  public loadUserByPasswordResetToken = async (token: string): Promise<
      User> => {
    if (!token) {
      throw new Error('Token not found or already used.');
    }
    const result = await this.pool.query(`
      SELECT
        user_id, expires_at
      FROM
        password_reset_tokens
      WHERE
        token = $1`, [token]);
    if (result.rows?.length === 0) {
      throw new Error('Token not found');
    }

    const expiresAt = new Date(result.rows[0].expires_at);
    if (expiresAt <= new Date()) {
      /** Deleting the token even if it's expired to ensure one-time access. */
      await this.pool.query(`
        DELETE FROM
          password_reset_tokens
        WHERE
          token = $1`, [token]);
      throw new Error('Token has expired');
    }

    /** Deleting the token after its successful validation to ensure one-time 
     * access.
     */
    await this.pool.query(`
      DELETE FROM
        password_reset_tokens
      WHERE
        token = $1`, [token]);
    const user = await this.loadUserById(parseInt(result.rows[0].user_id));
    return user;
  }

  public updatePassword = async (userId: number, newPassword: string):
      Promise<void> => {
    const hashedEnteredPass =
      Hash.sha256().update(newPassword + userId).digest('hex');

    /** Check if the user ID already exists in the table */
    const result = await this.pool.query(`
      SELECT user_id FROM user_credentials WHERE user_id = $1`, [userId]);
    if (result.rows.length > 0) {

      /** If the user ID already exists, update the password */
      await this.pool.query(`
        UPDATE user_credentials SET hashed_pass = $1 WHERE user_id = $2`,
        [hashedEnteredPass, userId]);
    } else {
      throw new Error("User doesn't have credentials.");
    }
  }

  public getUserPrivacyPreferencesByUserId = async (
      userId: number): Promise<UserProfilePrivacyPreference> => {
    const result = await this.pool.query('SELECT * FROM users WHERE id = $1',
      [userId]);
    if (result.rows?.length === 0) {
      throw new Error("User doesn't exist.");
    }
    const privacyPreference: UserProfilePrivacyPreference = {
      isBioPrivate: result.rows[0].is_bio_private,
      isProfileAddressPrivate: result.rows[0].is_profile_address_private,
      isUpcomingEventsPrivate: result.rows[0].is_upcoming_events_private,
      isPastEventsPrivate: result.rows[0].is_past_events_private,
      isLanguagePrivate: result.rows[0].is_language_private,
      isCuisinePrivate: result.rows[0].is_cuisine_private
    }
    return privacyPreference;
  }

  public updateUserProfile = async (profilePageData: ProfilePageData):
      Promise<void> => {
    try {
      await this.pool.query('BEGIN');

      // Update users table.
      await this.pool.query(`
        UPDATE users 
        SET
          biography = $2,
          is_bio_private = $3,
          is_upcoming_events_private = $4,
          is_past_events_private = $5,
          is_profile_address_private = $6,
          profile_address = $7,
          is_language_private = $8,
          is_cuisine_private = $9
        WHERE id = $1`,
        [
          profilePageData.accountId,
          profilePageData.biographyValue,
          profilePageData.isBiographyPrivate,
          profilePageData.isUpcomingEventsPrivate,
          profilePageData.isPastEventsPrivate,
          profilePageData.isLocationPrivate,
          profilePageData.selectedLocation,
          profilePageData.isLanguagePrivate,
          profilePageData.isCuisinePrivate
        ]
      );

      // Update social links.
      const upsertSocialLink = async (platform: SocialAccountType, link: string,
          isPrivate: boolean) => {
        await this.pool.query(`
          INSERT INTO
            user_profile_social_accounts(user_id, platform, link, is_private)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (user_id, platform)
          DO UPDATE SET link = $3, is_private = $4`,
          [
            profilePageData.accountId,
            platform,
            link,
            isPrivate
          ]
        );
      };

      // Update Facebook link
      await upsertSocialLink(SocialAccountType.FACEBOOK,
        profilePageData.facebookLink, profilePageData.isFacebookPrivate);

      // Update Twitter link
      await upsertSocialLink(SocialAccountType.TWITTER,
        profilePageData.twitterLink, profilePageData.isTwitterPrivate);

      // Update Instagram link
      await upsertSocialLink(SocialAccountType.INSTAGRAM,
        profilePageData.instagramLink, profilePageData.isInstagramPrivate);

      // Update user's favorite cuisines
      const updateUserFavoriteCuisines = async (userId: number, cuisineList:
          Cuisine[]) => {

        /** delete existing favorite cuisines for the user. */
        await this.pool.query(`
          DELETE FROM user_favourite_cuisines
          WHERE user_id = $1`, [userId]);

        /** Insert the new favorite cuisines for the user. */
        for (const cuisine of cuisineList) {
          await this.pool.query(`
            INSERT INTO user_favourite_cuisines(user_id, cuisine_id)
            VALUES ($1, $2)`,
            [userId, cuisine.id]
          );
        }
      };

      await updateUserFavoriteCuisines(profilePageData.accountId,
        profilePageData.selectedCuisineList);

      // Update user's languages
      const updateUserLanguages = async (userId: number, languageList:
          Language[]) => {

        /** delete existing languages for the user. */
        await this.pool.query(`
          DELETE FROM user_languages
          WHERE user_id = $1`, [userId]);

        /** Insert the new languages for the user. */
        for (const language of languageList) {
          await this.pool.query(`
            INSERT INTO user_languages(user_id, language_id)
            VALUES ($1, $2)`,
            [userId, language.id]
          );
        }
      };
      await updateUserLanguages(profilePageData.accountId,
        profilePageData.selectedLanguageList);
      await this.pool.query('COMMIT');
    } catch (error) {
      await this.pool.query('ROLLBACK');
      throw error;
    }
  }

  public updateDisplayName = async (userId: number, name: string): Promise<
      User> => {
    try {
      const userQueryResult = await this.pool.query(`
        UPDATE users 
        SET name = $2, updated_at = NOW()
        WHERE id = $1
        RETURNING *`, [userId, name]);
      if (userQueryResult.rowCount === 0) {
        throw new Error('No user found with the given user Id.');
      }
      return new User(
        parseInt(userQueryResult.rows[0].id), userQueryResult.rows[0].name,
        userQueryResult.rows[0].email, userQueryResult.rows[0].user_name,
        userQueryResult.rows[0].user_status as UserStatus, new Date(Date.parse(
        userQueryResult.rows[0].created_at)));
    } catch (error) {
      console.error('Error in updateDisplayName:', error);
      throw error;
    }
  }

  public updateEmail = async (userId: number, email: string): Promise<User> => {
    try {
      const userQueryResult = await this.pool.query(`
        UPDATE users 
        SET email = $2, updated_at = NOW()
        WHERE id = $1
        RETURNING *`, [userId, email]);
      if (userQueryResult.rowCount === 0) {
        throw new Error('No user found with the given user Id.');
      }
      return new User(
        parseInt(userQueryResult.rows[0].id), userQueryResult.rows[0].name,
        userQueryResult.rows[0].email, userQueryResult.rows[0].user_name,
        userQueryResult.rows[0].user_status as UserStatus, new Date(Date.parse(
        userQueryResult.rows[0].created_at)));
    } catch (error) {
      console.error('Error in updateEmail:', error);
      throw error;
    }
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
