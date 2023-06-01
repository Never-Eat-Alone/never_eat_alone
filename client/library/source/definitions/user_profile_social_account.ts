import { SocialAccountType } from './social_account_type';

export class UserProfileSocialAccount {
  constructor(platform: SocialAccountType, link: string) {
    this._platform = platform;
    this._link = link;
  }

  public get platform(): SocialAccountType {
    return this._platform;
  }

  public get link(): string {
    return this._link;
  }

  private _platform: SocialAccountType;
  private _link: string;
}
