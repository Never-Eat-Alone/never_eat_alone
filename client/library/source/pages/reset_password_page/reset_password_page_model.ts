import { User } from '../../definitions';

export abstract class ResetPasswordPageModel {
  public abstract load(): Promise<void>;
  public abstract get displayName(): string;
  public abstract get profileImageSrc(): string;
  public abstract savePassword(newPassword: string): Promise<User>;
}
