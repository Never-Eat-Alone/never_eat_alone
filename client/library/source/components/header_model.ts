import { UserProfileImage } from '../definitions';

export abstract class HeaderModel {
  /** Loads the model. */
  public abstract load(): Promise<void>;
  public abstract get profileImage(): UserProfileImage;
}
