import { PartnerWithUsModel } from './partner_with_us_model';

export class HttpPartnerWithUsModel extends PartnerWithUsModel {
  //Sends the partnership request to the server.
  public async sendEmail(name: string, email: string, profileLink: string,
      message: string): Promise<boolean> {
    const response = await fetch('/api/send_partner_with_us_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'profileLink': profileLink,
        'message': message
      })
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
