import { SocialAccountType } from './social_account_type';

export class UserProfileSocialAccount {
  /** Creates a UserProfileSocialAccount from a json object. */
  public static fromJson(value: any): UserProfileSocialAccount {
    return new UserProfileSocialAccount(
      value.platform as SocialAccountType,
      value.link
    );
  }

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

  /** Converts the UserProfileSocialAccount object to json. */
  public toJson() {
    return {
      platform: this._platform.toString(),
      link: this._link
    }
  }

  private _platform: SocialAccountType;
  private _link: string;
}
