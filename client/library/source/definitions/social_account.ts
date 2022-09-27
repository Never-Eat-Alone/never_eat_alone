import { SocialAccountType } from './social_account_type';

export class SocialAccount {
  /** Creates a SocialAccount from a json object. */
  public static fromJson(value: any): SocialAccount {
    return new SocialAccount(
      value.userId,
      value.socialAccountEmail,
      value.accountType as SocialAccountType
    );
  }

  constructor(userId: number, socialAccountEmail: string,
      accountType: SocialAccountType) {
    this._userId = userId;
    this._socialAccountEmail = socialAccountEmail;
    this._accountType = accountType;
  }

  public get userId(): number {
    return this._userId;
  }

  public get socialAccountEmail(): string {
    return this._socialAccountEmail;
  }

  public get accountType(): SocialAccountType {
    return this._accountType;
  }

  /** Converts the SocialAccount object to json. */
  public toJson() {
    return {
      userId: this._userId,
      socialAccountEmail: this._socialAccountEmail,
      accountType: this._accountType
    }
  }

  private _userId: number;
  private _socialAccountEmail: string;
  private _accountType: SocialAccountType;
}
