export class Location {
  public static fromJson(value: any): Location {
    return new Location(
      value.id,
      value.addressLineOne,
      value.addressLineTwo,
      value.city,
      value.province,
      value.country,
      value.postalCode,
      value.neighbourhood
    );
  }

  public static empty(): Location {
    return new Location(-1, '', '', '', '', '', '', '');
  }

  constructor(id: number, addressLineOne: string, addressLineTwo: string,
      city: string, province: string, country: string, postalCode: string,
      neighbourhood: string) {
    this._id = id;
    this._addressLineOne = addressLineOne;
    this._addressLineTwo = addressLineTwo;
    this._city = city;
    this._province = province;
    this._country = country;
    this._postalCode = postalCode;
    this._neighbourhood = neighbourhood;
  }

  public get id(): number {
    return this._id;
  }

  public get addressLineOne(): string {
    return this._addressLineOne;
  }

  public get addressLineTwo(): string {
    return this._addressLineTwo;
  }

  public get city(): string {
    return this._city;
  }

  public get province(): string {
    return this._province;
  }

  public get country(): string {
    return this._country;
  }

  public get postalCode(): string {
    return this._postalCode;
  }

  public get neighbourhood(): string {
    return this._neighbourhood;
  }

  public toJson(): any {
    return {
      id: this._id,
      addressLineOne: this._addressLineOne,
      addressLineTwo: this._addressLineTwo,
      city: this._city,
      province: this._province,
      country: this._country,
      postalCode: this._postalCode,
      neighbourhood: this._neighbourhood
    };
  }

  private _id: number;
  private _addressLineOne: string;
  private _addressLineTwo: string;
  private _city: string;
  private _province: string;
  private _country: string;
  private _postalCode: string;
  private _neighbourhood: string;
}
