import { arrayToJson, SocialMediaImage
} from '../../../client/library/source/definitions';
import { SocialMediaImageDatabase } from '../postgres/queries';

/** SocialMediaImage Routes class. */
export class SocialMediaImageRoutes {
  /**
   * @param app - Express app.
   * @param socialMediaImageDatabase - The social media images related table
   * manipulation class instance.
   */
  constructor(app: any, socialMediaImageDatabase: SocialMediaImageDatabase) {
    /** Route to get the social media images displayed on homepage. */
    app.get('/api/home_page/social_media_images',
      this.getHomePageSocialMediaImages);

    this.socialMediaImageDatabase = socialMediaImageDatabase;
  }

  private getHomePageSocialMediaImages = async (request, response) => {
    let imageList: SocialMediaImage[];
    try {
      imageList =
        await this.socialMediaImageDatabase.loadHomePageSocialMediaImages();
    } catch (error) {
      console.log('Failed at loadHomePageSocialMediaImages', error);
      response.status(500).json({
        socialMediaImages: [],
        message: 'DATABASE_ERROR'
      });
      return;
    }
    console.log('imageList', imageList);
    response.status(200).json({ socialMediaImages: arrayToJson(imageList) });
  }

  private socialMediaImageDatabase: SocialMediaImageDatabase;
}
