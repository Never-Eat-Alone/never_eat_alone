import * as multer from 'multer';
import { UserProfileImage
} from '../../../client/library/source/definitions';
import { UserProfileImageDatabase } from '../postgres/queries';

/** UserProfileImage Routes class. */
export class UserProfileImageRoutes {
  /**
   * @param app - Express app.
   * @param userProfileImageDatabase - The user related table manipulation
   * class instance.
   */
  constructor(app: any, userProfileImageDatabase: UserProfileImageDatabase) {
    const upload = multer({ storage: multer.memoryStorage() });

    /** Route to get the current logged in user. */
    app.get('/api/user_profile_image/:userId',
      this.getUserProfileImageByUserId);
    app.post('/api/upload_profile_image/:userId', upload.single(
      'userProfileImage'), this.uploadUserProfileImage);

    this.userProfileImageDatabase = userProfileImageDatabase;
  }

  /** Returns the user profile image based on user id. */
  private getUserProfileImageByUserId = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let image: UserProfileImage;
    try {
      image = await this.userProfileImageDatabase.loadProfileImageByUserId(
        userId);
      response.status(200).json({ accountProfileImage: image.toJson() });
    } catch (error) {
      console.error('Failed at loadProfileImageByUserId.', error);
      response.status(500).json({
        accountProfileImage: UserProfileImage.default(userId),
        message: 'DATABASE_ERROR'
      });
    }
  }

  private uploadUserProfileImage = async (request, response) => {
    const userId = parseInt(request.params.userId);
    const userProfileImageFile = request.file;
    let uploadedImage: UserProfileImage;
    try {
      uploadedImage = await this.userProfileImageDatabase.uploadProfileImage(
        userId, userProfileImageFile);
    } catch (error) {
      console.error('Failed at uploadUserProfileImage.', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(201).json({ accountProfileImage: uploadedImage.toJson() });
  }

  private userProfileImageDatabase: UserProfileImageDatabase;
}
