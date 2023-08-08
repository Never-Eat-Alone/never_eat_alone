import { UserInvitationCode, InviteEmail } from '../../definitions';
import { InviteAFoodieModel } from './invite_a_foodie_model';

export class LocalInviteAFoodieModel extends InviteAFoodieModel {
  constructor(userInvitationCode: UserInvitationCode) {
    super();
    this._isLoaded = false;
    this._userInvitationCode = userInvitationCode;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get userInvitationCode(): UserInvitationCode {
    this.ensureIsLoaded();
    return this._userInvitationCode;
  }

  public async sendInviteEmail(inviteEmail: InviteEmail): Promise<boolean> {
    return Boolean(inviteEmail);
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('InviteAFoodieModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _userInvitationCode: UserInvitationCode;
}
