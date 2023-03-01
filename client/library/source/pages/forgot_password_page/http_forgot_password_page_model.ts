import { User } from '../../definitions';
import { ForgotPasswordPageModel } from './forgot_password_page_model';

export class HttpForgotPasswordPageModel extends ForgotPasswordPageModel {
  public async sendRecoveryEmail(email: string): Promise<User> {
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
      const responseObject = await response.json();
      return User.fromJson(responseObject);
    }
    return User.makeGuest();
  }

  public async resendRecoveryEmail(email: string, user: User): Promise<boolean
      > {
    const response = await fetch('/api/resend_recovery_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'user': user.toJson()
      })
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
