export class SocialMediaImage {
  public static NoImage(): SocialMediaImage {
    return new SocialMediaImage(-1, '');
  }

  public static fromJson(value: any): SocialMediaImage {
    return new SocialMediaImage(value.id, value.src);
  }

  constructor(id: number, src: string) {
    this._id = id;
    this._src = src;
  }

  public get id(): number {
    return this._id;
  }

  public get src(): string {
    return this._src;
  }

  /** Converts SocialMediaImage to json. */
  public toJson(): any {
    return {
      id: this._id,
      src: this._src
    };
  }

  private _id: number;
  private _src: string;
}
