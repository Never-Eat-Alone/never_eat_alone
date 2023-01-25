import { UserProfileImage } from '../../definitions';

export abstract class SignUpPageModel {
  public abstract load(): Promise<void>;
  public abstract uploadImage(): Promise<UserProfileImage>;
  public abstract signUp(password: string): Promise<void>;
  public abstract setUpProfile(displayName: string, image: UserProfileImage
    ): Promise<void>;
  public abstract get email(): string;
  public abstract get defaultImage(): UserProfileImage;
  public abstract get avatars(): UserProfileImage[];
}
