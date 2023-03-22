import { Pool } from 'pg';
import { SocialMediaImage
} from '../../../../client/library/source/definitions';

/** SocialMediaImage related database manipulations class. */
export class SocialMediaImageDatabase {
  /** @param pool - The pool connection to the postgres database. */
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public loadHomePageSocialMediaImages = async (): Promise<
      SocialMediaImage[]> => {
    const result = await this.pool.query('SELECT * FROM social_media_images \
      order by created_at DESC');
    if (!result || result.rows.length === 0) {
      return [];
    }
    const images: SocialMediaImage[] = [];
    for (const row of result.rows) {
      images.push(new SocialMediaImage(parseInt(row.id), row.src));
    }
    return images;
  }

  public uploadSocialMediaImage = async (image: SocialMediaImage): Promise<
      SocialMediaImage> => {
    const result = await this.pool.query('INSERT INTO social_media_images \
      (src, created_at, updated_at) VALUES ($1, DEFAULT, DEFAULT) \
      RETURNING *', [image]);
    if (!result || result.rows.length === 0) {
      return SocialMediaImage.NoImage();
    }
    return new SocialMediaImage(parseInt(result.rows[0].id),
      result.rows[0].src);
  }

  /** The postgress pool connection. */
  private pool: Pool;
}
