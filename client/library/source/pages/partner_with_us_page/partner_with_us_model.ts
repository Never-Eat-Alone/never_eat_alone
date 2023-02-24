export abstract class PartnerWithUsModel {
  public abstract sendEmail(name: string, email: string, profileLink: string,
    message: string): Promise<boolean>;
}
