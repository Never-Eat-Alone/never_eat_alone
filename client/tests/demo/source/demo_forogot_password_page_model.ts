import * as NeverEatAlone from 'never_eat_alone';

export class DemoForgotPasswordPageModel extends
    NeverEatAlone.ForgotPasswordPageModel {
  constructor(userList: NeverEatAlone.User[]) {
    super();
    this._userList = userList;
  }

  public async sendRecoveryEmail(email: string): Promise<NeverEatAlone.User> {
    for (const user of this._userList) {
      if (user.email === email) {
        return user;
      }
    }
    return NeverEatAlone.User.makeGuest();
  }

  public async resendRecoveryEmail(email: string, user: NeverEatAlone.User
      ): Promise<boolean> {
    return Boolean(email && user);
  }

  private _userList: NeverEatAlone.User[];
}
