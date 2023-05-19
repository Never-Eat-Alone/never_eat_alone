import * as multer from 'multer';
import { Avatar, UserProfileImage
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
    app.post('/api/update_profile_image_by_avatar/:userId',
      this.updateProfileImageByAvatar);

    this.userProfileImageDatabase = userProfileImageDatabase;
  }

  /** Returns the user profile image based on user id. */
  private getUserProfileImageByUserId = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let image: UserProfileImage;
    try {
      image = await this.userProfileImageDatabase.loadProfileImageByUserId(
        userId);
    response.status(200).json({ userProfileImage: image.toJson() });
    } catch (error) {
      console.log('Failed at loadProfileImageByUserId.', error);
      response.status(500).json({
        userProfileImage: UserProfileImage.default(userId),
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
      console.log('Failed at uploadUserProfileImage.', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(201).json({ userProfileImage: uploadedImage.toJson() });
  }

  private updateProfileImageByAvatar = async (request, response) => {
    const userId = parseInt(request.params.userId);
    const avatar = Avatar.fromJson(request.body.avatar);
    try {
      const newImage = 
        await this.userProfileImageDatabase.updateProfileImageByAvatar(userId,
          avatar);
      response.status(200).json({ userProfileImage: newImage.toJson() });
    } catch (error) {
      console.log('Failed at updateProfileImageByAvatar.', error);
      response.status(500).send();
    }
  }

  private userProfileImageDatabase: UserProfileImageDatabase;
}
