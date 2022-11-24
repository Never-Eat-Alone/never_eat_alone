import { PartnerWithUsModel } from './partner_with_us_model';

export class LocalPartnerWithUsModel extends PartnerWithUsModel {
  public load(): void {
    return;
  }

  public async sendEmail(name: string, email: string, profileLink: string,
      message: string): Promise<void> {
    return;
  }
}
