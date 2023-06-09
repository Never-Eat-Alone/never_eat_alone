/** Represents the Language object. */
export class Language {
  /** Creates Language from json. */
  public static fromJson(value: any): Language {
    return new Language(
      value.id,
      value.code,
      value.name
    );
  }

  /** Returns the empty language. */
  public static empty(): Language {
    return new Language(-1, '', '');
  }

  constructor(id: number, code: string, name: string) {
    this._id = id;
    this._code = code;
    this._name = name;
  }

  /** Returns the language id. */
  public get id(): number {
    return this._id;
  }

  /** Returns the two letter code of the language. */
  public get code(): string {
    return this._code;
  }

  /** Returns the name of the language. */
  public get name(): string {
    return this._name;
  }

  /** Converts Language to json. */
  public toJson(): any {
    return {
      id: this._id,
      code: this._code,
      name: this._name
    };
  }

  private _id: number;
  private _name: string;
  private _code: string;
}
