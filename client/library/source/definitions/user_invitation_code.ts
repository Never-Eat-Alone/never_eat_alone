export class UserInvitationCode {
  public static emptyUserInvitationCode(): UserInvitationCode {
    return new UserInvitationCode(-1, -1, '');
  }

  public static fromJson(value: any): UserInvitationCode {
    return new UserInvitationCode(
      value.id,
      value.userId,
      value.invitationCode);
  }

  constructor(
    id: number,
    userId: number,
    invitationCode: string
  ) {
    this._id = id;
    this._userId = userId;
    this._invitationCode = invitationCode;
  }

  public get id(): number {
    return this._id;
  }

  public get userId(): number {
    return this._userId;
  }

  public get invitationCode(): string {
    return this._invitationCode;
  }

  public toJson(): any {
    return {
      id: this._id,
      userId: this._userId,
      invitationCode: this._invitationCode
    };
  }

  private _id: number;
  private _userId: number;
  private _invitationCode: string;
}
