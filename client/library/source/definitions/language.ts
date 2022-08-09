/** Represents the Language object. */
export class Language {
  /** Creates Language from json. */
  public static fromJson(value: any): Language {
    return new Language(
      value.id,
      value.name
    );
  }

  /** Returns the empty language. */
  public static empty(): Language {
    return new Language(-1, '');
  }

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  /** Returns the language id. */
  public get id(): number {
    return this._id;
  }

  /** Returns the name of the language. */
  public get name(): string {
    return this._name;
  }

  /** Converts Language to json. */
  public toJson(): any {
    return {
      id: this._id,
      name: this._name
    };
  }

  private _id: number;
  private _name: string;
}
