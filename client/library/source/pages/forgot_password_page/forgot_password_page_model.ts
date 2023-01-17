import { User } from '../../definitions';

export abstract class ForgotPasswordPageModel {
  public abstract sendRecoveryEmail(email: string): Promise<User>;
}
