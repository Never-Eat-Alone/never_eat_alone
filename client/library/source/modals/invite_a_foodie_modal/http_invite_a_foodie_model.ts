import { InviteEmail, User, UserInvitationCode } from '../../definitions';
import { InviteAFoodieModel } from './invite_a_foodie_model';
import { LocalInviteAFoodieModel } from './local_invite_a_foodie_model';

export class HttpInviteAFoodieModel extends InviteAFoodieModel {
  constructor(account: User) {
    super();
    this._isLoaded = false;
    this._account = account;
  }

  public async load(): Promise<void> {
    if (this._isLoaded) {
      return;
    }
    const response = await fetch(
      `/api/user_invitation_code/${this._account.id}`);
    const responseObject = await response.json();
    const userInvitationCode = UserInvitationCode.fromJson(
      responseObject.userInvitationCode);
    this._model = new LocalInviteAFoodieModel(userInvitationCode);
    await this._model.load();
    this._isLoaded = true;
  }

  public get userInvitationCode(): UserInvitationCode {
    return this._model.userInvitationCode;
  }

  public async sendInviteEmail(inviteEmail: InviteEmail): Promise<boolean> {
    const response = await fetch('/api/send_invite_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userInvitationCode': this._model.userInvitationCode.toJson(),
        'inviteEmail': inviteEmail.toJson()
      })
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  private _isLoaded: boolean;
  private _account: User;
  private _model: InviteAFoodieModel;
}
