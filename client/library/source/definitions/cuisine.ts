/** Represents the Cuisine object. */
export class Cuisine {
  /** Creates Cuisine from json. */
  public static fromJson(value: any): Cuisine {
    return new Cuisine(
      value.id,
      value.label,
      value.colorCode
    );
  }

  /** Returns the empty cuisine. */
  public static empty(): Cuisine {
    return new Cuisine(-1, '', '');
  }

  constructor(id: number, label: string, colorCode: string) {
    this._id = id;
    this._label = label;
    this._colorCode = colorCode;
  }

  /** Returns the cuisine id. */
  public get id(): number {
    return this._id;
  }

  /** Returns the label of the cuisine. */
  public get label(): string {
    return this._label;
  }

  /** Returns the color code. */
  public get colorCode(): string {
    return this._colorCode;
  }

  /** Converts Cuisine to json. */
  public toJson(): any {
    return {
      id: this._id,
      label: this._label,
      colorCode: this._colorCode
    };
  }

  private _id: number;
  private _label: string;
  private _colorCode: string;
}
