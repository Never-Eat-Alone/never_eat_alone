export class CoverImage {
  /** Create a CoverImage from a Json object. */
  public static fromJson(value: any): CoverImage {
    return new CoverImage(value.id, value.src, value.alt);
  }

  constructor(id: number, src: string, alt: string) {
    this._id = id;
    this._src = src;
    this._alt = alt;
  }

  public get id(): number {
    return this._id;
  }

  public get src(): string {
    return this._src;
  }

  public get alt(): string {
    return this._alt;
  }

  /** Converts the CoverImage to json. */
  public toJson(): any {
    return {
      id: this._id,
      src: this._src,
      alt: this._alt
    };
  }

  private _id: number;
  private _src: string;
  private _alt: string;
}
