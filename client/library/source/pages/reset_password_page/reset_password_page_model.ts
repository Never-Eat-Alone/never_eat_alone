import { User } from '../../definitions';

export abstract class ResetPasswordPageModel {
  public abstract load(token: string): Promise<void>;
  public abstract get account(): User;
  public abstract get profileImageSrc(): string;
  public abstract savePassword(newPassword: string): Promise<User>;
}
