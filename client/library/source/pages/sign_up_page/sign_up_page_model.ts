import { Avatar, UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract load(): Promise<void>;
  public abstract uploadImage(imageFile: File): Promise<UserProfileImage>;
  public abstract signUp(password: string): Promise<boolean>;
  public abstract setUpProfile(displayName: string, image: UserProfileImage
    ): Promise<void>;
  public abstract get defaultImage(): UserProfileImage;
  public abstract get avatars(): Avatar[];
}
