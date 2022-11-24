export class UserProfileImage {
  public static fromJson(value: any): UserProfileImage {
    return new UserProfileImage(value.userId, value.id, value.src);
  }

  public static NoImage(): UserProfileImage {
    return new UserProfileImage(-1, -1, '');
  }

  constructor(userId: number, id: number, src: string) {
    this._userId = userId;
    this._id = id;
    this._src = src;
  }

  public get userId(): number {
    return this._userId;
  }

  public get id(): number {
    return this._id;
  }

  public get src(): string {
    return this._src;
  }

  /** Converts UserProfileImage to json. */
  public toJson(): any {
    return {
      userId: this._userId,
      id: this._id,
      src: this._src
    };
  }

  private _userId: number;
  private _id: number;
  private _src: string;
}
