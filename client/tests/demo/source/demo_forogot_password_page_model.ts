import * as NeverEatAlone from 'never_eat_alone';

export class DemoForgotPasswordPageModel extends
    NeverEatAlone.ForgotPasswordPageModel {
  constructor(userList: NeverEatAlone.User[]) {
    super();
    this._userList = userList;
  }

  public async sendRecoveryEmail(email: string): Promise<boolean> {
    for (const user of this._userList) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

  private _userList: NeverEatAlone.User[];
}
