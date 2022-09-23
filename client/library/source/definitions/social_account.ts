import { SocialAccountType } from './social_account_type';

export class SocialAccount {
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

  public toJson() {
    
  }

  private _userId: number;
  private _socialAccountEmail: string;
  private _accountType: SocialAccountType;
}
