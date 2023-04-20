import { User } from '../../definitions';

export class HttpLogInModel {
  public async logIn(email: string, password: string, rememberMe: boolean
      ): Promise<User> {
    const response = await fetch('/api/log_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
        'rememberMe': rememberMe
      })
    });
    if (response.status === 200) {
      const responseObject = await response.json();
      return User.fromJson(responseObject.user);
    }
    return User.makeGuest();
  }

  public async logOut(): Promise<boolean> {
    const response = await fetch('/api/log_out');
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
