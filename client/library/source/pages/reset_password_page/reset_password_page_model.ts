import { User } from '../../definitions';

export abstract class ResetPasswordPageModel {
  public abstract load(): Promise<void>;
  public abstract displayName(): string;
  public abstract profileImageSrc(): string;
  public abstract savePassword(newPassword: string): Promise<User>;
}
