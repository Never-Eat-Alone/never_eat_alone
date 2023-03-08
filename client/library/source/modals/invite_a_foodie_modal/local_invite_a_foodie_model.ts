import { UserInvitationCode, InviteEmail } from '../../definitions';
import { InviteAFoodieModel } from './invite_a_foodie_model';

export class LocalInviteAFoodieModel extends InviteAFoodieModel {
  constructor(userInvitationCode: UserInvitationCode) {
    super();
    this._userInvitationCode = userInvitationCode;
  }

  public async load(): Promise<void> {}

  public get userInvitationCode(): UserInvitationCode {
    return this._userInvitationCode;
  }

  public async sendInviteEmail(inviteEmail: InviteEmail): Promise<boolean> {
    return Boolean(inviteEmail);
  }

  private _userInvitationCode: UserInvitationCode;
}
