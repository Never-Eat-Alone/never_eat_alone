import { InviteEmail, UserInvitationCode } from '../../definitions';

export abstract class InviteAFoodieModel {
  public abstract load(): Promise<void>;
  public abstract getUserInvitationCode(): UserInvitationCode;
  public abstract sendInviteEmail(inviteEmail: InviteEmail): Promise<boolean>;
}
