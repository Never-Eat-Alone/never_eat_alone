/** Represents the city, province pair. */
export class CityProvince {
  public static fromJson(value: any): CityProvince {
    return new CityProvince(value.city, value.province);
  }

  /** Creates the default location for the app. */
  public static defaultLocation(): CityProvince {
    return new CityProvince('Toronto', 'ON');
  }

  public static empty(): CityProvince {
    return new CityProvince('', '');
  }

  constructor(city: string, province: string) {
    this._city = city;
    this._province = province;
  }

  public get city(): string {
    return this._city;
  }

  public get province(): string {
    return this._province;
  }

  public toJson(): any {
    return {
      city: this._city,
      province: this._province
    };
  }

  private _city: string;
  private _province: string;
}
