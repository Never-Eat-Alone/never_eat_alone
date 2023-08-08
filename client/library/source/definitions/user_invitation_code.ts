export class UserInvitationCode {
  public static emptyUserInvitationCode(): UserInvitationCode {
    return new UserInvitationCode(-1, '');
  }

  public static fromJson(value: any): UserInvitationCode {
    return new UserInvitationCode(
      value.userId,
      value.invitationCode);
  }

  constructor(userId: number, invitationCode: string) {
    this._userId = userId;
    this._invitationCode = invitationCode;
  }

  public get userId(): number {
    return this._userId;
  }

  public get invitationCode(): string {
    return this._invitationCode;
  }

  public toJson(): any {
    return {
      userId: this._userId,
      invitationCode: this._invitationCode
    };
  }

  private _userId: number;
  private _invitationCode: string;
}
