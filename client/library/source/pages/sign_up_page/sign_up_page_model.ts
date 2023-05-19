import { Avatar, User, UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract load(): Promise<void>;
  public abstract addUploadedImage(image: UserProfileImage): void;
  public abstract uploadImageFile(imageFile: File): Promise<UserProfileImage>;
  public abstract signUp(password: string): Promise<boolean>;
  public abstract setUpProfile(displayName: string, image: UserProfileImage |
    Avatar): Promise<{ account: User, accountProfileImage: UserProfileImage }>;
  public abstract get avatars(): Avatar[];
}
