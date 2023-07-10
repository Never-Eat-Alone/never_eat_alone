export class CoverImage {
  /** Create a CoverImage from a Json object. */
  public static fromJson(value: any): CoverImage {
    return new CoverImage(value.profileId, value.src);
  }

  /** Generates the default cover image. */
  public static default(profileId: number = -1): CoverImage {
    return new CoverImage(profileId,
      'resources/profile_page/images/userProfile.pattern.3-desktop.png');
  }

  /** Generates the NoImage(Grey Image) Cover Image. */
  public static noImage(profileId: number = -1): CoverImage {
    return new CoverImage(profileId,
      'resources/edit_profile_page/icons/no_image.svg');
  }

  constructor(profileId: number, src: string) {
    this._profileId = profileId;
    this._src = src;
  }

  public get profileId(): number {
    return this._profileId;
  }

  public get src(): string {
    return this._src;
  }

  public equals(other: CoverImage): boolean {
    return this._profileId === other._profileId && this._src === other._src;
  }

  /** Converts the CoverImage to json. */
  public toJson(): any {
    return {
      profileId: this._profileId,
      src: this._src
    };
  }

  private _profileId: number;
  private _src: string;
}
