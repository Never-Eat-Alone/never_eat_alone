/** Represents the city, province pair. */
export class CityProvince {
  public static fromJson(value: any): CityProvince {
    return new CityProvince(value.id, value.city, value.province,
      value.country);
  }

  /** Creates the default location for the app. */
  public static defaultLocation(): CityProvince {
    return new CityProvince(1, 'Toronto', 'ON', 'Canada');
  }

  /** The default value for the empty case (no CityProvince). */
  public static empty(): CityProvince {
    return new CityProvince(-1, '', '', '');
  }

  constructor(id: number, city: string, province: string, country: string) {
    this._id = id;
    this._city = city;
    this._province = province;
    this._country = country;
  }

  public get id(): number {
    return this._id;
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

  public toJson(): any {
    return {
      id: this._id,
      city: this._city,
      province: this._province,
      country: this._country
    };
  }

  private _id: number;
  private _city: string;
  private _province: string;
  private _country: string;
}
