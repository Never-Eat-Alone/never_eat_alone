export abstract class PartnerWithUsModel {
  public abstract load(): void;
  public abstract sendEmail(name: string, email: string, profileLink: string,
    message: string): Promise<void>;
}
