import * as fs from 'fs';
import * as path from 'path';
import { Pool } from 'pg';
import { UserProfileImage } from
  '../../../../client/library/source/definitions';

/** UserProfileImage related database manipulations class. */
export class UserProfileImageDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /** Returns the user profile image based on the user id.
   * @param userId - User id.
   */
  public loadProfileImageByUserId = async (userId: number):
      Promise<UserProfileImage> => {
    const result = await this.pool.query('SELECT * FROM user_profile_images \
      WHERE user_id = $1', [userId]);
    if (!result?.rows?.length) {
      return UserProfileImage.default(userId);
    }
    return new UserProfileImage(parseInt(result.rows[0].user_id),
      result.rows[0].src);
  }

  public uploadProfileImage = async (userId: number,
      imageFile: Express.Multer.File): Promise<UserProfileImage> => {
    const fileName = `${userId}-${Date.now()}-${imageFile.originalname}`;
    const absoluteFilePath = path.join(__dirname,
      '../../client/resources/uploads', fileName);
    const relativeFilePath = path.join('/resources/uploads', fileName);

    /** Save the uploaded file to the local disk. */
    fs.writeFileSync(absoluteFilePath, imageFile.buffer);

    /**
     * Store the file path in the database.
     * Check if the user already has a profile image in the database.
     */
    const existingImageResult = await this.pool.query(
      'SELECT * FROM user_profile_images WHERE user_id = $1', [userId]);
    let result;
    if (existingImageResult?.rows?.length > 0) {

      /**  User already has a profile image, update the record. */
      result = await this.pool.query(`
        UPDATE user_profile_images SET src = $1, updated_at = DEFAULT WHERE
        user_id = $2 RETURNING *`, [relativeFilePath, userId]);
    } else {

      /** User doesn't have a profile image, insert a new record. */
      result = await this.pool.query(`
        INSERT INTO user_profile_images (user_id, src, created_at, updated_at)
        VALUES ($1, $2, DEFAULT, DEFAULT) RETURNING *`,
        [userId, relativeFilePath]);
    }
    if (result?.rows?.length === 0) {
      return UserProfileImage.default(userId);
    }
    return new UserProfileImage(parseInt(result.rows[0].user_id),
      result.rows[0].src);
  }

  public saveProfileImage = async (image: UserProfileImage): Promise<void> => {
    const upsertQuery = `
      INSERT INTO user_profile_images (user_id, src, created_at, updated_at)
      VALUES ($1, $2, DEFAULT, DEFAULT)
      ON CONFLICT (user_id) DO UPDATE
      SET src = $2, updated_at = DEFAULT;`;
    try {
      await this.pool.query(upsertQuery, [image.userId, image.src]);
    } catch (error) {
      throw new Error('Error saving profile image to database.');
    }
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
