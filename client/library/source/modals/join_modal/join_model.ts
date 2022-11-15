export abstract class JoinModel {
  public abstract load(): void;
  public abstract requestSignUp(name: string, email: string,
    referralCode: string): Promise<void>;
}
