/** Defines the avatar images. */
export class Avatar {
  public static fromJson(value: any): Avatar {
    return new Avatar(value.id, value.src);
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

  /** Converts the Avatar to json. */
  public toJson(): any {
    return {
      id: this._id,
      src: this._src
    };
  }

  private _id: number;
  private _src: string;
}
