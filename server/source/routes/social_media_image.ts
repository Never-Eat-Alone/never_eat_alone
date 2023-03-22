import { arrayToJson, SocialMediaImage
} from '../../../client/library/source/definitions';
import { SocialMediaImageDatabase } from '../postgres/queries';

/** SocialMediaImage Routes class. */
export class SocialMediaImageRoutes {
  /**
   * @param app - Express app.
   * @param socialMediaImageDatabase - The user related table manipulation
   * class instance.
   */
  constructor(app: any, socialMediaImageDatabase: SocialMediaImageDatabase) {
    /** Route to get the social media images displayed on homepage. */
    app.get('/api/home_page/social_media_images',
      this.getHomePageSocialMediaImages);
    app.post('/api/upload_social_media_image', this.uploadSocialMediaImage);

    this.socialMediaImageDatabase = socialMediaImageDatabase;
  }

  private getHomePageSocialMediaImages = async (request, response) => {
    let imageList: SocialMediaImage[];
    try {
      imageList =
        await this.socialMediaImageDatabase.loadHomePageSocialMediaImages();
    } catch (error) {
      response.status(400).json({
        socialMediaImages: [],
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({ socialMediaImages: arrayToJson(imageList) });
  }

  private uploadSocialMediaImage = async (request, response) => {
    const image = SocialMediaImage.fromJson(request.body.socialMediaImage);
    let uploadedImage: SocialMediaImage;
    try {
      uploadedImage =
        await this.socialMediaImageDatabase.uploadSocialMediaImage(image);
    } catch {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(201).json({ socialMediaImage: uploadedImage.toJson() });
  }

  private socialMediaImageDatabase: SocialMediaImageDatabase;
}
