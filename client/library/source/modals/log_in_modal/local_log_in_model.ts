import { User } from '../../definitions';
import { LogInModel } from './log_in_model';

export class LocalLogInModel extends LogInModel {
  constructor(user: User) {
    super();
    this._user = user;
  }

  public async logIn(email: string, password: string, rememberMe: boolean):
      Promise<User> {
    return this._user;
  }

  public async forgotPassword(email: string): Promise<void> {
    return;
  }

  public async googleLogIn(email: string, token: any): Promise<User> {
    return this._user;
  }

  public async facebookLogIn(email: string, token: any): Promise<User> {
    return this._user;
  }

  private _user: User;
}
