import * as NeverEatAlone from 'never_eat_alone';

export class DemoLogInModel extends NeverEatAlone.LogInModel {
  constructor(userList: NeverEatAlone.User[]) {
    super();
    this._userList = userList;
  }

  public async logIn(email: string, password: string, rememberMe: boolean):
      Promise<NeverEatAlone.User> {
    for (const user of this._userList) {
      if (user.email === email) {
        if (password === '123') {
          return user;
        }
      }
    }
    return NeverEatAlone.User.makeGuest();
  }

  public async googleLogIn(): Promise<NeverEatAlone.User> {
    return this._userList[0];
  }

  public async facebookLogIn(): Promise<NeverEatAlone.User> {
    return NeverEatAlone.User.makeGuest();
  }

  private _userList: NeverEatAlone.User[];
}
