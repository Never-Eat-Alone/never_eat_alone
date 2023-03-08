import { UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract load(): Promise<void>;
  public abstract uploadImage(image: UserProfileImage): Promise<
    UserProfileImage>;
  public abstract signUp(password: string): Promise<boolean>;
  public abstract setUpProfile(displayName: string, image: UserProfileImage
    ): Promise<boolean>;
  public abstract get email(): string;
  public abstract get defaultImage(): UserProfileImage;
  public abstract get avatars(): UserProfileImage[];
}
