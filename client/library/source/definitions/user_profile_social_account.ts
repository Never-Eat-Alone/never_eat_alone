import { SocialAccountType } from './social_account_type';

export class UserProfileSocialAccount {
  /** Creates a UserProfileSocialAccount from a json object. */
  public static fromJson(value: any): UserProfileSocialAccount {
    return new UserProfileSocialAccount(
      value.platform as SocialAccountType,
      value.link,
      value.isPublic
    );
  }

  constructor(platform: SocialAccountType, link: string, isPublic: boolean) {
    this._platform = platform;
    this._link = link;
    this._isPublic = isPublic;
  }

  public get platform(): SocialAccountType {
    return this._platform;
  }

  public get link(): string {
    return this._link;
  }

  public get isPublic(): boolean {
    return this._isPublic;
  }

  /** Converts the UserProfileSocialAccount object to json. */
  public toJson() {
    return {
      platform: this._platform.toString(),
      link: this._link,
      isPublic: this._isPublic
    }
  }

  private _platform: SocialAccountType;
  private _link: string;
  private _isPublic: boolean;
}
