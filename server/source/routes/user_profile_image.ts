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
    app.get('/api/user_profile_image/:userId', this.getUserProfileImageByUserId);

    this.userProfileImageDatabase = userProfileImageDatabase;
  }

  /** Returns the user profile image based on user id. */
  private getUserProfileImageByUserId = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let image = UserProfileImage.NoImage();
    try {
      image = await this.userProfileImageDatabase.loadUserByUserId(userId);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (!image) {
      response.status(200).json({ userProfileImage: image.toJson() });
      return;
    }
    response.status(200).json({ userProfileImage: image.toJson() });
  }

  private userProfileImageDatabase: UserProfileImageDatabase;
}
