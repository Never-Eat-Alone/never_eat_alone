export abstract class HeaderModel {
  /** Loads the model. */
  public abstract load(): Promise<void>;
  public abstract get profileImageSrc(): string;
}
