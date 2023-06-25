import { SocialAccountType } from './social_account_type';

export class UserProfileSocialAccount {
  /** Creates a UserProfileSocialAccount from a json object. */
  public static fromJson(value: any): UserProfileSocialAccount {
    return new UserProfileSocialAccount(
      value.platform as SocialAccountType,
      value.link,
      value.isPrivate
    );
  }

  constructor(platform: SocialAccountType, link: string, isPrivate: boolean) {
    this._platform = platform;
    this._link = link;
    this._isPrivate = isPrivate;
  }

  public get platform(): SocialAccountType {
    return this._platform;
  }

  public get link(): string {
    return this._link;
  }

  public get isPrivate(): boolean {
    return this._isPrivate;
  }

  /** Converts the UserProfileSocialAccount object to json. */
  public toJson() {
    return {
      platform: this._platform.toString(),
      link: this._link,
      isPrivate: this._isPrivate
    }
  }

  private _platform: SocialAccountType;
  private _link: string;
  private _isPrivate: boolean;
}
