import * as fs from 'fs';
import * as path from 'path';
import { Pool } from 'pg';
import { CoverImage } from '../../../../client/library/source/definitions';

/** UserCoverImage related database manipulations class. */
export class UserCoverImageDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  /**
   * Returns the user cover image based on the user id.
   * @param userId - User id.
   */
  public loadCoverImageByUserId = async (userId: number): Promise<CoverImage> =>
      {
    const result = await this.pool.query('SELECT * FROM user_cover_images \
      WHERE user_id = $1', [userId]);
    if (!result?.rows?.length) {
      return CoverImage.default(userId);
    }
    return new CoverImage(parseInt(result.rows[0].user_id), result.rows[0].src);
  }

  public uploadCoverImage = async (userId: number, imageFile:
      Express.Multer.File): Promise<CoverImage> => {
    const fileName = `${userId}-${Date.now()}-${imageFile.originalname}`;
    const absoluteFilePath = path.join(__dirname,
      '../../client/resources/uploads', fileName);
    const relativeFilePath = path.join('/resources/uploads', fileName);

    /** Save the uploaded file to the local disk. */
    fs.writeFileSync(absoluteFilePath, imageFile.buffer);

    /**
     * Store the file path in the database.
     * Check if the user already has a cover image in the database.
     */
    const existingImageResult = await this.pool.query(
      'SELECT * FROM user_cover_images WHERE user_id = $1', [userId]);
    let result;
    if (existingImageResult?.rows?.length > 0) {

      /** User already has a cover image, update the record. */
      result = await this.pool.query(`
        UPDATE user_cover_images SET src = $1, updated_at = DEFAULT WHERE
        user_id = $2 RETURNING *`, [relativeFilePath, userId]);
    } else {

      /** User doesn't have a cover image, insert a new record. */
      result = await this.pool.query(`
        INSERT INTO user_cover_images (user_id, src, created_at, updated_at)
        VALUES ($1, $2, DEFAULT, DEFAULT) RETURNING *`,
        [userId, relativeFilePath]);
    }
    if (result?.rows?.length === 0) {
      return CoverImage.default(userId);
    }
    return new CoverImage(parseInt(result.rows[0].user_id), result.rows[0].src);
  }

  public saveCoverImage = async (image: CoverImage): Promise<void> => {
    const upsertQuery = `
      INSERT INTO user_cover_images (user_id, src, created_at, updated_at)
      VALUES ($1, $2, DEFAULT, DEFAULT)
      ON CONFLICT (user_id) DO UPDATE
      SET src = $2, updated_at = DEFAULT;`;
    try {
      await this.pool.query(upsertQuery, [image.profileId, image.src]);
    } catch (error) {
      throw new Error('Error saving cover image to database.');
    }
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
