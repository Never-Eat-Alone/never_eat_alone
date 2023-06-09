import { SocialAccountType } from './social_account_type';

export class SocialAccount {
  /** Creates a SocialAccount from a json object. */
  public static fromJson(value: any): SocialAccount {
    return new SocialAccount(
      value.provider as SocialAccountType,
      value.accessToken,
      value.email
    );
  }

  constructor(provider: SocialAccountType, accessToken: string, email: string) {
    this._provider = provider;
    this._accessToken = accessToken;
    this._email = email;
  }

  public get provider(): SocialAccountType {
    return this._provider;
  }

  public get accessToken(): string {
    return this._accessToken;
  }

  public get email(): string {
    return this._email;
  }

  /** Converts the SocialAccount object to json. */
  public toJson() {
    return {
      provider: this._provider.toString(),
      accessToken: this._accessToken,
      email: this._email
    }
  }

  private _provider: SocialAccountType;
  private _accessToken: string;
  private _email: string;
}
