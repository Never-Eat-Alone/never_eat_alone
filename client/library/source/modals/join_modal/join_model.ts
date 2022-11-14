export abstract class JoinModel {
  public abstract load(): void;
  public abstract requestSignUp(name: string, email: string,
    referralCode: string): Promise<any>;
  public abstract googleSignUp(email: string, token: any): Promise<any>;
  public abstract facebookSignUp(email: string, token: any): Promise<any>;
  public abstract sendConfirmationEmail(email: string): Promise<boolean>;
}
