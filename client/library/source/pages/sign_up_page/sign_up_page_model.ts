import { User, UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract uploadImageFile(userId: number, imageFile: File): Promise<UserProfileImage>;
  public abstract signUp(userId: number, password: string): Promise<boolean>;
  public abstract setUpProfile(userId: number, displayName: string, image: UserProfileImage):
  Promise<{ account: User, accountProfileImage: UserProfileImage }>;
}
