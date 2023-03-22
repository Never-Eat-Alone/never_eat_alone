export class UserProfileImage {
  public static fromJson(value: any): UserProfileImage {
    return new UserProfileImage(value.id, value.userId, value.src);
  }

  public static NoImage(): UserProfileImage {
    return new UserProfileImage(-1, -1, '');
  }

  constructor(id: number, userId: number, src: string) {
    this._id = id;
    this._userId = userId;
    this._src = src;
  }

  public get id(): number {
    return this._id;
  }

  public get userId(): number {
    return this._userId;
  }

  public get src(): string {
    return this._src;
  }

  /** Converts UserProfileImage to json. */
  public toJson(): any {
    return {
      id: this._id,
      userId: this._userId,
      src: this._src
    };
  }

  private _id: number;
  private _userId: number;
  private _src: string;
}
