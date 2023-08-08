import { ForgotPasswordPageModel } from './forgot_password_page_model';

export class HttpForgotPasswordPageModel extends ForgotPasswordPageModel {
  public async sendRecoveryEmail(email: string): Promise<boolean> {
    const response = await fetch('/api/send_recovery_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email
      })
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
