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
    /** Route to get the current logged in user. */
    app.get('/api/user_profile_image/:userId',
      this.getUserProfileImageByUserId);
    app.post('/api/upload_profile_image', this.uploadUserProfileImage);

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
      response.status(400).json({
        userProfileImage: UserProfileImage.NoImage(),
        message: 'DATABASE_ERROR'
      });
      return;
    }
    response.status(200).json({ userProfileImage: image.toJson() });
  }

  private uploadUserProfileImage = async (request, response) => {
    const image = UserProfileImage.fromJson(request.body.userProfileImage);
    let uploadedImage: UserProfileImage;
    try {
      uploadedImage = await this.userProfileImageDatabase.uploadProfileImage(
        image);
    } catch {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(201).json({ userProfileImage: uploadedImage.toJson() });
  }

  private userProfileImageDatabase: UserProfileImageDatabase;
}
