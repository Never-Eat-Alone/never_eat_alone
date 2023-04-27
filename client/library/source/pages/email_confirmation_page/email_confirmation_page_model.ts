export abstract class EmailConfirmationPageModel {
  public abstract load(): Promise<void>;
  public abstract get isValid(): boolean;
  public abstract get error(): string;
  public abstract get message(): string;
}
