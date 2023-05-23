import { User, UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract uploadImageFile(imageFile: File): Promise<UserProfileImage>;
  public abstract signUp(password: string): Promise<boolean>;
  public abstract setUpProfile(displayName: string, image: UserProfileImage):
  Promise<{ account: User, accountProfileImage: UserProfileImage }>;
}
