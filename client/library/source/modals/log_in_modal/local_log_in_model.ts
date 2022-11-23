import { User } from '../../definitions';
import { LogInModel } from './log_in_model';

export class LocalLogInModel extends LogInModel {
  constructor(user: User, password: string) {
    super();
    this._user = user;
    this._password = password;
  }

  public async logIn(email: string, password: string, rememberMe: boolean):
      Promise<User> {
    if (this._user.email === email && this._password === password) {
      return this._user;
    }
    return User.makeGuest();
  }

  public async googleLogIn(): Promise<User> {
    return this._user;
  }

  public async facebookLogIn(): Promise<User> {
    return this._user;
  }

  private _user: User;
  private _password: string;
}
