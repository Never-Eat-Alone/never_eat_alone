export abstract class JoinModel {
  public abstract load(): void;
  public abstract join(name: string, email: string,
    referralCode: string): Promise<void>;
}
