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
    console.log('Running getUserProfileImageByUserId with userId', userId);
    try {
      console.log('loadProfileImageByUserId');
      image = await this.userProfileImageDatabase.loadProfileImageByUserId(
        userId);
      console.log('image load successfully', image);
    } catch (error) {
      console.log('loadProfileImageByUserId failed', error);
      response.status(500).json({
        userProfileImage: UserProfileImage.NoImage(),
        message: 'DATABASE_ERROR'
      });
      return;
    }
    console.log('response 200 userProfileImage', image.toJson());
    response.status(200).json({ userProfileImage: image.toJson() });
  }

  private uploadUserProfileImage = async (request, response) => {
    const userId = parseInt(request.params.userId);
    const userProfileImageFile = request.file;
    let uploadedImage: UserProfileImage;
    console.log('uploadUserProfileImage userId', userId, 'userProfileImageFile', userProfileImageFile);
    try {
      uploadedImage = await this.userProfileImageDatabase.uploadProfileImage(
        userId, userProfileImageFile);
      console.log('image uploaded in db successfully.');
    } catch (error) {
      console.log('uploadUserProfileImage failed', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    console.log('response status 201 with userProfileImage', uploadedImage.id, uploadedImage.userId, uploadedImage.src);
    response.status(201).json({ userProfileImage: uploadedImage.toJson() });
  }

  private userProfileImageDatabase: UserProfileImageDatabase;
}
