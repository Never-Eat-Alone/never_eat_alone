export abstract class ForgotPasswordPageModel {
  public abstract sendRecoveryEmail(email: string): Promise<boolean>;
}
