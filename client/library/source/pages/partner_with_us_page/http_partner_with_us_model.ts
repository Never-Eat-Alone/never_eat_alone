import { PartnerWithUsModel } from './partner_with_us_model';

export class HttpPartnerWithUsModel extends PartnerWithUsModel {
  public async sendEmail(name: string, email: string, profileLink: string,
      message: string): Promise<void> {

  }
}
