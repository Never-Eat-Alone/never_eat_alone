export abstract class JoinModel {
  public abstract join(name: string, email: string,
    referralCode: string): Promise<void>;
}
