import * as multer from 'multer';
import { UserProfileImage } from '../../../client/library/source/definitions';
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
    } catch (error) {
      response.status(500).json({
        userProfileImage: UserProfileImage.NoImage(),
        message: 'DATABASE_ERROR'
      });
      console.log(error);
      return;
    }
    response.status(200).json({ userProfileImage: image.toJson() });
  }

  private uploadUserProfileImage = async (request, response) => {
    const userId = parseInt(request.params.userId);
    const userProfileImageFile = request.file;
    let uploadedImage: UserProfileImage;
    try {
      uploadedImage = await this.userProfileImageDatabase.uploadProfileImage(
        userId, userProfileImageFile);
    } catch (error) {
      response.status(500).json({ message: 'DATABASE_ERROR' });
      console.log(error);
      return;
    }
    response.status(201).json({ userProfileImage: uploadedImage.toJson() });
  }

  private userProfileImageDatabase: UserProfileImageDatabase;
}
