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

  /** The postgress pool connection. */
  private pool: Pool;
}
