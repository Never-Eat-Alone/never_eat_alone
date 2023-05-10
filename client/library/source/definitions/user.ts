import { UserStatus } from './user_status';

/** Represents the user definition. */
export class User {
  /** Creates a user from a json object. */
  public static fromJson(value: any): User {
    return new User(
      value.id,
      value.name,
      value.email,
      value.userName,
      value.userStatus as UserStatus,
      new Date(Date.parse(value.createdAt))
    );
  }

  /** Creates the Guest user. */
  public static makeGuest(): User {
    return new User(-1, '', '', '', UserStatus.GUEST, new Date());
  }

  constructor(id: number, name: string, email: string, userName: string,
      userStatus: UserStatus, createdAt: Date) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._userName = userName;
    this._userStatus = userStatus;
    this._createdAt = createdAt;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get userName(): string {
    return this._userName;
  }

  public get userStatus(): UserStatus {
    return this._userStatus;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  /** Converts the user object to json. */
  public toJson(): any {
    console.log('user toJson this._userStatus.toString()', this._userStatus.toString());
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      userName: this._userName,
      userStatus: this._userStatus.toString(),
      createdAt: this._createdAt.toISOString()
    };
  }

  private _id: number;
  private _name: string;
  private _email: string;
  private _userName: string;
  private _userStatus: UserStatus;
  private _createdAt: Date;
}
